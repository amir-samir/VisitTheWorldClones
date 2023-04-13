// <!-- Container -->
// <div class="container">
//   <!-- Table -->
//   <div class="tabular-data module">

//     <!-- Table Head -->
//     <div class="data-group data-header hidden-sm hidden-xs">
//       <div class="row">
//         <div class="col-lg-2 col-md-1">
//           <strong class="uppercase">Select</strong>
//         </div>
//         <div class="col-lg-2 col-md-4">
//           <strong class="uppercase">Blogger</strong>
//         </div>
//         <div class="col-lg-2 col-md-4">
//           <strong class="uppercase">Duration</strong>
//         </div>
//         <div class="col-lg-2 col-md-4">
//           <strong class="uppercase">type</strong>
//         </div>
//         <div class="col-lg-2 col-md-4">
//           <strong class="uppercase">Price</strong>
//         </div>
//         <div class="col-lg-2 col-md-4">
//           <strong class="uppercase">Info</strong>
//         </div>
//       </div>
//     </div>
//     <!-- Table Head -->
//     <!-- Table Row -->
//     <div class="data-group">
//       <div class="row">
//         <div class="data-expands">
//           <div class="col-lg-2 col-md-1">
//             <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
//           </div>
//           <div class="col-lg-2 col-md-7">
//             <span class="title">Mohammed Samir</span>
//           </div>
//           <div class="col-lg-2 col-md-7">
//             <span class="title">5 Days</span>
//           </div>
//           <div class="col-lg-2 col-md-4">
//             <div class="red uppercase"><strong><i class="fa-solid fa-face-kiss-wink-heart"></i> Young Couple</strong>
//             </div>
//           </div>
//           <div class="col-lg-2 col-md-7">
//             <span class="title">2300$</span>
//           </div>

//           <div class="col-lg-2 col-md-7">
//             <span class="title">Read More</span>
//             <span class="row-toggle">
//               <span class="horizontal"></span>
//               <span class="vertical"></span>
//             </span>
//           </div>
//         </div>
//         <div class="expandable">
//           <div class="row">
//             <div class="col-lg-8 col-lg-offset-1 col-md-7 col-md-offset-1">
//               <p><h4>Cities:</h4> Munich <i class="fa-solid fa-arrow-right"></i> Nuremberg <i class="fa-solid fa-arrow-right"></i> Prague <i class="fa-solid fa-arrow-right"></i> Leipzig <i class="fa-solid fa-arrow-right"></i> Berlin <i class="fa-solid fa-arrow-right"></i> Hamburg</p>
//               <hr>
//               <p><h4>Arts of Activities:</h4> <i class="fa-solid fa-person-swimming"></i> Swimming, <i class="fa-solid fa-tree"></i> Nature, <i class="fa-solid fa-city"></i> City Tour, <i class="fa-solid fa-landmark"></i> History, <i class="fa-solid fa-children"></i> Kids, <i class="fa-solid fa-person-running"></i> Sport, <i class="fa-solid fa-holly-berry"></i> Festival, <i class="fa-solid fa-gamepad"></i> Games, <i class="fa-solid fa-heart"></i> Romantic </p>
//               <hr>
//               <p><h4>Activities</h4> Isar, Englisher Garden, cinema, hello, yesNo</p>
//               <hr>
//             </div>
//             <div class="col-lg-3 col-md-4">
//               <div class="row">
//                 <div class="col-xs-12 visible-sm visible-xs"><hr></div>
//                 <div class="col-xs-6">Rating</div>
//                 <div class="col-xs-6 text-right">5<i class="fa-solid fa-star"></i></div>
//                 <div class="col-xs-6">Reviews</div>
//                 <div class="col-xs-6 text-right">click here</div>
//                 <div class="col-xs-6">Best Season</div>
//                 <div class="col-xs-6 text-right">Summer<i class="fa-solid fa-sun"></i></div>
//                 <div class="col-xs-12"><hr></div>
//                 <div class="col-xs-6">Booked</div>
//                 <div class="col-xs-6 text-right">10 Times</div>
//                 <div class="col-xs-12"><hr></div>
//                 <div class="col-xs-6"><a href="#" class="btn btn-black"><i class="fa fa-phone"></i> Contact</a></div>
//                 <div class="col-xs-6 text-right"><a href="#" class="btn btn-green"><i class="fa fa-check-circle-o"></i> Select</a></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <!-- Table Row -->
//   </div>
//   <!-- Table -->
// </div>
// <!-- Container --></div>



// console.log("hatha ho", updatedActivitiesTimes[i]);
// console.log("hen", updatedActivitiesTimes);
// alert("No time To add this activity");
// var theItem = updatedActivitiesTimes.find(item => item.id == id);
// var theDay =  theItem.day;
// await fetch('https://localhost:5500/deleteActivity', {
//  method: 'DELETE',
//  headers: {
//    'Content-Type': 'application/json'
//  },
//  body: JSON.stringify({
//    day: theDay,
//    id: id
//  })
// })
//  .then(function (response) {
//    if (!response.ok) {
//      throw new Error(response.statusText);
//    }
//    return response.json();
//  })
//  .catch(function (error) {
//    console.error('Error:', error);
//  });
// // Remove element from currentDistance
// const index1 = currentDistance.findIndex(item => item.id === id);
// if (index1 !== -1) {
//  currentDistance.splice(index1, 1);
// }

// // Remove element from currentDistance with 'to' property matching id
// const index2 = currentDistance.findIndex(item => item.to === id);
// if (index2 !== -1) {
//  currentDistance.splice(index2, 1);
// }

// // Remove element from allselectingArrays[day]
// const index3 = allselectingArrays[saveTheDay].findIndex(item => item.id === id);
// if (index3 !== -1) {
//  allselectingArrays[saveTheDay].splice(index3, 1);
// }

// // Remove element from selectedArrays
// const index4 = selectedArrays.findIndex(item => item.id === id);
// if (index4 !== -1) {
//  selectedArrays.splice(index4, 1);
// }

// const index5 = allSelectedActivities[saveTheDay].findIndex(item => item.id === id);
// if(index5 !== -1){
//  allSelectedActivities[saveTheDay].splice(index5, 1);
// }
// addDistances(selectedArrays, currentDistance, day);