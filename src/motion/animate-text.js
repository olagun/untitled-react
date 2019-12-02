import { store } from "../store";
import { drawShape } from "./draw-shape";
import { SQUARE, SHAPE, TEXT, UPDATE_LAYER, ADDED_LAYER } from "../config";
import eases from "eases/circ-in";
import { selectTool } from "./select-tool";

// strat, write dummy text side effect, measure, create actual, then do
async function animateText({
  cursorControl,
  layerControl,
  layerSymbol,
  layerRefs,
  person
}) {
  // measure text
  const layer = layerRefs[layerSymbol];
  const { x, y, width, height } = layer.getBoundingClientRect();

  // cursor ttype needs to chnage to text
  await selectTool({ cursorControl, tool: TEXT });

  store.dispatch({
    type: ADDED_LAYER,
    layer: layerSymbol,
    layerType: TEXT,
    person,
    active: true
  });

  store.dispatch({
    type: UPDATE_LAYER,
    layer: layerSymbol,
    person,
    active: true
  });

  await drawShape({
    cursorControl,
    layerControl,
    shape: SQUARE,
    x: x - 16,
    y: y - 4,
    width: width + 32,
    height: height + 8
  });

  // move back into position to write text
  await cursorControl.start({ x, y: y - 32 });

  let cursor = 0;
  const spans = layer.children;
  for (const span of spans) {
    span.style.opacity = 0;
  }

  layer.style.opacity = 1;

  // console.log(layer.dataset);
  await new Promise(resolve => {
    let typingSpeed = 70;
    // factor speed

    function duration(speed, dist, slowdown = false, disp = 20) {
      // radius increases closer to completion exponentionally

      // const avgWord = 10;
      // const value = disp * Math.sin(0.1 * dist) + speed;
      // const perWordValue = value * avgWord;

      const avgWord = 10;
      const perWordValue = 100 * avgWord;

      return slowdown ? 500 : (60 / perWordValue) * 1000;
    }

    let text = "";

    function type() {
      if (cursor < layer.children.length) {
        text += layer.children[cursor].innerHTML;
        const { top, right } = layer.children[cursor].getBoundingClientRect();

        layer.children[cursor].style.opacity = 1;

        store.dispatch({
          type: UPDATE_LAYER,
          layer: layerSymbol,
          name: text
        });

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

  layerControl.set({
    stroke: "rgba(0, 0, 0, 0)"
  });

  store.dispatch({
    type: UPDATE_LAYER,
    layer: layerSymbol,
    active: false
  });

  cursorControl.start({ x: -100, y: -100 });
}

export { animateText };
