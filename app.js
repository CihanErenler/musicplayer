const musicContainer = document.getElementById("music-container");
const music = document.getElementById("music");
const cover = document.getElementById("cover");
const title = document.querySelector(".title");
const songName = document.querySelector(".song-name");
const durationn = document.querySelector(".duration");
const progressContainer = document.getElementById("progress-container");
const progress = document.querySelector(".progress");
const currentTimee = document.querySelector(".current-time");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");

const songs = [
  {
    artist: "Cihan Erenler",
    src: "1.mp3",
    name: "I'm travelling",
    img: "1.png",
  },
  {
    artist: "Bald Jack",
    src: "2.mp3",
    name: "I don't know why I was born",
    img: "2.jpg",
  },
  { artist: "Emily", src: "3.mp3", name: "I am awesome", img: "3.jpg" },
];

let current = 0;

function setSong(x) {
  music.src = `music/${x.src}`;
  title.textContent = x.artist;
  songName.textContent = x.name;
  cover.src = `img/${x.img}`;
  musicContainer.style.background = `url("img/${x.img}") no-repeat center center/cover`;
}

function playSong() {
  musicContainer.classList.add("play");
  document.querySelector("#play i").classList.remove("fa-play");
  document.querySelector("#play i").classList.add("fa-pause");
  music.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  document.querySelector("#play i").classList.remove("fa-pause");
  document.querySelector("#play i").classList.add("fa-play");
  music.pause();
}

function nextSong() {
  current++;
  if (current > songs.length - 1) {
    current = 0;
    setSong(songs[current]);
    playSong();
  } else {
    setSong(songs[current]);
    playSong();
  }
}

function prevSong() {
  current--;
  if (current < 0) {
    current = songs.length - 1;
    setSong(songs[current]);
    playSong();
  } else {
    setSong(songs[current]);
    playSong();
  }
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const per = (currentTime / duration) * 100;
  progress.style.width = per + "%";

  let curmin = Math.floor(currentTime / 60);
  let cursec = Math.floor(currentTime - curmin * 60);
  let durmin = Math.floor(duration / 60);
  let dursec = Math.floor(duration - durmin * 60);
  currentTimee.textContent = check(curmin) + ":" + check(cursec);
  durationn.textContent = check(durmin) + ":" + check(dursec);

  if (durationn.textContent === "NaN:NaN") {
    durationn.textContent = "00:00";
  }
}

function check(x) {
  const b = parseInt(x);
  return b < 10 ? "0" + b : b;
}

function setProgress(e) {
  const width = this.clientWidth;
  const positionX = e.offsetX;
  const duration = music.duration;

  music.currentTime = (positionX / width) * duration;
}

// Event listeners
window.addEventListener("load", setSong(songs[current]));
play.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
music.addEventListener("timeupdate", updateProgress);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);
