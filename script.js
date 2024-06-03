// Sounds
let tapSound = new Audio("./sounds/tap.wav");
let cheersSound = new Audio("./sounds/cheers.mp3");
let loseSound = new Audio("./sounds/lose.wav");
let wrongSound = new Audio("./sounds/wrong.mp3");
let musicSound = new Audio("./sounds/music.mp3");
musicSound.volume = 0.5;
let muteAllSounds = false;
let muteSounds = [tapSound, cheersSound, loseSound, wrongSound, musicSound];

// Html cards Variables
const cards = document.querySelectorAll(".flip-box .inner-box");
const refreshBtn = document.querySelector(".refresh button");
const NumberOfFlips = document.querySelector(".number-of-flips-done");
let settingContainer = document.querySelector(".setting-container");
let messageBox = document.querySelector(".messages");
let timeLeft = document.querySelector(".time-left");
let muteInput = document.querySelector("#muteInput");

// Html Icons cards
// let settingIcon = document.querySelectorAll(`.three-dots .setting-icon`);
// let playIcon = document.querySelector(`.three-dots .play-icon`);
// let pauseIcon = document.querySelector(`.three-dots .pause-icon`);

// Important Variables used later
let TotalTimeForGame = 30;
let totalTimeLeft = TotalTimeForGame;
let Flips = 0;
NumberOfFlips.innerHTML = Flips;
let cardsFlipped = [];
let flipped_cards_Images = [];
let startTimerVar = false;
let start_timer;

function AllSounds(playOrPause) {
  muteSounds.forEach((sound) => {
    if (playOrPause === "play") {
      musicSound.play();
      muteAllSounds = false;
    } else {
      muteAllSounds = true;
      sound.pause();
    }
    sound.currentTime = 0;
  });
}

// function to flip all cards for first 1 second
function flipAllCards() {}

muteInput.addEventListener("change", function () {
  if (muteInput.checked) {
    muteAllSounds = true;
    AllSounds("pause");
  } else {
    muteAllSounds = false;
    AllSounds("play");
  }
});

// Starting Game when elment clicked
Array.from(cards).forEach((card) => {
  card.addEventListener("click", () => {
    // starting Game
    if (!startTimerVar) {
      startTimerVar = true;
      startTimer();
      messageBox.classList.add("go");

      if (!muteAllSounds) {
        musicSound.play();
      }
    }

    // Checking if card clicked is already flipped or not
    if (!card.classList.contains("flipped")) {
      // increasing Number of flips done by one each time the user clicks the card
      Flips++;
      NumberOfFlips.innerHTML = Flips;

      // adding class Flipped to put styling for flipped card
      card.classList.add("flipped");

      if (Array.from(cards).every((box) => box.classList.contains("flipped"))) {
        setTimeout(() => {
          messageBox.classList.remove("go");
          messageBox.innerHTML = "Champion: You Won The Game 🥇🏆😆";
        }, 200);

        if (!muteAllSounds) {
          cheersSound.currentTime = 0.5;
          cheersSound.volume = 0.3;
          cheersSound.play();
        }

        clearInterval(start_timer);
      }

      // pushing Flipped cards in Arrays
      cardsFlipped.push(card);
      flipped_cards_Images.push(card.lastElementChild.firstElementChild);

      // checking if Both cards flipped are same or not
      if (cardsFlipped.length == 2) {
        if (
          window
            .getComputedStyle(flipped_cards_Images[0])
            .getPropertyValue("background-image") ==
          window
            .getComputedStyle(flipped_cards_Images[1])
            .getPropertyValue("background-image")
        ) {
          cardsFlipped = [];
          flipped_cards_Images = [];
        } else {
          Array.from(cards).forEach((card) => {
            card.style.pointerEvents = "none";
          });

          cardsFlipped.forEach((deepcard) => {
            setTimeout(() => {
              if (!muteAllSounds) {
                wrongSound.currentTime = 0.2;
                wrongSound.volume = 0.3;
                wrongSound.play();
              }

              deepcard.classList.add("not-matching");
            }, 200);
            setTimeout(() => {
              deepcard.classList.remove("not-matching");
              deepcard.classList.remove("flipped");

              cardsFlipped = [];
              flipped_cards_Images = [];

              // console.log(cardsFlipped);
              Array.from(cards).forEach((card) => {
                card.style.pointerEvents = "auto";
              });
            }, 700);
          });
        }
      }
    }
  });
});

// Refreshing game when refresh btn is clicked
refreshBtn.addEventListener("click", refresh);

// Javascript for refresh function
function refresh() {
  setTimeout(() => {
    ShuffleClasses();
  }, 300);
  // Adding Auto to pointer events to all boxes
  Array.from(cards).forEach((card) => {
    card.style.pointerEvents = "auto";
  });
  messageBox.innerHTML = "Your Game Has Been Reseted 🔁";

  // Adding setTimeOut to make game smooth
  setTimeout(() => {
    messageBox.classList.add("go");
  }, 1000);
  setTimeout(() => {
    if (startTimerVar == false) {
      messageBox.classList.remove("go");
      messageBox.innerHTML = "Your Timer 🕐 will start when you start playing";
    }
  }, 1500);

  // removing all cards from flipped classes
  cardsFlipped = [];
  flipped_cards_Images = [];
  Array.from(cards).forEach((card) => {
    if (card.classList.contains("flipped")) {
      card.classList.remove("flipped");
    }
  });

  // Adding Variables suitable values
  Flips = 0;
  NumberOfFlips.innerHTML = 0;
  totalTimeLeft = TotalTimeForGame;
  timeLeft.innerHTML = totalTimeLeft;
  startTimerVar = false;
  clearInterval(start_timer);
  messageBox.classList.remove("go");

  // Array.from(settingIcon)[0].classList.add("game-not-started");
  // Array.from(settingIcon)[0].style.cursor = "pointer";

  AllSounds("pause");
  if (!muteAllSounds) {
    musicSound.play();
  }
}

// Javascript to shuffle array of numbers
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Shuffling classes of all boxes inside the game
function ShuffleClasses() {
  const randomNumbers = [];
  for (let i = 1; i <= 6; i++) {
    randomNumbers.push(i, i);
  }
  shuffleArray(randomNumbers);
  // console.log(randomNumbers);

  Array.from(cards).forEach((card) => {
    let cardImg = card.lastElementChild.firstElementChild;
    if (cardImg.classList.contains("img1")) {
      cardImg.classList.remove("img1");
    } else if (cardImg.classList.contains("img2")) {
      cardImg.classList.remove("img2");
    } else if (cardImg.classList.contains("img3")) {
      cardImg.classList.remove("img3");
    } else if (cardImg.classList.contains("img4")) {
      cardImg.classList.remove("img4");
    } else if (cardImg.classList.contains("img5")) {
      cardImg.classList.remove("img5");
    } else if (cardImg.classList.contains("img6")) {
      cardImg.classList.remove("img6");
    }
  });

  for (let i = 0; i < cards.length; i++) {
    cards[i].lastElementChild.firstElementChild.classList.add(
      "img" + randomNumbers[i]
    );
  }
}
ShuffleClasses();

timeLeft.innerHTML = totalTimeLeft;
// Starting timer function
function startTimer() {
  start_timer = setInterval(() => {
    totalTimeLeft--;
    timeLeft.innerHTML = totalTimeLeft;

    if (totalTimeLeft == 0) {
      if (!muteAllSounds) {
        loseSound.currentTime = 0.5;
        loseSound.volume = 0.3;
        loseSound.play();
      }

      clearInterval(start_timer);
      Array.from(cards).forEach((card) => {
        card.style.pointerEvents = "none";
      });
      setTimeout(() => {
        cards.forEach((card) => {
          card.style.pointerEvents = "none";
        });
      }, 200);
      if (!cards.every((box) => box.classList.contains("flipped"))) {
        setTimeout(() => {
          messageBox.classList.add("go");
        }, 200);
        setTimeout(() => {
          messageBox.classList.remove("go");
          messageBox.innerHTML =
            "Ohh No! You Lose The Game 😞. <a href='#' onclick='refresh()' class='reset-link' style='text-decoration: none;'>Click Here To Reset</a>";
        }, 700);
      }
    }
  }, 1000);
}

// Array.from(settingIcon).forEach((card) => {
//   card.addEventListener("click", function () {
//     if (Array.from(settingIcon)[0].classList.contains(`game-not-started`)) {
//       document.querySelector(".inner-container").classList.toggle("flipped");
//     } else {
//       messageBox.innerHTML = `You can't go to setting While Playing the game, Either Reset or Complete the game first`;
//       messageBox.classList.remove("go");
//     }

//     let settingInSettingContainer = settingContainer.querySelector(".setting");
//     let NothingInSettingContainer = settingContainer.querySelector(".nothing");
//     // if(settingInSettingContainer){
//     //   console.log("yes");

//     // }
//   });
// });

// Function to play game
// function playGame(){
//   if(settingIcon[0].classList.contains(".game-not-started")){
//     messageBox.classList.add("go");
//     // remove go class after 1second using set time setTimeOut
//     setTimeout(() => {
//       messageBox.classList.remove("go");
//     }, 1000);
//     // settingIcon.classList.remove("game-not-started");
//     // settingIcon.style.cursor = 'pointer';
//   }
// }

// let count = 1;
// playIcon.addEventListener("click", function (){
//   playGame();
//   if(!startTimerVar){
//     startTimer();
//     startTimerVar = true;
//     count = 0;
//   }else {
//     if(count == 0){
//       startTimer();
//     }
//   }

//   pauseIcon.classList.toggle("show");
//   playIcon.classList.toggle("show");
// })
// function pauseGame(){
//   clearInterval(start_timer);

//   Array.from(cards).forEach(card => {
//     card.style.pointer = "not-allowed";
//     card.style.pointerEvents = "none";
//   })

//   pauseIcon.classList.toggle("show");
//   playIcon.classList.toggle("show");
// }
// pauseIcon.addEventListener("click",pauseGame)
