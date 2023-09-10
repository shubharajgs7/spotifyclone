let songIndex = 0; // which song is playing
const prevSongIndex =0
let audioElement = new Audio("song/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let songInfoText = document.getElementById("songInfoText");

const songs = [
  {
    songName: "Hukum - Jailer",
    filePath: "song/0.mp3",
    coverPath: "covers/c0.jpg",
  },
  {
    songName: "Nammoru-Mysore Express",
    filePath: "song/1.mp3",
    coverPath: "covers/c1.jpg",
  },
  {
    songName: "AllOK GoodMorning",
    filePath: "song/2.mp3",
    coverPath: "covers/c2.jpg",
  },
  {
    songName: "Ugramm Veeram",
    filePath: "song/3.mp3",
    coverPath: "covers/c3.jpg",
  },
  {
    songName: "Belakina Kavithe",
    filePath: "song/4.mp3",
    coverPath: "covers/c4.jpg",
  },
  {
    songName: "Yaarivali Hudugi",
    filePath: "song/5.mp3",
    coverPath: "covers/c5.jpg",
  },
  {
    songName: "Chandulla Cheluvi",
    filePath: "song/6.mp3",
    coverPath: "covers/c6.jpg",
  },
  {
    songName: "Preethiya Parivala",
    filePath: "song/7.mp3",
    coverPath: "covers/c7.jpg",
  },
];

songItems.forEach((element, i) => {
  console.log(songs[i].filePath);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("SongName")[0].innerHTML = songs[i].songName;
});
//handle play and pause music
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
    songItemPlay.forEach(element => {
      if (parseInt(element.id) === songIndex) {
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
      }
    });
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
    gif.style.opacity = 0;
    songItemPlay.forEach(element => {
      if (parseInt(element.id) === songIndex) {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
      }
    });
  }
});

//
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
  songItemPlay.forEach(e => {
    e.classList.remove("fa-circle-pause");
    e.classList.add("fa-circle-play");
  });
};

songItemPlay.forEach(element => {
  element.addEventListener("click", e => {
    let prevIndex=songIndex
    makeAllPlay();
    
    console.log(prevIndex, parseInt(e.target.id))
    if (prevIndex !==parseInt(e.target.id)) {
      songIndex = parseInt(e.target.id);
      audioElement.src = `song/${songIndex}.mp3`;
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
      songInfoText.innerHTML = songs[`${songIndex}`].songName;
    } 
    else if(prevIndex === parseInt(e.target.id) && audioElement.paused){
      audioElement.play();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;
      songInfoText.innerHTML = songs[`${songIndex}`].songName;
    }
    else {
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-pause");
      e.target.classList.add("fa-circle-play");
      audioElement.src = `song/${songIndex}.mp3`;
      audioElement.pause();
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
    }

  });
});

document.getElementById("next").addEventListener("click", e => {
  if (songIndex > 6) {
    songIndex = 0;
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
  } else {
    songIndex += 1;
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
  }
  audioElement.src = `song/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});

document.getElementById("previous").addEventListener("click", e => {
  if (songIndex < 1) {
    songIndex = 7;
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
  } else {
    songIndex -= 1;
    songInfoText.innerHTML = songs[`${songIndex}`].songName;
  }
  audioElement.src = `song/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;
});

document.addEventListener("keydown", e => {
  if (e.keyCode === 32 && audioElement.paused) {
    audioElement.play();
  } else if (e.keyCode === 32 && audioElement.played) {
    audioElement.pause();
  }
});
