import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./modifyCustomProperty.js";

const SPEED = 0.05;
const MINIMUM_INTERVAL = 700;
const MAXIMUM_INTERVAL = 2000;
var nextCactus;

export function setupCactus() {
  nextCactus = MINIMUM_INTERVAL;
  document.querySelectorAll(".cactus").forEach((element) => {
    element.remove();
  });
}

export function updateCactus(delta) {
  document.querySelectorAll(".cactus").forEach((element) => {
    incrementCustomProperty(element, "--left", delta * SPEED * -1);
    if (getCustomProperty(element, "--left") <= -100) {
      element.remove();
    }
  });
  if (nextCactus <= 0) {
    createCactus();
    nextCactus = randomNumberGenerator(MINIMUM_INTERVAL, MAXIMUM_INTERVAL);
  }
  nextCactus -= delta;
}

function createCactus() {
  const cactusElement = document.createElement("img");
  cactusElement.src = "images/cactus.png";
  cactusElement.className = "cactus";
  setCustomProperty(cactusElement, "--left", 100);
  document.querySelector(".world").appendChild(cactusElement);
}
function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCactusRect() {
  return [...document.querySelectorAll(".cactus")].map((element) => {
    return element.getBoundingClientRect();
  });
}
