const { storage } = require("firebase-admin");
const Product = require("../model/productModel.js");
const Reservations = require("../model/reservationsModel.js");
const Partners = require("../model/partnersModel.js");

const env = require("dotenv");
env.config();

const fs = require('fs');
const path = require('path');


const createStorage = require("../utils/storage.js");
const STORAGE_URI = process.env.STORAGE_URI;

//STATS
const getStats = async (req, res) =>{
    try{
        const activeProduct = await Product.countDocuments();
        const activeOnSaleProduct = await Product.countDocuments({ onSale: true});

        const activeReservations = await Reservations.countDocuments();

        res.json({
            activeProduct,
            activeOnSaleProduct,
            activeReservations
        })
    }catch(e){
        console.error("Error getting stats: ", e);
        res.status(500).json({error: "Server Error!"});
    }
}

//Partners FETCH
const getPartners = async (req, res) =>{
    try{
        const activePartners = await Partners.find();
        if(activePartners.length == 0){
            //console.log("DB is empty");
        }
        res.status(200).json(activePartners);
    }catch (e){
        console.error("Error fetching partners: error: ", e);
        res.status(500).json({error: "Server Error!"});
    }
}

const UpdatePartners = async (req, res) => {
    try{
        const removedIDs = JSON.parse(req.body.removedIDs || "[]");
        const partnersLogo = req.files?.map(file =>
            STORAGE_URI + file.path
                .replace(path.join(__dirname, "..", "images"), "/images")
                .replace(/\\/g, "/")
        ) || [];
       
        if (removedIDs.length > 0){
            const partnersToRemove = await Partners.find({_id: {$in: removedIDs}});

            partnersToRemove.forEach(partner =>{
                const relativePath = partner.partnerLogo
                    .replace(STORAGE_URI,"")
                    .replace(/^\/+/,"");

                const absolutePath = path.join(__dirname, "..", relativePath);
                if(fs.existsSync(absolutePath)){
                    fs.unlinkSync(absolutePath);
                }
            });
            await Partners.deleteMany({_id: {$in: removedIDs}});

        }

        if(partnersLogo.length > 0){
            const newPartners = partnersLogo.map(img => ({
                partnerLogo: img
            }));

            await Partners.insertMany(newPartners)
        }

        const updatePartners = await Partners.find();
        return res.status(200).json(updatePartners);

    }catch (e){
        console.error("ERROR with updating partners! ERROR: ",e);
        res.status(500).json({message: "Error With Updating Partners!"});
    }
};

module.exports = { getStats, getPartners, UpdatePartners };