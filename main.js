//global variables
var category;
var invalidKeys = ['-', '+', 'e', 'E', '.'];
var activities = [];
// querySelectors

//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var buttonImages = document.querySelectorAll('.category-button-icons');
var startActivityButton = document.querySelector('.start-activity-button');
var startTimerButton = document.querySelector('.start-timer-button');
var categoryButtons = document.querySelectorAll('.category-button-style');
var logActivityButton = document.querySelector('.log-activity-button');
//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var inputs = document.querySelectorAll('input');

// sections
var currentActivitySection = document.querySelector('.current-activity');
var newActivitySection = document.querySelector('.new-activity');
var pastActivitiesSection = document.querySelector('.past-activities')

//titles
var timerCountdown = document.querySelector('.timer-countdown');
var errorMessages = document.querySelectorAll('.error-message');
var newActivityTitle = document.querySelector('.new-activity-title');
var intentionActivityTitle = document.querySelector('.intention-activity-title');
var activityCompletedTitle = document.querySelector('.activity-complete-title')



//function that adds class with new style

studyButton.addEventListener('click', function(event) {
  hightlightButton(event);
});

meditateButton.addEventListener('click', function(event) {
  hightlightButton(event);
});

exerciseButton.addEventListener('click', function(event) {
  hightlightButton(event);
});

startActivityButton.addEventListener('click', startActivity);

startTimerButton.addEventListener('click', getActivity);

minutesInput.addEventListener('keydown', preventEInput);
secondsInput.addEventListener('keydown', preventEInput);
// logActivityButton.addEventListener('click', )

//reusable functions
function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function changeText(element, newText) {
  element.innerText = `${newText}`;
}

function getActivity() {
  activities[activities.length - 1].startTimer();
}

//functions
function hightlightButton(event) {
    category = event.target.innerText.toLowerCase();
    event.target.classList.add(`${category}-button-active`);
    event.target.children[0].attributes[1].value = `assets/${category}-active.svg`;
}

function preventEInput(event) {
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}

function displayErrorMessage() {
  event.preventDefault();
  var formFilled = 0;
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      errorMessages[i].classList.remove('hidden');
    } else if (inputs[i].value) {
      errorMessages[i].classList.add('hidden');
      formFilled++;
    }
  }
  return formFilled;
}

function startActivity() {
  displayErrorMessage();
  if (displayErrorMessage() === 3) {
    createActivity(category);
    displayCurrentActivity();
  }
}

function createActivity(category) {
  var newActivity = new Activity(category, accomplishInput.value, minutesInput.value, secondsInput.value);
  activities.push(newActivity);
}

function displayCompleteMessage() {
  hideElement(startTimerButton);
  hideElement(timerCountdown);
  showElement(logActivityButton);
  showElement(activityCompletedTitle);
}

function createActivityLogs() {
  pastActivitiesSection.innerHTML = '';
  for (var i = 0; i < activities.length; i++)  {
    pastActivitiesSection.innerHTML += ``
  }
}

function setTimer() {
  timerCountdown.innerText = `${minutesInput.value}:${secondsInput.value}`;
}

function changeStartButtonStyle(intentionCategory) {
  startTimerButton.classList.add(`start-${intentionCategory}-timer`);
}

function displayCurrentActivity() {
  hideElement(newActivitySection);
  showElement(currentActivitySection);
  changeText(newActivityTitle, 'Current Activity');
  setTimer();
  changeStartButtonStyle(category);
  changeText(intentionActivityTitle, accomplishInput.value);
}
