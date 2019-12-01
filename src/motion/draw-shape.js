import { store } from "../store";
import { CIRCLE, SQUARE } from "../config";

async function drawShape({
  cursorControl,
  layerControl,
  shape,
  x,
  y,
  width,
  height,
  addBounds = false,
  placeholder = false
}) {
  const { artboard: artboardBounds } = store.getState();

  const offset = addBounds ? artboardBounds : { x: 0, y: 0 };

  // move cursor in place
  await cursorControl.start({
    x: offset.x + x,
    y: offset.y + y
  });

  if (shape == CIRCLE) {
    // move shape in place
    layerControl.set({
      rx: 0,
      ry: 0,
      cx: offset.x + x,
      cy: offset.y + y
    });

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    await Promise.all([
      cursorControl.start({
        x: offset.x + width + x,
        y: offset.y + height + y
      }),
      layerControl.start({
        rx: halfWidth,
        ry: halfHeight,
        cx: offset.x + x + halfWidth,
        cy: offset.y + y + halfHeight
      })
    ]);
  } else if (shape === SQUARE) {
    layerControl.set({ x: offset.x + x, y: offset.y + y });

    await Promise.all([
      layerControl.start({ width, height }),
      cursorControl.start({
        x: offset.x + x + width,
        y: offset.y + y + height
      })
    ]);
  }
}

export { drawShape };
