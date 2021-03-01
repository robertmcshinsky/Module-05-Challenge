let mySchedule = JSON.parse(localStorage.getItem("Appointment")) || [];
mySchedule[24] = "";
let month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let time = new Date();
document.querySelector("#currentDay").innerHTML =
  week[time.getDay()] + ", " + month[time.getMonth()] + " " + time.getDate();

let appointment;

//let testVariable = JSON.parse(localStorage.getItem("Appointment"));
function main() {
  console.log("@main");

  for (let i = 9; i < 18; ++i) {
    // Find the previously appointed appointment
    if (i > 8 && i < 18) {
      appointment = mySchedule[i];
      if (mySchedule[i] === null) {
        appointment = " - Click here to set Schedule - ";
      }
    } else {
      appointment = " - Click here to set Schedule - ";
    }
    if (appointment === undefined) {
      appointment = " - Click here to set Schedule - ";
    }

    //
    displayTimeBlocks(i, appointment);
  }
  updateTextInTimeBlock();
}

function displayTimeBlocks(i, appointment) {
  let hourEl = document.createElement("div");
  let pastEl = document.createElement("textarea");
  let presentEl = document.createElement("textarea");
  let futureEl = document.createElement("textarea");
  let saveBtnEl = document.createElement("div");
  let row = document.createElement("div");
  let timeBlockEl = document.createElement("div");

  hourEl.setAttribute("id", "hour" + i);
  pastEl.setAttribute("id", "past" + i);
  presentEl.setAttribute("id", "present" + i);
  futureEl.setAttribute("id", "future" + i);
  saveBtnEl.setAttribute("id", "saveBtn" + i);
  row.setAttribute("id", "row" + i);
  timeBlockEl.setAttribute("id", "timeBlock" + i);

  // Search the local storage and if there is an element with the same id as i, then change the appointment text to the text inside that id.

  pastEl.setAttribute("placeholder", appointment);
  presentEl.setAttribute("placeholder", appointment);
  futureEl.setAttribute("placeholder", appointment);

  hourEl.setAttribute("class", "hour");
  pastEl.setAttribute("class", "past timeSlot");
  presentEl.setAttribute("class", "present timeSlot");
  futureEl.setAttribute("class", "future timeSlot");
  saveBtnEl.setAttribute("class", "saveBtn");
  row.setAttribute("class", "row");
  timeBlockEl.setAttribute("class", "timeBlock");

  saveBtnEl.innerHTML = "SAVE";

  if (i < 12) {
    hourEl.innerHTML = i + ":00 AM";
  } else if (i === 12) {
    hourEl.innerHTML = i + ":00 PM";
  } else {
    hourEl.innerHTML = i - 12 + ":00 PM";
  }

  if (i < time.getHours()) {
    row.appendChild(hourEl);
    row.appendChild(pastEl);
  } else if (i === time.getHours()) {
    row.appendChild(hourEl);
    row.appendChild(presentEl);
  } else {
    row.appendChild(hourEl);
    row.appendChild(futureEl);
  }
  row.appendChild(saveBtnEl);

  timeBlockEl.appendChild(row);

  document.querySelector(".container").appendChild(timeBlockEl);
}

function updateTextInTimeBlock() {
  console.log("@updateTextInTimeBlock");

  let thisId, text, textInput;

  // PAST
  $(".past, .present, .future").on("click", function () {
    thisId = $(this).attr("id");
    text = $(this).text();
    console.log(text);
    console.log(thisId);
  });

  // SAVE BUTTON
  $(".saveBtn").on("click", function () {
    thisId = $(this).attr("id");
    console.log(thisId);
    // FINDING THE APPOINTMENT ID NEXT TO IT
    let idNum = thisId.replace(/\D/g, "");
    console.log(idNum);
    console.log(time.getHours());
    if (idNum < time.getHours()) {
      newId = "past" + idNum;
    } else if (idNum == time.getHours()) {
      newId = "present" + idNum;
    } else {
      newId = "future" + idNum;
    }
    console.log(newId);
    let newText;
    newText = document.querySelector("#" + newId).value;
    console.log(newText);

    document.querySelector("#" + newId).innerHTML = newText;

    // SAVING TO ARRAY OF OBJECTS mySchedule
    let appointment = newText;
    mySchedule[idNum] = appointment;
    localStorage.setItem("Appointment", JSON.stringify(mySchedule));
  });
}

//! DECLARING MAIN
main();
