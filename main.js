var studyButton = document.querySelector('.study-button');
var meditateButton = document.querySelector('.meditate-button');
var exerciseButton = document.querySelector('.exercise-button');
var buttonImages = document.querySelectorAll('.category-button-icons')

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
