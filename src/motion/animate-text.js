import { store } from '../store';
import { drawShape } from './draw-shape';
import { SQUARE, TEXT, UPDATE_LAYER, ADDED_LAYER } from '../config';
import { selectTool } from './select-tool';

// strat, write dummy text side effect, measure, create actual, then do
async function animateText({ cursorControl, layerControl, layerTransition, layerSymbol, layerRefs, person }) {
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
    layerTransition,
    shape: SQUARE,
    x: x - 16,
    y: y - 6,
    width: width + 32,
    height: height + 10
  });

  // Move cursor back into position to write text.
  await cursorControl.start({ x, y: y - 32 });

  // console.log(layer);
  // console.log(layer.children[0].children);
  // console.log(layer.children[1]);
  // console.log('------------------------');

  let cursor = 0;
  const spans = layer.children[0].children;
  // for (const span of spans) {
  //   span.style.opacity = 0;
  // }
  const length = spans.length;

  layer.style.opacity = 1;
  layer.children[1].style.opacity = 1;

  const parent = layer.parentNode;
  const cursorEl = parent.querySelector('#cursor');

  cursorEl.style.position = 'fixed';
  cursorEl.style.width = '4px';

  const { height: cursorHeight } = spans[0].getBoundingClientRect();
  cursorEl.style.height = `${cursorHeight}px`;
  cursorEl.style.backgroundColor = person.color;
  cursorEl.style.borderRadius = '10px';
  cursorEl.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.33)';
  cursorEl.style.top = `${y}px`;
  cursorEl.style.left = `${x}px`;

  await new Promise(resolve => {
    // const duration = (slowdown = false) =>
    //   slowdown ? 500 : length > 30 ? 20 : 80;

    // const duration = (slowdown = false) => (slowdown ? 120 : length > 20 ? (length > 100 ? 10 : 20) : 60);
    const duration = previousDuration => (previousDuration < 20 ? previousDuration : previousDuration - 1);

    let text = '';
    let previousDuration = 80;

    // UNTITLED and —untitled
    if (layer.children[0].children.length < 10) {
      previousDuration = 130;
    } else if (layer.children[0].children.length < 40) {
      previousDuration = 140;
    } else if (layer.children[0].children.length > 100) {
      previousDuration = 20;
    }
  
    function type() {
      if (cursor < layer.children[0].children.length) {
        text += layer.children[0].children[cursor].innerHTML;
        const { top, right } = layer.children[0].children[cursor].getBoundingClientRect();

        // layer.children[cursor].style.opacity = 1;
        // console.log('TYPE FUNCTION CALLEDx', text, layer.children[1]);
        // layer.children[1].innerHTML = 'type function called';
        layer.children[1].innerHTML = text;
        cursorEl.style.top = `${top}px`;
        cursorEl.style.left = `${right}px`;

        store.dispatch({
          type: UPDATE_LAYER,
          layer: layerSymbol,
          name: text
        });

        cursorControl.start({
          x: right,
          y: top - 32,
          transition: {
            type: 'tween',
            duration: 0.15
          }
        });

        previousDuration = duration(previousDuration);

        setTimeout(type, previousDuration + 20);
        // if (
        //   layer.children[0].children[cursor].innerHTML == ',' ||
        //   layer.children[0].children[cursor].innerHTML == '.'
        // ) {
        //   setTimeout(type, previousDuration + 20);
        // } else {
        //   setTimeout(type, previousDuration);
        // }
      } else {
        resolve();
      }

      cursor++;
    }

    setTimeout(type, Math.floor(previousDuration));
  });

  layerControl.set({
    stroke: 'rgba(0, 0, 0, 0)'
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
