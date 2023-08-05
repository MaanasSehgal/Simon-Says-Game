// Initialize game variables
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;

// DOM elements
let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

// Event listener to start the game on spacebar press
document.addEventListener("keydown", function (event) {
  if (!started) {
    if (event.key === " ") {
      console.log("game is started");
      started = true;
      levelUp();
    } else {
      alert("Press spacebar to start the game");
    }
  }
});

// Event listener for button click
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Flash effect for game buttons
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

// Flash effect for user-selected buttons
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

// Level up and generate new sequence
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameSeq.push(randomColor);
  console.log(gameSeq);
  gameFlash(randomBtn);
}

// Check user's button press and sequence
function btnPress() {
  let btn = this;
  userFlash(btn);

  function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
      if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 600);
      }
    } else {
      highScore = checkHighScore(level);
      h2.innerHTML = `Game Over! Your score was <b>${level}</b><br><b>High Score: ${highScore}</b><br>Press space to restart`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "pink";
      }, 150);
      reset();
    }
  }

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Check and update high score
function checkHighScore(score) {
  if (score > highScore) {
    highScore = score;
  }
  return highScore;
}

// Reset game state
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
