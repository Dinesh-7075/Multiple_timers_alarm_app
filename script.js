const audioElement = document.getElementById("alarm-tone");
const current_timers_msg = document.getElementById("current-timers");
audioElement.style.display = "none";
const setAlarmBtn = document.getElementById("set-btn");
const timersList = document.getElementById("timers-list");
const timers = [];
let seconds;
let alarms = 0;
const hr = document.querySelector("#hour");
const mm = document.querySelector("#min");
const ss = document.querySelector("#sec");

    hr.addEventListener("click", () => {
    hr.innerHTML = "";
    });

    mm.addEventListener("click", () => {
    mm.innerHTML = "";
    });

    ss.addEventListener("click", () => {
    ss.innerHTML = "";
    });

// Checking the User input is valid or not on clicking setButton
setAlarmBtn.addEventListener("click", (event) => {
  let hours = parseInt(document.getElementById("hour").textContent);
  let min = parseInt(document.getElementById("min").textContent);
  let sec = parseInt(document.getElementById("sec").textContent);
  seconds = hours * 60 * 60 + min * 60 + sec; // converting hours, min and sec into seconds
  event.preventDefault();
  console.log("clicked on Set Button");
  isValidTimeFormat(event, min, sec);
});

function isValidTimeFormat(event, min, sec) {
  console.log("inside isValidTimeFormat function");
  if (min >= 0 && min < 60 && sec >= 0 && sec < 60) {
    // Calling this function to start the countdown
    timers.push({ name: timers.length + 1, duration: seconds });
    console.log(timers);
    initializeTimers(timers[timers.length - 1]);
  } else alert(`Please Enter valid time \nExample --> 00:00:07`);
}

//Initializing the Timers
function initializeTimers(timer){
  var alarmBox = document.createElement("div");
  console.log(timer.name);
  console.log(timer.interval);
  alarmBox.setAttribute("id", timer.name);
  alarmBox.className = "timer-div";
  alarmBox.innerHTML = ``;
  timersList.appendChild(alarmBox);
  handleTimer(timer);
  alarms++;
}

// Updating the Timer Display function
function updateTimerDisplay(timer) {
  if (document.getElementById(timer.name)) {
    const timerElement = document.getElementById(timer.name);
    timerElement.innerHTML = `
        <div class="inside-set-time-container gapClass timer-box">
        <p id="set-time">Time Left  :</p>
        <div id="time-interval-active" class="inside-set-time-container">
            <p id="hour">${Math.floor(timer.duration / 3600)
              .toString()
              .padStart(2, "0")}</p>
            <p>:</p>
            <p id="min">${Math.floor((timer.duration % 3600) / 60)
              .toString()
              .padStart(2, "0")}</p>
            <p>:</p>
            <p id="sec">${Math.floor(timer.duration % 60)
              .toString()
              .padStart(2, "0")}</p>
        </div>
        <div id="set-btn" onClick="deleteAlarm(${timer.name})">Delete</div>
    </div>
        `;
  }
}

// Set and Clear interval function for playing alarm music
function handleTimer(timer) {
  updateTimerDisplay(timer);
  timer.interval = setInterval(function () {
    timer.duration--;
    updateTimerDisplay(timer);
    if (timer.duration <= 0) {
      clearInterval(timer.interval);
      if (document.getElementById(timer.name)) {
        const timerElement = document.getElementById(timer.name);
        timerElement.className = "timer-div-finished";
        timerElement.innerHTML = `
          <div>
                <div class="inside-set-time-container gapClass timer-box-finished">
                <div id="time-interval-finished" class="inside-set-time-container">
                    <p>Timer Is Up!</p>
                </div>
                <div id="stop-btn-finished" onClick="deleteAlarm(${timer.name})">Stop</div>
            </div>
                `;
         playAlarmMusic();
      }
    }
  }, 1000);
}

//Delete Timer function
function deleteAlarm(elementId) {
  timersList.removeChild(document.getElementById(`${elementId}`));
  timers.splice(elementId - 1, 1);
  alarms--;
  console.log(alarms);
  stopAlarmMusic();
}

// displaying current Timers message Function
function noAlarmOnScreen() {
  if (alarms === 0) {
    current_timers_msg.style.display = "block";
  } else {
    current_timers_msg.style.display = "none";
  }
}

// Play Alarm Music function
function playAlarmMusic() {
  console.log("");
  audioElement.play();
}

// Stop Alarm Music function
function stopAlarmMusic() {
  console.log("music stopd");
  audioElement.pause();
  audioElement.currentTime = 0;
}

setInterval(noAlarmOnScreen, 100);
