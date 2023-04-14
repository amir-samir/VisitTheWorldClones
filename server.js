require("dotenv").config();
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
var cookieSession = require("cookie-session");

//declairing the certificate for https:
const options = {
  key: fs.readFileSync("certificates/key.pem"),
  cert: fs.readFileSync("certificates/cert.pem"),
  secureProtocol: "TLSv1_2_method",
  ciphers: "ECDHE-RSA-AES128-GCM-SHA256",
};

//adding google Services
const { google } = require("googleapis");

// define google auth
const { OAuth2 } = google.auth;

// declare new AuthClient
const oAuthClient = new OAuth2(
  "28897199248-b5p89k7hbu6pa9o08i6m3lab3vl80dql.apps.googleusercontent.com",
  "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"
);

// set the refresh token for google Calendar Auth
oAuthClient.setCredentials({
  refresh_token:
    "1//04pLY4I8gtvCICgYIARAAGAQSNwF-L9IrNBc1HKuQw_YU7M9d7shg6lArmYS3nGD_5OSQGq7lf9O7OX9pt2S3OlvVaQIL5EJijsk",
});

// declairing the calendar:
const calendar = google.calendar({ version: "v3", auth: oAuthClient });

// setting the start time of the calendar event
const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 3);

// setting the end time of the calendar event
const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 3);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

//creating the actual event
const event = {
  summary: "City Tour at California",
  location: "295 California St, San Francisco; CA 94111",
  description: "A cool Day in California",
  start: {
    dateTime: "2023-02-14T12:00:00-07:00",
    timeZone: "Europe/Berlin",
  },
  end: {
    dateTime: "2023-02-14T12:00:00-07:00",
    timeZone: "Europe/Berlin",
  },
  colorId: 1,
};

// calendar.freebusy.query(
//    {
//       resource: {
//          timeMin: '2023-02-14T12:00:00-07:00',
//          timeMax: '2023-02-14T12:00:00-09:00',
//          timeZone: 'Europe/Berlin',
//          items: [{ id: '5a4d87ff37274a7932031990d00610343420d4ece7f83f1345f9656c6019e6b7@group.calendar.google.com'}],
//       },
//    },
//    (err, res) => {
//          if(err) return console.error('Free Busy Query Error: ', err)
//          const eventsArr = res.data.calendars['5a4d87ff37274a7932031990d00610343420d4ece7f83f1345f9656c6019e6b7@group.calendar.google.com'].busy
//          if(eventsArr.length == 0) return calendar.events.insert({ calendarId: '5a4d87ff37274a7932031990d00610343420d4ece7f83f1345f9656c6019e6b7@group.calendar.google.com', resource: event}, err => {
//                if(err) return console.error('Calendar Event Creation Error: ', err)

//                return console.log('Calendar Event Created!')
//          })

//          return console.log('Sorry Im Busy')

//    }
// )

//Port
const port = process.env.PORT || 5500;
//Selected Model
const SelectedActivities = require("./models/SelectedActivities");

//ActivityCardModel Model
const ActivityCard = require("./models/ActivityCard");

// require routes
const authRoute = require("./routes/auth");

//setup application
const app = express();
app.use(express.json());
app.use(cors());

//setup view engine EJS, body-parser and express-static
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//initialize passport
app.use(passport.initialize());

//use passport to deal with session
app.use(passport.session());

//Connect to database
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

//use routes
app.use("/", authRoute);

const server = https
  .createServer(options, app, (req, res) => {
    res.end("SSL ADDED");
  })
  .listen(port, () => console.log("Server is Running"));
//Start the server
// server.listen(process.env.PORT, () => console.log("Server is Running"));

app.get("/", (req, res) => {
  var bestTours = [
    {
      id: "T1",
      image: "/assets/bestTours/thailandpackage.jpg",
      blogger: "Robert Jona",
      name: "Thailand",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
    {
      id: "T2",
      image: "/assets/bestTours/telaviv.jpg",
      blogger: "Ameer Azim",
      name: "Tel Aviv",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
    {
      id: "T3",
      image: "/assets/bestTours/turkeypackage.jpg",
      blogger: "Mohammed Habib",
      name: "Turkey",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
    {
      id: "T4",
      image: "/assets/bestTours/usapackage.jpg",
      blogger: "Bill Down",
      name: "USA",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
    {
      id: "T5",
      image: "/assets/bestTours/italypackage.jpg",
      blogger: "Bro Jimm",
      name: "Italy",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
    {
      id: "T6",
      image: "/assets/bestTours/alpspackage.jpg",
      blogger: "Dom William",
      name: "Alps",
      description:
        "Lorem ipsum dolor sit demoise amet consectetur, Ducimusele, repudiandae temporibus omnis illum maxime quod deserunt eligendi dolor",
    },
  ];
  res.render("main", {
    content: "Screens/index",
    tours: bestTours,
  });
});

app.get("/register", (req, res) => {
  res.render("main", {
    content: "Screens/register",
  });
});
app.get("/about", (req, res) => {
  res.render("main", {
    content: "Screens/about",
  });
});
app.get("/contact", (req, res) => {
  res.render("main", {
    content: "Screens/contact",
  });
});

app.get("/login", (req, res) => {
  res.render("main", {
    content: "Screens/login",
  });
});
// app.get("/plan", (req, res) => {
//     res.render("plan");
// });

app.post("/activities", (req, res) => {
  const activity = req.body;
  const db = mongoose.connection;

  db.collection("travelactivities")
    .insertOne(activity)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.get("/plan", (req, res) => {
  const db = mongoose.connection;
  const activityCards = db.collection("travelactivities");
  const selectedActivities = db.collection("selectedactivities");
  activityCards
    .find()
    .toArray()
    .then((result1) => {
      selectedActivities.deleteMany({}, function (err, result) {
        console.log("Collection cleared");
      });
      res.render("plan", { result1: result1 });
      //  res.status(201).json(result1);
      //  console.log(result1);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.get("/getCalendar", (req, res) => {});

app.get("/activitydata", (req, res) => {
  const db = mongoose.connection;
  const activityCards = db.collection("travelactivities");
  activityCards
    .find()
    .toArray()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.post("/addActivity", (req, res) => {
  console.log("called");
  var day = req.body.day;
  var id = req.body.id;
  var uniqueID = day.toString() + id.toString();
  const selectedActivity = new SelectedActivities({
    day: day,
    activityID: id,
    dayID: uniqueID,
  });
  const db = mongoose.connection;
  db.collection("selectedactivities")
    .insertOne(selectedActivity)
    .then(res.status(201).json({ message: "Activity added" }))
    .then(console.log("done"))
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
      res.end();
    });
  res.end();
});

app.delete("/deleteActivity", (req, res) => {
  var day = req.body.day;
  var id = req.body.id;
  var uniqueID = day.toString() + id.toString();
  const db = mongoose.connection;
  db.collection("selectedactivities")
    .deleteOne({ dayID: uniqueID })
    .then(res.status(201).json({ message: "Activity deleted" }))
    .then(console.log("done"))
    .catch((err) => {
      res.status(500).json({ err: "Could not delete the document" });
      res.end();
    });
  res.end();
});

// get selected activities

app.get("/selectedactivities", (req, res) => {
  const db = mongoose.connection;
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const travelactivities = db.collection("selectedactivities");
  const changeStream = travelactivities.watch([
    { $match: { operationType: { $in: ["delete", "insert"] } } },
  ]);
  changeStream.on("change", async function (event) {
    db.collection("selectedactivities")
      .find({})
      .toArray((err, data) => {
        // Send the latest data as an SSE event
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      });
  });
  changeStream.on("end", function () {
    res.end();
  });
  res.on("close", () => {
    changeStream.close();
  });
});

//Post Routes Infoirmation using PostMan
app.post("/routes", (req, res) => {
  const route = req.body;
  const db = mongoose.connection;

  db.collection("routes")
    .insertOne(route)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.get("/routes", (req, res) => {
  const db = mongoose.connection;
  const routes = db.collection("routes");
  const cities = JSON.parse(req.query.cities);

  routes
    .find({ cities: { $all: cities } })
    .toArray()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "Could not create a new document" });
    });
});

app.get("/tour", (req, res) => {
  const tourID = req.query.id;
  res.render("tour", { id: tourID });
  // res.status(200).json(tourID);

  // const db = mongoose.connection;
  // const routes = db.collection('routes');
  // const cities = JSON.parse(req.query.cities);

  // routes.find({ cities: { $all: cities } }).toArray()
  //   .then(result => {
  //     res.status(201).json(result);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ err: 'Could not create a new document' });
  //   });
});
