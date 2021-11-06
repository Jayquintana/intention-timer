class Activity {
  constructor(category, description, minutes, seconds) {
    this.id = Date.now();
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
  }

    startTimer() {
      var startingMinutes = parseInt(this.minutes);
      var startingSeconds = parseInt(this.seconds);
      var time = (startingMinutes * 60) + startingSeconds;

      var intervalID = setInterval(makeTimer, 1000);

      function makeTimer() {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        timerCountdown.innerText = `${minutes}:${seconds}`;
        time--;
        if (!parseInt(minutes) && !parseInt(seconds)) {
          stopTimer(intervalID);
          displayCompleteMessage();
        }
      }

      function stopTimer(intervalID) {
        clearInterval(intervalID);
      }
    }

    markComplete() {
      this.completed = true;
    }

    saveToStorage() {

    }
}
