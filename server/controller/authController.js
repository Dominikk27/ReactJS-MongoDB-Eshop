const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXP = process.env.JWT_ACCESS_EXP;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXP = process.env.JWT_REFRESH_EXP;

const authRegister = async (req, res) =>{
    try{
        const { username, email, password, role } = req.body;
        
        const userExist = await User.findOne({ username });
        if(userExist){
            res.status(400).json({ error: "User exists!"});
        }

        const hashedPasswd = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPasswd,
            role: role || "predajca"
        });

        await newUser.save();
        res.status(200).json({ message: "Successfully created user"});
    }catch (e){
        console.error("Failed to create user! error: ",e);
        res.status(500).json({ error: "Failed to create user! "});
    }
}

const authLogin = async (req, res) =>{
    try{
        const { username, password } = req.body;


        const user = await User.findOne({ username });
        if(!user){
            console.log("Incorrect login data!");
            res.status(404).json({ message: "incorrect login details!"});
        }

        
        const userMatch = await bcrypt.compare(password, user.password);
        if(!userMatch){
            res.status(404).json({ message: "incorrect login details!"});
        }

        const payload = {
            id: user._id,
            role: user.role,
        };

        const accessToken = jwt.sign(
            payload, 
            JWT_ACCESS_SECRET, 
            {expiresIn: JWT_ACCESS_EXP}
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 5 * 60 * 1000 //7 * 24 * 60 * 60 * 1000 // 7 dayss
        });

        const refreshToken = jwt.sign(
            payload, 
            JWT_REFRESH_SECRET, 
            {expiresIn: JWT_REFRESH_EXP}
        );


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 10 * 60 * 1000 //7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ authentificated: true, accessToken: accessToken, result: payload });

    }catch(e){
        console.error("Failed to login!, error: ", e);
        res.status(500).json({ error: "failed to login!"});
    }
}

const authRefresh = (req, res) =>{
    const refToken = req.cookies.refreshToken;
    if (!refToken) {
        return res.status(403).json({ authentificated: false });
    }

    try{
        jwt.verify(
            refToken,
            JWT_REFRESH_SECRET,
            (e, decoded) =>{
                if (e){
                    return res.status(403).json({ authentificated: false })
                }

                const payload = {
                    id: decoded.id,
                    role: decoded.role,
                };

                const newAccessToken = jwt.sign(
                    payload,
                    JWT_ACCESS_SECRET,
                    { expiresIn: JWT_ACCESS_EXP}
                );

                res.json({ authentificated: true, accessToken: newAccessToken });
            }
        );
    }catch(e){
        res.json({ authentificated: false });
    }
}

const authLogout = (req, res) =>{
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict'
    });
    res.json({message: "Successfully, Logged out!"});
}

module.exports = {authRegister, authLogin, authLogout, authRefresh};