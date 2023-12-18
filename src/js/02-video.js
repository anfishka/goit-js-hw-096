import Vimeo from "@vimeo/player"
import throttle from "lodash/throttle";

let iframe = document.getElementById('vimeo-player');
let player = new Vimeo(iframe);

let throttledUpdate = throttle((time) => {
    localStorage.setItem('videoplayer-current-time', time);
}, 1000);

player.on('timeupdate', (data) => {
    throttledUpdate(data.seconds);
});

let currentTime = localStorage.getItem('videoplayer-current-time');
if(currentTime)
{
    player.setCurrentTime(parseFloat(currentTime));
}