const Reservation = require("../model/reservationsModel.js");
const { encrypt, decrypt } = require("../utils/encrypt.js");

const env = require("dotenv");

const reserveProduct = async (req, res) =>{
    try{
        const {
            FName,
            LName,
            phoneNumber,
            email,
            reservationDate,
            reservationTime,
            productCode,
            reservationNote
        } = req.body;

        const encrpytedPhone = encrypt(phoneNumber);
        const encryptedEmail = encrypt(email);
        const encrpytedLName = encrypt(LName);

        const newReservation = new Reservation({
            FirstName: FName,
            LastName: JSON.stringify(encrpytedLName),
            PhoneNumber: JSON.stringify(encrpytedPhone),
            Email: JSON.stringify(encryptedEmail),
            ReservationDate: reservationDate,
            ReservationTime: reservationTime,
            ReservationNote: reservationNote,
            ProductCode: productCode,
            status: 'new'
        });

        await newReservation.save();

        res.status(200).json(newReservation);

    }catch(e){
        console.error("Reservation failed! Error: ",e);
        res.status(500).json({ error: "Reservation failed!"});
    }
}

const getReservations = async (req, res) =>{
    try{
        const reservations = await Reservation.find();
        if(reservations === 0){ 
            console.log("DB is empty!");
            res.status(404).json({message: "There are no reservations!"});
        }

        const decryptedData = reservations.map(reservation => {
            return {
                ...reservation._doc,
                LastName: decrypt(reservation.LastName),
                PhoneNumber: decrypt(reservation.PhoneNumber),
                Email: decrypt(reservation.Email)
            };
        });
        
        res.status(200).json(decryptedData);
    }catch(e){
        console.error("Failed to fetch reservations! error: ", e);
        res.status(500).json({error: "Internal Server Error!"});
    }
}


const updateReservation = async (req, res) => {
    const reserveID = req.params.id
    //console.log("RESERVE ID: ", reserveID);
    const { status } = req.body;
    try{ 
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reserveID,
            {status: status},
            {new: true}
        );

        if(!updatedReservation){
            return res.status(404).json({message: "Reservation not found!"});
        }

        const decryptReservation = {
            ...updatedReservation._doc,
            LastName: decrypt(updatedReservation.LastName),
            Email: decrypt(updatedReservation.Email),
            PhoneNumber: decrypt(updatedReservation.PhoneNumber),
        };

        res.json(decryptReservation);
    }catch(e){
        console.error("Failed to update reservation status! error: ",e);
        res.status(500).json({message: "failed to update reservation status!"});
    }
}


module.exports = { reserveProduct, getReservations, updateReservation };