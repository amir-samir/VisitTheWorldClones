const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const calendar = document.getElementById("calendar");
let events = {};
let saveTheDay = "";
let colorIndex = 0;
let colors = ["#f1c40f", "#16a085", "#2980b9", "#8e44ad", "#2c3e50", "#c0392b"];
let daysCount = 0;

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



function addEvent(event, start, end, day) {
    let startTime = document.getElementById(start);
    let endTime = document.getElementById(end);
    let startTimeValue = start.split("-")
    let endTimeValue = end.split("-")
    let startHour = parseInt(startTimeValue[1])
    let startMin = parseInt(startTimeValue[2])
    let endHour = parseInt(endTimeValue[1])
    let endMin = parseInt(endTimeValue[2])
    //console.log(endHour)
    if (startHour > endHour || (startHour === endHour && startMin >= endMin)) {
        alert("Invalid Time Range")
        return
    }
    for (let i = startHour; i <= endHour; i++) {
        for (let j = startMin; j <= endMin; j++) {
            if (i === startHour && j === startMin) {
                continue;
            }
            if (i === endHour && j === endMin) {
                continue;
            }
            let currentTime = day + "-" + i + "-" + j;
            if (events[currentTime]) {
                alert("This time slot already has an event, please choose a different time slot.");
                return;
            }
        }
    }
    for (let i = startHour; i <= endHour; i++) {
        for (let j = startMin; j <= endMin; j++) {
            let currentTime = saveTheDay + "-" + i + "-" + j + "0";
            let currentTimeElement = document.getElementById(currentTime);
            if (currentTimeElement) {
                events[currentTime] = event;
                let eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.innerHTML = event;
                eventDiv.style.backgroundColor = colors[colorIndex];
                currentTimeElement.appendChild(eventDiv);
            }
            //console.log(currentTime);

        }
    }
    colorIndex = (colorIndex + 1) % colors.length;
}

//addEvent("Meeting", "Monday-10-00", "Monday-12-30");



//convert the time format to match the id format
function convertTimeFormat(time) {
    let day = time.split(" ")[0];
    saveTheDay = day;
    console.log(day);
    let hour = time.split(" ")[1].split(":")[0];
    let min = time.split(" ")[1].split(":")[1];
    return day + "-" + hour + "-" + min;
}

let addEventButton = document.getElementById("addEvent");
addEventButton.addEventListener("click", function () {
    let event = prompt("Event name:");
    let startTime = prompt("Start time (Example : Monday 9:00):");
    let endTime = prompt("End time (Example : Monday 9:00):");
    startTime = convertTimeFormat(startTime);
    endTime = convertTimeFormat(endTime);
    //console.log(startTime);
    addEvent(event, startTime, endTime, saveTheDay);
});


// defining an array to save the activities
const activitiesData = [];
// defining an array to save selected activities
const selectedActivities = [];
// fetching the activities collection from mongodb
fetch('http://localhost:5500/activitydata')
    .then(response => { return response.json() })
    .then(result1 => result1.forEach(element => {
        activitiesData.push(element)
    }))
    .then(console.log(activitiesData))
    .catch(err => console.log(err))



//creating multiple arrays to save the multiple selectedAvtivities every day
var allSelectedActivities = []
function createSelectedActivityArrays(i){
    for (let a = 0; a < i; a++ ){
      var newArray = [];
      allSelectedActivities.push(newArray);
    }
}

//creating m,ultiple arrays to save the multiple selections for every day
var allselectingArrays = []
function createArrays(i){
      for (let a = 0; a < i; a++ ){
        var dayArray = [];
        var countryArray = [];
        var cityArray = [];
        var activityArray = [];
        var newArray = [dayArray,countryArray,cityArray,activityArray];
        allselectingArrays.push(newArray);
      }
}




$(function () {
    $(".date-picker").datepicker({
        dateFormat: 'D, d M'
    });
})


// return days count between trip-start and trip-end 
$('#trip-end').datepicker({
    onSelect: function (days) {
        var a = $("#trip-start").datepicker('getDate').getTime(),
            b = $("#trip-end").datepicker('getDate').getTime(),
            c = 24 * 60 * 60 * 1000,
            diffDays = Math.round(Math.abs((a - b) / (c)));
        console.log(diffDays);
        let allPosts = "";
        for (let i = 0; i < diffDays; i++) {
            daysCount++;
            allPosts += `
            <div class="container mt-5" data-dayId="day${i}" id="duration-type-planner-container">
            <form>
              <h1>Day ${i + 1}</h1>
        <div class="row">
            <div class="col-4">
            <select class="custom-select" id="inputGroupSelect01" name="selectcountry" data-id="${i}">
            <option selected>Country</option>
            <option value="Germany">Germany</option>
            <option value="Usa">USA</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Italy">Italy</option>
            </select>
            </div>
            <div class="col-4">
            <select class="custom-select" id="inputGroupSelect01" name="selectcity" data-id="${i}">
            <option selected>City</option>
            <option value="munich">Munich</option>
            <option value="hamburg">Hamburg</option>
            <option value="stuttgart">Stuttgart</option>
            </select>    
            </div>
            <div class="col-4">
            <select class="custom-select" id="inputGroupSelect01" name="selectactivity" data-id="${i}">
            <option selected>Activity</option>
            <option value="Swimming">Swimming</option>
            <option value="Nature">Nature</option>
            <option value="Spa">SPA</option>
            <option value="Biking">Biking</option>
            <option value="City Tour">City Tour</option>
            <option value="Museum">Museum</option>
            </select> 
            </div>
        </div>
        <div class="row">
        <div class="container activities mt-5">

        <div class="swiper activitySwiper${i}">

            <div class="swiper-wrapper wrap${i}">

            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
       
      </div>
        </div>
            </form>
          </div>


          <div class="container mt-5 duration-type-planner-container" data-dayId="day${i}" id="selected${i+1}">
            <form>
              <h1>Selected Activities Day ${i + 1}</h1>
              <div class="row">
                <div class="container activities mt-5">

                <div class="swiper activitySwiper${i}">

                <div class="swiper-wrapper selectedwrap${i}">

              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
              </div>
       
             </div>
             </div>
            </form>
        </div>
`;
            previews.innerHTML = allPosts;
            defineSlider();
            //getActivity();

           
        }

         // call create arrays method
         createArrays(diffDays);
         // call create selectedActivitiesArray
         createSelectedActivityArrays(diffDays);
         //save selected values
         $(document).ready(function(){
            //save selected country and day
             $('select[name=selectcountry]').change(function(){
                 var day = $(this).attr("data-id");
                 var tempoArray = allselectingArrays[day];
                 tempoArray[0] = [];
                 tempoArray[1] = [];
                 tempoArray[0] = [day];
                 tempoArray[1].push($(this).val());
                 console.log(allselectingArrays);
             });
             
             //save selected city
             $('select[name=selectcity]').change(function(){
                var day = $(this).attr("data-id");
                var tempoArray = allselectingArrays[day];
                tempoArray[2] = [];
                tempoArray[2].push($(this).val());
                console.log(allselectingArrays);
            });

            // save selected activities
            $('select[name=selectactivity]').change(function(){
                var day = $(this).attr("data-id");
                var tempoArray = allselectingArrays[day];
                tempoArray[3] = [];
                tempoArray[3].push($(this).val());
                console.log(allselectingArrays);
                getActivity(allselectingArrays, day);
            });
         });
    }
     
}); //show difference})

function populateData(item) {
    console.log(item);
}




function defineSlider() {
    for (let i = 0; i < daysCount; i++) {
        var swiperId = ".activitySwiper" + i;
        new Swiper(swiperId, {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,

                },
            },
        });
    }
}

function  getActivityId(id){
    const parentDayContainer  = $(`#${id}`).closest('div').find('[data-dayId]')
    console.log(`activityId: ${id}, day: ${parentDayContainer}`);
    
}



function getActivity(array, day) {

    // save variable to save in the button classname
    var buttonName = 0;
    var tempArray = array[day];
    let output = "";
    for (let item of activitiesData) {
        if(item.location == tempArray[2] && item.activityArt == tempArray[3]){
        output += `
        <div class="swiper-slide" id="${item._id}">

        <div class="activity">
        <img src="${item.image}" alt="Nice Forest image" class="placeImage">
        <h1 class="place">${item.place}</h1>
        <ul class="travelFeatures">
            <li class="travelFeaturesItem duration">Duration: ${item.duration}</li>
            <li class="travelFeaturesItem gallery">Open the Gallery: ${item.gallerylink}</li>
            <li class="travelFeaturesItem opening">Opening Hours: ${item.opening}</li>
            <li class="travelFeaturesItem blogger">Blogger: ${item.blogger}</li>
        </ul>
        <span class="activityPrice"> <span>&#8377;</span>599</span>
        <div class="row">
            <div class="col-6">
                <a href="#/" class="button activityButton${day}${buttonName}" role="button" name="${day}" id="${item._id}${day}" data-id="${item._id}">Add Activity</a>
            </div>
            <div class="col-6">
                <a href="#/" class="button">Read more</a>
            </div>
        </div>
    </div>

            </div>
    
        `;
        buttonName++;
    }
    }

    var wrapperName = ".wrap" + day;
    document.querySelector(wrapperName).innerHTML = output;

    for (let index = 0; index < buttonName; index++) {
        var classNameButtonAddActivity = "activityButton" + day + index;
        $('.' + classNameButtonAddActivity).on('click', async function(){
            $(this).css({
                "text-decoration": "none",
                "color": "black",
                "pointer-events": "none"
            });
          await fetch('http://localhost:5500/addActivity',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              day: $(this).attr("name"),
              id: $(this).attr("data-id") 
            })
          })
          .then(function (response) {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(function (data) {
            console.log(data);
          })
          .catch(function (error) {
            console.error('Error:', error);
          });
        });
      }
    
    
    
    
}

const source = new EventSource('/selectedactivities');
source.onopen = () => {
  console.log("Connected to the database!");
};
source.onmessage = (event) => {
  const data = JSON.parse(event.data);
  for(let i = 0; i < allSelectedActivities.length; i++){
    allSelectedActivities[i] = [];
  }
  data.forEach(element => {
    allSelectedActivities[element.day].push(element.activityID);
    fillSelectedItems(allSelectedActivities);
  })
  
  // Do something with the updated data
  console.log(allSelectedActivities);
};

function fillSelectedItems(array){
    var buttonName = 0;
     for(let i = 0; i < array.length; i++){
        let output = "";
        for(let j = 0; j < array[i].length; j++){
             var temArray = array[i];
            for (let item of activitiesData) {
                if(item._id == temArray[j] ){

            output += `
            <div class="swiper-slide" id="${item._id}">
    
            <div class="activity">
            <img src="${item.image}" alt="Nice Forest image" class="placeImage">
            <h1 class="place">${item.place}</h1>
            <ul class="travelFeatures">
                <li class="travelFeaturesItem duration">Duration: ${item.duration}</li>
                <li class="travelFeaturesItem gallery">Open the Gallery: ${item.gallerylink}</li>
                <li class="travelFeaturesItem opening">Opening Hours: ${item.opening}</li>
                <li class="travelFeaturesItem blogger">Blogger: ${item.blogger}</li>
            </ul>
            <span class="activityPrice"> <span>&#8377;</span>599</span>
            <div class="row">
                <div class="col-12">
                    <a href="#/" class="button removeButton${buttonName}" role="button" name="${j}" id="${item._id}${j}" data-id="${item._id}">Remove</a>
                </div>
            </div>
        </div>
    
                </div>
        
            `;
            buttonName++;
                }
            }
        
        }
           var selecterWrapperNamr = ".selectedwrap" + i;
           document.querySelector(selecterWrapperNamr).innerHTML = output; 
           
           for (let index = 0; index < buttonName; index++) {
            var classNameButtonAddActivity = "removeButton" + index;
            $('.' + classNameButtonAddActivity).on('click', async function(){

              await fetch('http://localhost:5500/deleteActivity',{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  day: $(this).attr("name"),
                  id: $(this).attr("data-id") 
                })
              })
              .then(function (response) {
                if (!response.ok) {
                  throw new Error(response.statusText);
                }
                return response.json();
              })
              .then(function (data) {
                console.log(data);
              })
              .catch(function (error) {
                console.error('Error:', error);
              });
            });
          }
     }
}







