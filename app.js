const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

// importing routes
const businessRoute = require("./routes/business");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");

app.use("/api/business", businessRoute);
app.use("/api/review", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

/**
 * Make sure to do mongod in the terminal! that will start the database locally.
 */

// connecting to database
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => console.log("listenning at http://localhost:3000"));
    console.log("Connected to database!");
    // console.log("Result: ", result);
  })
  .catch((error) => console.log(error));
