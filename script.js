let scoreH2 = document.getElementById("score");
let timeLeftH2 = document.getElementById("timeLeft");
let startNewGameButton = document.getElementById("startNewGame");
let pauseGameButton = document.getElementById("pauseGame");
let themeToggleButton = document.getElementById("themeToggle");
let grid = document.getElementsByClassName("grid")[0];
let squares = document.querySelectorAll(".square");
let gameMusic = new Audio("gameMusic.mp3");
let hitMusic = new Audio("hitMusic.mp3");

let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// randomly place mole
function randomMole() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("mole");
  hitPosition = randomSquare.id;
}

function countDown() {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;
  } else {
    clearInterval(timerId);
    clearInterval(randomMoleId);
    grid.style.display = "none";
    gameMusic.pause(); // Stop the game music when time is up
  }
}


randomMole();

function startGame() {
  score = 0;
  timeLeft = 60;

  scoreH2.innerHTML = "Your Score: 0";
  timeLeft.innerHTML = "Time Left: 60";
  grid.style.display = "flex";
  pauseGameButton.style.display = "inline-block";
  pauseGameButton.innerHTML = "Pause";
  gameMusic.play();
  // callback function
  timerId = setInterval(randomMole, 1000);
  randomMoleId = setInterval(countDown, 1000);
}

function pauseResumeGame() {
  if (pauseGameButton.textContent === "Pause") {
    gameMusic.pause();
    clearInterval(timerId);
    clearInterval(randomMoleId);
    timerId = null;
    randomMoleId = null;
    pauseGameButton.textContent = "Resume";
  } else {
    gameMusic.play();
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
    pauseGameButton.textContent = "Pause";
  }
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (timerId !== null) {
      if (square.id === hitPosition) {
        hitMusic.play();
        setTimeout(() => {
          hitMusic.pause();
        }, 1000);
        score++;
        scoreH2.innerHTML = `Your Score: ${score}`;
        hitPosition = null;
      }
    }
  });
});

startNewGameButton.addEventListener("click", startGame);
pauseGameButton.addEventListener("click", pauseResumeGame);

// Theme toggle logic
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeToggleButton.innerText = "Switch to Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleButton.innerText = "Switch to Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

// Load theme from localStorage on page load
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggleButton.innerText = "Switch to Light Mode";
  }
};
