const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require('dotenv').config();

// importing routes
const businessRoute = require("./routes/business");
const reviewRoute = require("./routes/review");
const userRoute = require("./routes/user");
const uploadRoute = require("./routes/upload");
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');


app.use("/api/business", businessRoute);
app.use("/api/review", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/upload", uploadRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute);

// connecting to database
mongoose
  .connect(process.env.DB_CONNECT_OFFLINE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => console.log("listenning at http://localhost:3000"));
    console.log("Connected to database!");
    // console.log("Result: ", result);
  })
  .catch((error) => console.log(error));
