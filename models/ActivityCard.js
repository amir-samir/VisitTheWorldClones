//require mongoose
const mongoose = require('mongoose');


//Create User Schema:
const activitySchema = new mongoose.Schema({
    image: String,
    place: String,
    duration: String,
    city: String,
    opening: String,
    blogger: String,
    location: String,
    activityArt: String
});

//export User model
module.exports = mongoose.model('ActivityCard', activitySchema);