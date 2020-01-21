import { store } from '../store';
import { CIRCLE, SQUARE, SHAPE, CREATED_HISTORY_ITEM } from '../config';

async function drawShape({
  cursorControl,
  layerControl,
  layerTransition,
  shape,
  x,
  y,
  width,
  height,
  addBounds = false,
  placeholder = false,
  finish = false,
  person,
  history = true
}) {
  const { artboard: artboardBounds } = store.getState();
  const offset = addBounds ? artboardBounds : { x: 0, y: 0 };
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  // Move cursor into its inital position
  await cursorControl.start({
    x: offset.x + x,
    y: offset.y + y
  });

  switch (shape) {
    case CIRCLE:
      // move shape in place
      layerControl.set({
        rx: 0,
        ry: 0,
        cx: offset.x + x,
        cy: offset.y + y
      });

      await Promise.all([
        cursorControl.start({
          x: offset.x + width + x,
          y: offset.y + height + y
        }),
        layerControl.start({
          rx: halfWidth,
          ry: halfHeight,
          cx: offset.x + x + halfWidth,
          cy: offset.y + y + halfHeight,
          transition: layerTransition
        })
      ]);
      break;
    case SQUARE:
      // layerControl.set({ x: 0, y: 0, width: 0, height: 0 });
      // layerControl.set({ x: offset.x + x, y: offset.y + y, rx: width * 0.006756756757 });
      layerControl.set({ x: offset.x + x, y: offset.y + y, width: 0, height: 0, rx: width * 0.006756756757 });

      await Promise.all([
        layerControl.start({ width, height, transition: layerTransition }),
        cursorControl.start({
          x: offset.x + x + width,
          y: offset.y + y + height
        })
      ]);
      break;
  }

  if (history && false) {
    // console.log('History yes, dispatched', person);
    store.dispatch({
      type: CREATED_HISTORY_ITEM,
      entry: {
        person: person,
        action: SHAPE,
        time: Date.now()
      }
    });
  }

  if (finish) {
    layerControl.set({ strokeDasharray: '0 0' });
  }

  if (placeholder) {
    layerControl.start({
      fill: 'rgba(0, 0, 0, 0.05)'
    });
  }
}

export { drawShape };
