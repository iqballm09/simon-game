let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomChosenColor;
let level = 0;

const startGame = () => {
  $("body").on("keypress", (e) => {
    if (e.which == 97 || e.which == 65) {
      nextSequence();
    }
  });
};

const restartGame = () => {
  $("body").on("keypress", (e) => {
    console.log(e.which, !!e.which);
    if (e.which) {
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      nextSequence();
    }
  });
};

const gameOver = () => {
  $("h1").html(`Game Over, Press Any Key to Restart`);
  playAudio("wrong");
  $("body").addClass("game-over");
  setInterval(() => {
    $("body").removeClass("game-over");
  }, 250);
};

const checkAnswer = (idx) => {
  console.log(userClickedPattern[idx], gamePattern[idx]);
  if (userClickedPattern[idx] != gamePattern[idx]) {
    return false;
  }
  return true;
};

const animatePress = (currentColor) => {
  playAudio(currentColor);
  $(`#${currentColor}`).addClass("pressed");
  setInterval(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 150);
};

const nextSequence = () => {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColours[randomNumber];
  animatePress(randomChosenColor);
  gamePattern.push(randomChosenColor);
  level++;
  $("h1").html(`Level ${level}`);
};

const playAudio = (color) => {
  if (!buttonColours.includes(color) && color != "wrong") {
    console.log(`Color ${color} is not exist!`);
  }
  audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

$(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

$(".btn").on("click", (e) => {
  let userChosenColor = e.target.id;
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  const answer = checkAnswer(userClickedPattern.length - 1);

  if (answer) {
    if (userClickedPattern.length == level) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    gameOver();
    restartGame();
  }
});

startGame();
