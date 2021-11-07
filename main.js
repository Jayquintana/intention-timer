//global variables
var category;
var invalidKeys = ['-', '+', 'e', 'E', '.'];
var activities = [];
// querySelectors

//images
var studyIcon = document.querySelectorAll('.study-button > img')
var meditateIcon = document.querySelectorAll('.meditate-button > img')
var exerciseIcon = document.querySelectorAll('.exercise-button > img')

//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var buttonImages = document.querySelectorAll('.category-button-icons');
var startActivityButton = document.querySelector('.start-activity-button');
var startTimerButton = document.querySelector('.start-timer-button');
var categoryButtons = document.querySelectorAll('.category-button-style');
var logActivityButton = document.querySelector('.log-activity-button');
var createNewActivityButton = document.querySelector('.create-new-activity-button');

//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var inputs = document.querySelectorAll('input');

// sections
var currentActivitySection = document.querySelector('.current-activity');
var newActivitySection = document.querySelector('.new-activity');
var pastActivitiesSection = document.querySelector('.past-activities');
var activityCardSection = document.querySelector('.activity-card-section');
var completedActivitySection = document.querySelector('.completed-activity-section');

//titles
var timerCountdown = document.querySelector('.timer-countdown');
var errorMessages = document.querySelectorAll('.error-message');
var newActivityTitle = document.querySelector('.new-activity-title');
var intentionActivityTitle = document.querySelector('.intention-activity-title');
var activityCompletedTitle = document.querySelector('.activity-complete-title');
var completionMessage = document.querySelector('.completion-message');



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
logActivityButton.addEventListener('click', displayCompletedActivitySection);
createNewActivityButton.addEventListener('click', displayNewActivitySection);

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
function categoryButtonReset(event) {
  studyButton.classList.remove('study-button-active')
  exerciseButton.classList.remove('exercise-button-active')
  meditateButton.classList.remove('meditate-button-active')
  studyIcon[0].attributes[1].nodeValue = 'assets/study.svg'
  meditateIcon[0].attributes[1].nodeValue = 'assets/meditate.svg'
  exerciseIcon[0].attributes[1].nodeValue = 'assets/exercise.svg'
}

function hightlightButton(event) {
  categoryButtonReset()
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
  hideElement(intentionActivityTitle);
  showElement(completionMessage);
}

function createActivityLogs() {
  activities[activities.length - 1].markComplete();
  activityCardSection.innerHTML = '';
  for (var i = 0; i < activities.length; i++)  {
    if (activities[i].completed) {
    activityCardSection.innerHTML += `
    <article class="past-activity-card">
      <div class="card-title-box">
        <h5 class="card-category-title">${activities[i].category}</h5>
        <p class="card-duration-title">${activities[i].minutes} MIN ${activities[i].seconds} SECONDS</p>
        <p class="card-accomplish-title">${activities[i].description}</p>
      </div>
      <span class="card-color-indicator ${activities[i].category}-color-indicator">
      </span>
    </article>`
    }
  }
}

function displayCompletedActivitySection() {
  hideElement(currentActivitySection);
  showElement(completedActivitySection);
  changeText(newActivityTitle, 'Completed Activity');
  createActivityLogs();
}

function setTimer() {
  timerCountdown.innerText = `${minutesInput.value}:${secondsInput.value}`;
}

function changeStartButtonStyle(intentionCategory) {
  startTimerButton.classList.add(`start-${intentionCategory}-timer`);
}

function displayCurrentActivity() {
  hideElement(completionMessage);
  hideElement(newActivitySection);
  showElement(currentActivitySection);
  showElement(startTimerButton);
  showElement(timerCountdown);
  showElement(intentionActivityTitle);
  changeText(newActivityTitle, 'Current Activity');
  setTimer();
  changeStartButtonStyle(category);
  changeText(intentionActivityTitle, accomplishInput.value);
}

function displayNewActivitySection() {
  hideElement(completedActivitySection);
  hideElement(currentActivitySection);
  showElement(newActivitySection);
  changeText(newActivityTitle, 'New Activity');
}
