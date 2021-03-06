require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const dataRoutes = require("./routes/data");
const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/app");

mongoose.connect(process.env.DATABASE, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DATABASE CONNECTED")
}).catch((err) => {
    console.log(`ERROR ENCOUNTERED WHILE TRYING TO CONNECT TO DB - ${port}`)
});

app.use(cors());
app.use(bodyParser.json());

app.use("/", dataRoutes);
app.use("/", authRoutes);
app.use("/", appRoutes);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`NOVA SERVER IS LIVE AT PORT ${port}`)
});