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
const random = document.getElementById("random");
const loop = document.getElementById("loop");

const songs = [
  {
    artist: "Cartoon",
    src: "1.mp3",
    name: "Why We Lose (feat. Coleman Trapp) [NCS Release]",
    img: "1.jpg",
  },
  {
    artist: "Diamond Eyes",
    src: "2.mp3",
    name: "Gravity [NCS Release]",
    img: "2.jpg",
  },
  {
    artist: "Rival x Egzod",
    src: "3.mp3",
    name: "Live A Lie (ft. Andreas Stone) [NCS Release]",
    img: "3.jpg",
  },
  {
    artist: "Cream Blade",
    src: "4.mp3",
    name: "Heavenly (feat. Romi) [original mix]",
    img: "4.jpg",
  },
  {
    artist: "Ship Wrek & Zookeepers",
    src: "5.mp3",
    name: "Ark [NCS Release]",
    img: "5.jpg",
  },
  {
    artist: "Prismo - ",
    src: "6.mp3",
    name: "Stronger [NCS Release]",
    img: "6.jpg",
  },
];

let current = 0;
let RANDOM = false;

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
  setSong(songs[checkCurrent(++current)]);
  playSong();
}

function prevSong() {
  setSong(songs[checkCurrent(--current)]);
  playSong();
}

function checkCurrent(x) {
  if (x > songs.length - 1) {
    current = 0;
    return current;
  } else if (x < 0) {
    current = songs.length - 1;
    return current;
  }

  return x;
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
music.addEventListener("ended", () => {
  if (!RANDOM) {
    nextSong();
  } else {
    let random = parseInt(Math.floor(Math.random() * songs.length));
    setSong(
      songs[
        random === current ? checkCurrent((current += 2)) : (current = random)
      ]
    );
    playSong();
  }
});
progressContainer.addEventListener("click", setProgress);
loop.addEventListener("click", () => {
  loop.classList.toggle("selected");
  music.loop ? (music.loop = false) : (music.loop = true);
});

random.addEventListener("click", () => {
  random.classList.toggle("selected");
  RANDOM ? (RANDOM = false) : (RANDOM = true);
});
