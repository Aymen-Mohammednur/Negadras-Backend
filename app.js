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
const favoriteRoute = require('./routes/favorite');
const organizationRoute = require("./routes/organization");
const recommendationRoute = require("./routes/recommendation");

app.use("/api/business", businessRoute);
app.use("/api/review", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/organization", organizationRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/recommendation", recommendationRoute);

const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;

// FOR EVERYONE ELSE
const DB_URL = `mongodb://localhost:27017/`;

/**
 * Make sure to do mongod in the terminal! that will start the database locally.
 */

/**
 * use this for .env file. this is not pushed.
 *
 * MONGO_HOSTNAME=127.0.0.1
 * MONGO_PORT=27017
 * MONGO_DB=negadras
 * ACCESS_KEY=Hello
 */

// connecting to database
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => console.log("listening at http://localhost:3000"));
    console.log("Connected to database!");
    // console.log("Result: ", result);
  })
  .catch((error) => console.log(error));
