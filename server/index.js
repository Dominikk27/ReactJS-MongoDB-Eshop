
const productRoute = require("./routes/productRoute.js");
const visualsRoute = require("./routes/visualsRoute.js");
const reserveRoute = require("./routes/reserveRoute.js");
const socialsRoute = require("./routes/socialsRoute.js");
const businessDayRoute = require("./routes/businessDaysRoute.js");
const filtersRoute = require("./routes/filtersRoute.js");
const authRoute = require("./routes/authRoute.js");

const env = require("dotenv");
const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");

const path = require("path");

const app = express();
env.config()

const MONGO_URI = process.env.MONGO_URI;
const DOMAIN_URI = process.env.DOMAIN_URI;

mongoose.connect(MONGO_URI)
    .then(() =>{
        console.log("✅ Successfully connected to DB!");
        app.listen(process.env.PORT, () =>
        {
            console.log('🚀 Server Running on port ', process.env.PORT);   
            //console.log(mongoose.connection.name);
        })
    })
    .catch((e) =>{
        console.log("❌ ", e, " Error with connection to DB");
    })


app.use(cors({origin: DOMAIN_URI, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname,'images')));
app.use("/adminpanel/visuals", visualsRoute);
app.use("/adminpanel/socials", socialsRoute);
app.use("/adminpanel/businessDays", businessDayRoute);
app.use("/adminpanel/auth", authRoute);


app.use("/products/api", productRoute);
app.use("/client/visuals", visualsRoute);
app.use("/client/reservations", reserveRoute);
app.use("/client/socials", socialsRoute);
app.use("/client/businessDays", businessDayRoute);
app.use("/products/filters", filtersRoute);