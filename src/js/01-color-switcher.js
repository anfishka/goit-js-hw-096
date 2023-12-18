function getRandomHexColor()
{   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`};

let startBtn = document.querySelector('[data-start]');
let stopBtn = document.querySelector('[data-stop]');
let body = document.body;
let intervalId = null;

stopBtn.disabled = true;

function startColorChange(){
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        stopBtn.disabled = false;
    }, 1000);
    startBtn.disabled = true;
}

function stopColorChange(){
    clearInterval(intervalId);
    body.style.backgroundColor = '';
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

let btnContainer = document.querySelector(".btn-container");
let btns = document.querySelectorAll("button");

btnContainer.style.display = "flex";
btnContainer.style.justifyContent = "center";
btnContainer.style.paddingTop = "40%";

btns.forEach(btn => {
    btn.style.padding = "10px";
    btn.style.width = "100px";
    btn.style.marginLeft = "10px";
}) 
