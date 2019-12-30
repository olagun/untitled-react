import { store } from "../store";
import { drawShape } from "./draw-shape";
import { SQUARE, TEXT, UPDATE_LAYER, ADDED_LAYER } from "../config";
import { selectTool } from "./select-tool";

// strat, write dummy text side effect, measure, create actual, then do
async function animateText({
  cursorControl,
  layerControl,
  layerSymbol,
  layerRefs,
  person
}) {
  // Get real text position.
  const layer = layerRefs[layerSymbol].current;
  const { x, y, width, height } = layer.getBoundingClientRect();

  // Change cursor type to "text".
  await selectTool({ cursorControl, tool: TEXT });

  // Add layer to history and layers panel.
  store.dispatch({
    type: ADDED_LAYER,
    layer: layerSymbol,
    layerType: TEXT,
    active: true,
    person
  });

  store.dispatch({
    type: UPDATE_LAYER,
    layer: layerSymbol,
    person,
    active: true
  });

  // Draw text box shape for text.
  await drawShape({
    person,
    history: false,
    cursorControl,
    layerSymbol,
    layerControl,
    shape: SQUARE,
    x: x - 16,
    y: y - 4,
    width: width + 32,
    height: height + 8
  });

  // Move cursor back into position to write text.
  await cursorControl.start({ x, y: y - 32 });

  let cursor = 0;
  const spans = layer.children;
  for (const span of spans) {
    span.style.opacity = 0;
  }
  const length = spans.length;

  layer.style.opacity = 1;

  const parent = layer.parentNode;
  const cursorEl = parent.querySelector("#cursor");

  cursorEl.style.position = "fixed";
  cursorEl.style.width = "4px";

  const { height: cursorHeight } = spans[0].getBoundingClientRect();
  cursorEl.style.height = `${cursorHeight}px`;
  cursorEl.style.backgroundColor = person.color;
  cursorEl.style.borderRadius = "10px";
  cursorEl.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.33)";
  cursorEl.style.top = `${y}px`;
  cursorEl.style.left = `${x}px`;

  await new Promise(resolve => {
    const duration = (slowdown = false) =>
      slowdown ? 500 : length > 30 ? 20 : 80;

    let text = "";
    function type() {
      if (cursor < layer.children.length) {
        text += layer.children[cursor].innerHTML;
        const { top, right } = layer.children[cursor].getBoundingClientRect();

        layer.children[cursor].style.opacity = 1;
        cursorEl.style.top = `${top}px`;
        cursorEl.style.left = `${right}px`;

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
          setTimeout(type, duration(true));
        else setTimeout(type, duration());
      } else {
        resolve();
      }

      cursor++;
    }

    setTimeout(type, duration());
  });

  layerControl.set({
    stroke: "rgba(0, 0, 0, 0)"
  });

  store.dispatch({
    type: UPDATE_LAYER,
    layer: layerSymbol,
    active: false
  });

  cursorEl.style.opacity = 0;

  cursorControl.start({
    x: window.innerWidth / 2,
    y: window.innerHeight + 100
  });
}

export { animateText };
