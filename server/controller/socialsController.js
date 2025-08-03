const Socials = require("../model/socialsModel.js");

const updateSocials = async (req, res) =>{
    try{
        const { Facebook, Instagram, Google, Youtube } = req.body;

        if(Object.keys(req.body).length === 0) {
            return res.status(404).json({error: "No social links provided!"});
        }

        const updated = await Socials.findOneAndUpdate(
            {},
            { Facebook, Instagram, Youtube, Google },
            { new: true, upsert: true}
        );

        res.status(200).json(updated);
    }catch(e){
        console.error("Socials error! error: ", e);
        res.status(500).json({error: "Server Error!"});
    }
}


const getSocials = async (req, res) =>{
    try{
        const socials = await Socials.find();

        if(socials === 0){
            console.log("No records for social links!");
        }
        res.status(200).json(socials);
    }catch(e){
        console.error("Failed to get social links! error: ", e);
        res.status(500).json({error: "failed to get social links!"});
    }
}

module.exports = {updateSocials, getSocials};
