import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


document.addEventListener("DOMContentLoaded", function() {

const datePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
let countdownInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Report.failure(
        'Error',
        'Please choose a date in the future',
        'OK'
      );
      startButton.setAttribute("disabled", true);
    } else {
      startButton.removeAttribute("disabled");
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener("click", startCountdown);

function startCountdown() {
  const selectedDate = flatpickr.parseDate(datePicker.value);
  const currentDate = new Date().getTime();
  let difference = selectedDate - currentDate;

  if (difference <= 0) {
    clearInterval(countdownInterval);
    updateTimerUI(0, 0, 0, 0);
    Notiflix.Report.info('Countdown', 'The countdown has finished', 'OK');
    return;
  }

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(difference);

    updateTimerUI(days, hours, minutes, seconds);

    if (difference <= 1000) {
      clearInterval(countdownInterval);
      Notiflix.Report.info('Countdown', 'The countdown has finished', 'OK');
    }

    difference -= 1000;
  }, 1000);
}

function updateTimerUI(days, hours, minutes, seconds) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

});

