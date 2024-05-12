import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./modifyCustomProperty.js";

const dinoElement = document.querySelector("[data-dinosor]");
const FRAME_COUNT = 100;
const DINO_FRAME_COUNT = 2;
const GRAVITY = 0.0015;
const JUMP_SPEED = 0.45;
var currentTime;
var dinoFrame;
var isJumping;
var yVel;

export function setupDino() {
  setCustomProperty(dinoElement, "--bottom", 0);
  currentTime = 0;
  dinoFrame = 0;
  isJumping = false;
  document.removeEventListener("keydown", Jump);
  document.addEventListener("keydown", Jump);
}

export function updateDino(delta) {
  handleRun(delta);
  handleJump(delta);
}

function handleRun(delta) {
  if (isJumping) {
    dinoElement.src = "images/dino-stationary.png";
  }

  if (currentTime >= FRAME_COUNT) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElement.src = `images/dino-run-${dinoFrame}.png`;
    currentTime -= FRAME_COUNT;
  }
  currentTime += delta;
}
function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(dinoElement, "--bottom", yVel * delta);

  if (getCustomProperty(dinoElement, "--bottom") <= 0) {
    setCustomProperty(dinoElement, "--bottom", 0);
    isJumping = false;
  }
  yVel -= GRAVITY * delta;
}

function Jump(e) {
  if (e.key != " " || isJumping) return;
  yVel = JUMP_SPEED;
  isJumping = true;
}

export function getDinoRect() {
  return dinoElement.getBoundingClientRect();
}

export function setDinoLose() {
  dinoElement.src = "images/dino-lose.png";
}
