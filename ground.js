import {
  setCustomProperty,
  getCustomProperty,
  incrementCustomProperty,
} from "./modifyCustomProperty.js";

const SPEED = 0.05;

const grounds = document.querySelectorAll(".ground");

export function setupGround() {
  setCustomProperty(grounds[0], "--left", 0);
  setCustomProperty(grounds[1], "--left", 300);
}

export function updateGround(delta) {
  grounds.forEach((element) => {
    incrementCustomProperty(element, "--left", delta * SPEED * -1);

    if (getCustomProperty(element, "--left") < -300) {
      setCustomProperty(element, "--left", 300);
    }
  });
}
