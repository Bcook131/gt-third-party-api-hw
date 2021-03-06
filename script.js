// displaying current date and time
$('#currentDate p').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

// function for button to save
$("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    saveSchedule(hourString, value);
});

// set calendar day equal to different times and strings
let calendarDay = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 AM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
};

let counter = 1;
for (const property in calendarDay) {
    let textInfo = "#text-info" + counter;
    $(textInfo).text(calendarDay[property]);
    let timeId = ".hour" + counter;
    let currentHour =  moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = hourNumberFromHourString(timeString);
    // add classes to text-info to add color to past present and future
    if (timeNumber < currentHour) {
        $(textInfo).addClass("past");
    } else if (timeNumber > currentHour) {
        $(textInfo).addClass("future");
    } else {
        $(textInfo).addClass("present");
    }
    counter ++;
}

$(document).ready(function(){
    if(!localStorage.getItem('calendarDay')) {
        updateCalendarTasks(calendarDay);
    } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem('calendarDay')));
    }
})

// update calendar
function updateCalendarTasks(dayObject) {
    $(".row").each(function(index) {
        let res = $(this).children("div");
        $(this).children("textarea").text(dayObject[res.text()]);
    })
}
 
function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
}

function initializeLocalStorage() {
    localStorage.setItem('calendarDay', JSON.stringify(calendarDay));
};

function loadCorrectDataset() {
    result = localStorage.getItem('calendarDay')
    return (result ? result : calendarDay);
}

function saveSchedule(hourString, val) {
    if(!localStorage.getItem('calendarDay')) {
        initializeLocalStorage();
    }
    let workHours = JSON.parse(localStorage.getItem('calendarDay'));
    workHours[hourString] = val

  saveToLocalStorage(workHours);
}

function saveToLocalStorage(dayObj) {
    localStorage.setItem('calendarDay', JSON.stringify(dayObj));
}