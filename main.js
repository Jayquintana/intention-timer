//global variables
var invalidKeys = ['-', '+', 'e'];
// querySelectors

//buttons
var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var buttonImages = document.querySelectorAll('.category-button-icons')
//inputs
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');

//function that adds class with new style

studyButton.addEventListener('click', function(event) {
  hightlightButton(event)
});

meditateButton.addEventListener('click', function(event) {
  hightlightButton(event)
});

exerciseButton.addEventListener('click', function(event) {
  hightlightButton(event)
});

minutesInput.addEventListener('keydown', preventEInput)
secondsInput.addEventListener('keydown', preventEInput);



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
}


function preventEInput(event) {
  if (invalidKeys.includes(event.key)) {
    event.preventDefault();
  }
}
