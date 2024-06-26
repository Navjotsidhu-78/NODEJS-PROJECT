const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongodb = require('mongodb');
const methodOverride= require("method-override");
require('dotenv').config();

const app =express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

let db; // mongoDB connection reference

// Connect to MongoDB
mongodb.MongoClient.connect(mongoURI)
.then((client)=>{
    console.log("MongoDB connected");
    db = client.db("library_management_system");
})
.catch((err) => {
    console.error("MongoDB connection error: ", err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get("/books", (req, res) => {
db.collection("books").find().toArray()
.then(books => {
    res.render("index", {books});
  })
  .catch(error => res.status(500).json({ error: "An error occured while retrieving books", details: err}));
});

app.get("/books/new", (req, res) => {
    res.render("add_book");
});

app.post("/books",(req, res) =>{
    const book ={
        title: req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate)
    };

    db.collection("books").insertOne(book)
    .then(result => res.send(result))
    .catch(error => res.status(500).json({ error: "An error occured while inserting book", details: err}));
});

app.listen(port, () => {                                
    console.log(`Server started at http://localhost:${port}`); 
});        