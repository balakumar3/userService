const express = require('express');
const app = express();
const connectDatabase = require('./configuration/databaseConnect');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter)


connectDatabase()
    .then(() => {
        console.log(`Database connected `);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at the port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(`Unable to connect to database ${err}`)
    })