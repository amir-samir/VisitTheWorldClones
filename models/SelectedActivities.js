//require mongoose, passport-local-mongoose
const mongoose = require('mongoose');


//Create User Schema:
const selectedActivitySchema = new mongoose.Schema({
    day: String,
    activityID: String,
    dayID: {
        type: String,
        unique: true
    }
});


//export User model
module.exports = mongoose.model('SelectedActivities', selectedActivitySchema);