import { store } from "../store";
import { drawShape } from "./draw-shape";
import { SQUARE } from "../config";

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

  return new Promise(resolve => {
    setInterval(async () => {
      if (cursor <= layer.children.length) {
        const { right } = layer.children[cursor].getBoundingClientRect();
        await cursorControl.start({
          x: right,
          y: y - 32
        });
        layer.children[cursor].style.opacity = 1;
      } else {
        resolve();
      }
      cursor++;
    }, 100);
  });
}

export { animateText };
