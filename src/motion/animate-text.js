import { store } from "../store";
import { drawShape } from "./draw-shape";
import { SQUARE } from "../config";
import eases from "eases/circ-in";

// strat, write dummy text side effect, measure, create actual, then do
async function animateText({
  cursorControl,
  layerControl,
  layerSymbol,
  layerRefs
}) {
  // measure text
  const layer = layerRefs[layerSymbol];
  const { x, y, width, height } = layer.getBoundingClientRect();

  await drawShape({
    cursorControl,
    layerControl,
    shape: SQUARE,
    x,
    y,
    width,
    height
  });

  // move back into position to write text
  await cursorControl.start({ x, y });

  let cursor = 0;
  const spans = layer.children;
  for (const span of spans) {
    span.style.opacity = 0;
  }

  layer.style.opacity = 1;

  return new Promise(resolve => {
    let typingSpeed = 70;
    // factor speed

    function duration(speed, dist, slowdown = false, disp = 20) {
      // radius increases closer to completion exponentionally

      const avgWord = 10;
      const value = disp * Math.sin(0.1 * dist) + speed;
      const perWordValue = value * avgWord;

      return slowdown ? 500 : (60 / perWordValue) * 1000;
    }

    function type() {
      if (cursor < layer.children.length) {
        const { top, right } = layer.children[cursor].getBoundingClientRect();

        layer.children[cursor].style.opacity = 1;
        cursorControl.start({ x: right, y: top - 32 });

        if (
          layer.children[cursor].innerHTML == "," ||
          layer.children[cursor].innerHTML == "."
        )
          setTimeout(type, duration(typingSpeed, cursor, true));
        else setTimeout(type, duration(typingSpeed, cursor));
      } else {
        resolve();
      }

      cursor++;
    }

    setTimeout(type, duration(typingSpeed, cursor));
  });
}

export { animateText };
