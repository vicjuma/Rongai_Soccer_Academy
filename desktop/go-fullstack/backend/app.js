const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRouter = require('./routes/recipe');

app.use(cors());

mongoose.connect('mongodb+srv://vik:vik@rest-0wmlu.mongodb.net/test?retryWrites=true&w=majority?authSource=true').then(() => {
    console.log('database was successfully connected');
}).catch((error) => {
    console.log('there was an error connecting to the database');
    console.log(error);
});

app.use(bodyParser.json());
app.use('/api/recipes', recipeRouter);


 

module.exports = app;
