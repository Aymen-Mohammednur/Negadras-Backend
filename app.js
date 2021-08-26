const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// importing routes
const buisnessRoute = require('./routes/buisness');

app.use('/buisness', buisnessRoute);

// connecting to database
const dbURI = "mongodb+srv://negadras:negadras@negadras.yutnd.mongodb.net/negadras?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000);
        console.log('Connected to database!');
    })
    .catch((error) => console.log(error))