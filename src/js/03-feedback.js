import throttle from "lodash/throttle";

let updateLocalStorage = throttle(() => {
    let email = document.querySelector('input[name="email"]').value;
    let message = document.querySelector('textarea[name="message"]').value;
  
    let feedbackState = { email, message };
    localStorage.setItem('feedback-form-state', JSON.stringify(feedbackState));
  }, 500);
  
  window.addEventListener('DOMContentLoaded', () => {
    let savedState = localStorage.getItem('feedback-form-state');
    if (savedState) {
      let { email, message } = JSON.parse(savedState);
      document.querySelector('input[name="email"]').value = email;
      document.querySelector('textarea[name="message"]').value = message;
    }
  });
  
  document.querySelectorAll('.feedback-form input, .feedback-form textarea').forEach((input) => {
    input.addEventListener('input', () => {
      updateLocalStorage();
    });
  });
  
  document.querySelector('.feedback-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    let email = document.querySelector('input[name="email"]').value;
    let message = document.querySelector('textarea[name="message"]').value;
  
    let feedbackData = { email, message };
    console.log(feedbackData);
  
    document.querySelector('.feedback-form').reset();
    localStorage.removeItem('feedback-form-state');
  });