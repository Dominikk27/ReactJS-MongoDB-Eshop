const Reservation = require("../model/reservationsModel.js");
const { encrypt } = require("../utils/encrypt.js");

const env = require("dotenv");

const reserveProduct = async (req, res) =>{
    console.log("REQUEST BODY: ", req.body);

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


module.exports = { reserveProduct };