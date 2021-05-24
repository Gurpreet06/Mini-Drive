// Colect Id's from elements
let refdate = document.getElementById('date') // Reference to Date
let refTime = document.getElementById('tim') // Reference to Time

//Create Date 
let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
let current = new Date()
let time = current.getDate() + " " + months[current.getMonth()];
refdate.innerHTML = time

setInterval (function () {
    // Create Time
    let times = '';
    if (current.getMinutes() < 10) {
        times = current.getHours() + ":" + "0" + current.getMinutes();
    } else {
        times = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds()
    }
    refTime.innerHTML = times
}, 1000);