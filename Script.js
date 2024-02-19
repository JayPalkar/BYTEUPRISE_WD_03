// accessing components
let StartBtn = document.getElementById('startBtn');
let PauseBtn = document.getElementById('pauseBtn');
let ResetBtn = document.getElementById('resetBtn');
let LapBtn = document.getElementById('lapBtn');
let lapsContainer = document.getElementById('lapsContainer');

let hr = 0;  // hours variable
let min = 0;  // minutes variable
let sec = 0;  // seconds variable
let ms = 0;  // milliseconds variable
let time = false;  // variable displaying state of stopwatch false = off and true = on
let lapCounter = 1; // counter for laps

// function to handle start button request
StartBtn.addEventListener('click', function () {
    PauseBtn.style.display = 'inline'; // to toggle pause button (showing)
    StartBtn.style.display = 'none'; // to toggle start button (hidden)
    time = true;
    stopWatch();  // calling stopWatch() function
});

// function to handle pause button request
PauseBtn.addEventListener('click', function () {
    PauseBtn.style.display = 'none';  // to toggle pause button (hidden)
    StartBtn.style.display = 'inline'; // to toggle start button (showing)
    time = false;
});

// function to handle reset button request
ResetBtn.addEventListener('click', function () {
    PauseBtn.style.display = 'none'; //to toggle pause button (hidden)
    StartBtn.style.display = 'inline'; //to toggle start button (showing)
    time = false;
    hr = 0;
    min = 0;
    sec = 0;
    ms = 0;
    lapCounter = 1;   // setting lap counter back to 1
    lapsContainer.innerHTML = '';   // emptying the laps container
    updateTimerDisplay();  // calling updateTimerDisplay() function
});

// function to handle Lap button request
LapBtn.addEventListener('click', function () {
    if (time) {
        let lapTime = formatTime(hr, min, sec, ms); // format time using formatTime() function and save in lapTime variable
        let lapItem = document.createElement('div');  
        lapItem.innerText = 'Lap ' + lapCounter + ': ' + lapTime;
        lapsContainer.appendChild(lapItem);
        lapCounter++;
    }
});

// function which handles basic working of stopwatch
function stopWatch() {
    if (time) {
        ms++;   // increment miliseconds 

        // if ms == 100 increment seconds by 1
        if (ms == 100) {
            sec++;
            ms = 0;
        }

        // if sec == 60 increment minutes by 1
        if (sec == 60) {
            min++;
            sec = 0;
        }

        // if min == 60 increment minutes by 1
        if (min == 60) {
            hrs++;
            min = 0;
            sec = 0;
        }

        updateTimerDisplay(); // calling updateTimerDisplay() functoin
        setTimeout(stopWatch, 10); // calls stopWatch after every 10 miliseconds
        }
    }

    // fucntion to update time on the screen
    function updateTimerDisplay() {
        document.getElementById('hrs').textContent = formatTimeUnit(hr);
        document.getElementById('min').textContent = formatTimeUnit(min);
        document.getElementById('sec').textContent = formatTimeUnit(sec);
        document.getElementById('ms').textContent = formatTimeUnit(ms);
    }
    
    // format time such that if time is less than 10 the 0 must be added before the number like 01, 02 ... etc
    function formatTimeUnit(unit) {
        return unit < 10 ? '0' + unit : unit;
    }
    
    // function to format time before inserting int the laps section
    function formatTime(hr, min, sec, ms) {
        return (
            formatTimeUnit(hr) +
            ':' +
            formatTimeUnit(min) +
            ':' +
            formatTimeUnit(sec) +
            '.' +
            formatTimeUnit(ms)
        );
    }

    