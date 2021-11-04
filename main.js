//global variables
var invalidKeys = ['-', '+', 'e', 'E', '.'];
var activites = [];
// querySelectors

//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var buttonImages = document.querySelectorAll('.category-button-icons');
var startActivityButton = document.querySelector('.start-activity-button');
var startTimerButton = document.querySelector('.start-timer-button')
var categoryButtons = document.querySelectorAll('.category-button-style');
//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var inputs = document.querySelectorAll('input');
var errorMessages = document.querySelectorAll('.error-message');
var newActivityTitle = document.querySelector('.new-activity-title');
var timerCountdown = document.querySelector('.timer-countdown');
var newActivitySection = document.querySelector('.new-activity');
var currentActivitySection = document.querySelector('.current-activity');
var intentionActivityTitle = document.querySelector('.intention-activity-title')


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

minutesInput.addEventListener('keydown', preventEInput);
secondsInput.addEventListener('keydown', preventEInput);


var category;

function hightlightButton(event) {
  if (event.target.classList.contains('study-button')) {
    event.target.classList.add('study-button-active');
    buttonImages[0].src = 'assets/study-active.svg';
  } else if (event.target.classList.contains('meditate-button')) {
    event.target.classList.add('meditate-button-active');
    buttonImages[1].src = 'assets/meditate-active.svg';
  } else if (event.target.classList.contains('exercise-button')) {
    event.target.classList.add('exercise-button-active');
    buttonImages[2].src = 'assets/exercise-active.svg';
  }
  category = event.target.innerText;
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
  console.log(formFilled);
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
}

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function changeText(element, newText) {
  element.innerText = `${newText}`;
}

function setTimer() {
  timerCountdown.innerText = `${minutesInput.value}:${secondsInput.value}`
}

function changeStartButtonStyle(intentionCategory) {
  intentionCategory = intentionCategory.toLowerCase();
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
