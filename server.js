require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const ejs = require("ejs");
const fs = require('fs');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

//Selected Model
const SelectedActivities = require('./models/SelectedActivities');


//ActivityCardModel Model
const ActivityCard = require('./models/ActivityCard');

// require routes
const authRoute = require("./routes/auth");


//setup application
const app = express();
app.use(express.json());
app.use(cors());

//setup view engine EJS, body-parser and express-static
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

//setup session
app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false
}));

//initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

//Connect to database
mongoose.connect(process.env.DB_CONNECT)
   .then(() => {
      console.log("database connected");

   })
   .catch(err => console.log(err))

//use routes
app.use('/', authRoute);

//Start the server
app.listen(process.env.PORT, () => console.log("Server is Running"));

app.get("/", (req, res) => {
   var bestTours = [
      { id: 'T1', image: "/assets/bestTours/thailandpackage.jpg", blogger: 'Robert Jona', name: 'Thailand', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' },
      { id: 'T2', image: "/assets/bestTours/telaviv.jpg", blogger: 'Ameer Azim', name: 'Tel Aviv', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' },
      { id: 'T3', image: "/assets/bestTours/turkeypackage.jpg", blogger: 'Mohammed Habib', name: 'Turkey', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' },
      { id: 'T4', image: "/assets/bestTours/usapackage.jpg", blogger: 'Bill Down', name: 'USA', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' },
      { id: 'T5', image: "/assets/bestTours/italypackage.jpg", blogger: 'Bro Jimm', name: 'Italy', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' },
      { id: 'T6', image: "/assets/bestTours/alpspackage.jpg", blogger: 'Dom William', name: 'Alps', description: 'Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor' }
   ];
   res.render("main", {
      content: 'Screens/index',
      tours: bestTours
   });
});

app.get("/register", (req, res) => {
   res.render("main", {
      content: 'Screens/register'
   });
});

app.get("/login", (req, res) => {
   res.render("main", {
      content: 'Screens/login'
   });
});
// app.get("/plan", (req, res) => {
//     res.render("plan");
// });

app.post('/activities', (req, res) => {
   const activity = req.body;
   const db = mongoose.connection;

   db.collection('travelactivities')
      .insertOne(activity)
      .then(result => {
         res.status(201).json(result);
      })
      .catch(err => {
         res.status(500).json({ err: 'Could not create a new document' })
      })
});

app.get('/plan', (req, res) => {
   const db = mongoose.connection;
   const activityCards = db.collection('travelactivities');
   const selectedActivities = db.collection("selectedactivities");
   activityCards.find().toArray()
      .then(result1 => {
         selectedActivities.deleteMany({}, function (err, result) {
            console.log("Collection cleared");
         });
         res.render('plan', { result1: result1 });
         //  res.status(201).json(result1);
         //  console.log(result1);
      })
      .catch(err => {
         res.status(500).json({ err: 'Could not create a new document' })
      })
});

app.get('/activitydata', (req, res) => {
   const db = mongoose.connection;
   const activityCards = db.collection('travelactivities');
   activityCards.find().toArray()
      .then(result => {
         res.status(201).json(result);
      })
      .catch(err => {
         res.status(500).json({ err: 'Could not create a new document' })
      })
});

app.post('/addActivity', (req, res) => {
   console.log("called");
   var day = req.body.day;
   var id = req.body.id;
   var uniqueID = day.toString() + id.toString();
   const selectedActivity = new SelectedActivities({
      day: day,
      activityID: id,
      dayID: uniqueID
   });
   const db = mongoose.connection;
   db.collection('selectedactivities')
      .insertOne(selectedActivity)
      .then(res.status(201).json({ message: 'Activity added' }))
      .then(console.log("done"))
      .catch(err => {
         res.status(500).json({ err: 'Could not create a new document' });
         res.end();
      });
   res.end();
});

app.delete('/deleteActivity', (req, res) => {
   var day = req.body.day;
   var id = req.body.id;
   var uniqueID = day.toString() + id.toString();
   const db = mongoose.connection;
   db.collection('selectedactivities')
      .deleteOne({ dayID: uniqueID })
      .then(res.status(201).json({ message: 'Activity deleted' }))
      .then(console.log("done"))
      .catch(err => {
         res.status(500).json({ err: 'Could not delete the document' });
         res.end();
      });
   res.end();

});



// get selected activities

app.get('/selectedactivities', (req, res) => {
   const db = mongoose.connection;
   res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
   });

   const travelactivities = db.collection("selectedactivities");
   const changeStream = travelactivities.watch([
      { $match: { operationType: { $in: ["delete", "insert"] } } }
   ]);
   changeStream.on("change", async function (event) {
      db.collection('selectedactivities').find({}).toArray((err, data) => {
         // Send the latest data as an SSE event
         res.write(`data: ${JSON.stringify(data)}\n\n`)
      });
   });
   changeStream.on("end", function () {
      res.end();
   });
   res.on('close', () => {
      changeStream.close();
   });
});




