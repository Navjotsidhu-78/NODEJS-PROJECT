const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
require('dotenv').config();

const app =express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;


let db;

mongodb.MongoClient.connect(mongoURI)
.then((client)=>{
    console.log("MongoDB connected");
    db = client.db("library_management_system");
})
.catch((err) => {
    HTMLFormControlsCollection.error("MongoDB connection error: ", err);
    process.exit(1);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});