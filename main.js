import { setupDino, updateDino, getDinoRect, setDinoLose } from "./dino.js";
import { setupGround, updateGround } from "./ground.js";
import { setupCactus, updateCactus, getCactusRect } from "./catctus.js";
const WIDTH = 100;
const HEIGHT = 30;

var lastime;
var delta;
var dinoRect;
var score;

const world = document.querySelector(".world");
const scoreElement = document.querySelector(".score");
const heading = document.querySelector(".heading");

function startGame() {
  score = 0;
  heading.classList.add("hide");
  setupGround();
  setupDino();
  setupCactus();
  window.requestAnimationFrame(update);
}

setWindowRatio();
window.addEventListener("resize", setWindowRatio);
document.addEventListener("keydown", startGame, { once: true });

function update(time) {
  if (lastime == null) {
    lastime = time;
    window.requestAnimationFrame(update);
    return;
  }
  delta = time - lastime;

  updateGround(delta);
  updateDino(delta);
  updateCactus(delta);
  checkGameOver();
  updateScore(delta);
  if (checkGameOver()) {
    return handleLose();
  }
  lastime = time;
  window.requestAnimationFrame(update);
}

function setWindowRatio() {
  let widnowRatio;
  if (window.innerWidth / window.innerHeight < WIDTH / HEIGHT) {
    widnowRatio = window.innerWidth / WIDTH;
  } else {
    widnowRatio = window.innerHeight / HEIGHT;
  }
  world.style.width = `${widnowRatio * WIDTH}px`;
  world.style.height = `${widnowRatio * HEIGHT}px`;
}

function checkGameOver() {
  dinoRect = getDinoRect();
  return getCactusRect().some((rect) => {
    return isCollison(rect, dinoRect);
  });
}

function isCollison(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function handleLose() {
  setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", startGame, { once: true });
    heading.classList.remove("hide");
  }),
    100;
}

function updateScore(delta) {
  score += delta * 0.001;
  scoreElement.textContent = Math.floor(score);
}
