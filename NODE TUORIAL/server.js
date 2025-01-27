const express = require('express');
const db = require('./db');  // Importing the DB connection setup 
const app = express();
const bodyParser = require( 'body-parser');
app.use(bodyParser.json()); // req. body



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//importing router
const personRoutes = require('./routes/personRoutes.js');

app.use('/person' , personRoutes);