const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// importing routes
const businessRoute = require("./routes/business");
const reviewRoute = require("./routes/business");
const userRoute = require("./routes/business");
const uploadRoute = require("./routes/upload");

app.use("/business", businessRoute);
app.use("/review", reviewRoute);
app.use("/user", userRoute);
app.use("/upload", uploadRoute);

// connecting to database
const dbURI =
  "mongodb+srv://negadras:negadras@negadras.yutnd.mongodb.net/negadras?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => console.log("listenning at http://localhost:3000"));
    console.log("Connected to database!");
    console.log("Result: ", result);
  })
  .catch((error) => console.log(error));
