const router = require('express').Router();
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const calendar = document.getElementById("calendar");
let events = {};
let saveTheDay = "";
let colorIndex = 0;
let colors = ["#f1c40f", "#16a085", "#2980b9", "#8e44ad", "#2c3e50", "#c0392b"];

for (let i = 0; i < hours.length; i++) {
    let row = document.createElement("tr");
    let hourCell = document.createElement("th");
    hourCell.innerHTML = hours[i];
    row.appendChild(hourCell);
    for (let j = 0; j < days.length; j++) {
        let dayCell = document.createElement("td");
        let hour = hours[i].split(":")[0];
        let min = hours[i].split(":")[1];
        dayCell.id = days[j] + "-" + hour + "-" + min;
        row.appendChild(dayCell);
    }
    calendar.appendChild(row);
}

router.post("/planit", async (req, res)=>{
    try{
        for (let i = 0; i < hours.length; i++) {
            let row = document.createElement("tr");
            let hourCell = document.createElement("th");
            hourCell.innerHTML = hours[i];
            row.appendChild(hourCell);
            for (let j = 0; j < days.length; j++) {
                let dayCell = document.createElement("td");
                let hour = hours[i].split(":")[0];
                let min = hours[i].split(":")[1];
                dayCell.id = days[j] + "-" + hour + "-" + min;
                row.appendChild(dayCell);
            }
            calendar.appendChild(row);
        }
    }catch(err){
       res.redirect('/');
       console.log(err);
    }
});