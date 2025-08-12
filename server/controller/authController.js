const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXP = process.env.JWT_EXP;

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

        console.log("Password from client:", password);
        console.log("Password hash from DB:", user.password);

        const userMatch = await bcrypt.compare(password, user.password);
        if(!userMatch){
            res.status(404).json({ message: "incorrect login details!"});
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXP});

        res.status(200).json({token, username: user.username, email: user.email, role: user.role});

    }catch(e){
        console.error("Failed to login!, error: ", e);
        res.status(500).json({ error: "failed to login!"});
    }
}

module.exports = {authRegister, authLogin};