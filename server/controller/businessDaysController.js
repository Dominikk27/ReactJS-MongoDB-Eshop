const BusinessDays = require("../model/businessDaysModel.js");

const updateBusinessDays = async (req, res) =>{
    try{
        const businessDays = req.body;
        //console.log(businessDays);
        if(!Array.isArray(businessDays)){
            return res.status(400).json({error: "Invalid format!"});
        }

        let daysDoc = await BusinessDays.findOne();

        if(!daysDoc){
            daysDoc = new BusinessDays({ days: businessDays });
        }else{
            daysDoc.days = businessDays;
        }

        await daysDoc.save();
        return res.status(200).json({message: "Business days has been successfully updated!"});

    }catch(e){
        console.error("Fialed to Update Business days! error: ",e);
        res.status(500).json({error: "Failed to update business days data!"});
    }
}


const getBusinessDays = async (req, res) =>{
    try{
        const businessDays = await BusinessDays.find();

        if(businessDays === 0){
            console.log("Business Days are not set yet!");
        }
        res.status(200).json(businessDays);

    }catch(e){
        console.error("Failed to get business days data! error: ", e);
        res.status(500).json({error: "Failed to get business days data!"});
    }
}

module.exports = { updateBusinessDays, getBusinessDays }