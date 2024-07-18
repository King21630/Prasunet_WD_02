let startTime;
let elapsedTime = 0;
let timerInterval;
const laps = [];

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    updateButtonStates(true, false, false, false);
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    updateButtonStates(false, true, true, true);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    laps.length = 0;
    updateDisplay();
    updateButtonStates(false, true, false, true);
    clearLaps();
}

function recordLap() {
    const lapTime = elapsedTime;
    laps.push(lapTime);
    displayLap(lapTime);
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(milliseconds) {
    const hours = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    const ms = String(milliseconds % 1000).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${ms}`;
}

function displayLap(lapTime) {
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapItem.classList.add('lap-item');
    document.getElementById('laps').appendChild(lapItem);
}

function clearLaps() {
    document.getElementById('laps').innerHTML = '';
}

function updateButtonStates(startDisabled, pauseDisabled, resetDisabled, lapDisabled) {
    document.getElementById('startButton').disabled = startDisabled;
    document.getElementById('pauseButton').disabled = pauseDisabled;
    document.getElementById('resetButton').disabled = resetDisabled;
    document.getElementById('lapButton').disabled = lapDisabled;
}
