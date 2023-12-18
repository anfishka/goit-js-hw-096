import * as Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    const timeoutId = setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);

    const clear = () => clearTimeout(timeoutId);

  });
}

document.querySelector('.form').addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const delay = parseInt(formData.get('delay'));
      const step = parseInt(formData.get('step'));
      const amount = parseInt(formData.get('amount'));

   for (let i = 0; i < amount; i++) {
    try{
      const result = await createPromise(i + 1, delay + i * step);
      Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
     }
      }
    });
  
