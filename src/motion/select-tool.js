import { TOOLS } from "../config";
import { store } from "../store";

async function selectTool({ cursorControl, tool }) {
  // Find viewport location of the selected tool in toolbar.
  const toolIndex = TOOLS.indexOf(tool);
  const { tools: toolWidths } = store.getState();
  const {
    x: toolX,
    y: toolY,
    width: toolWidth,
    height: toolHeight
  } = toolWidths[toolIndex];

  // Move the cursor to that location using
  // the cursor animation controller.
  await cursorControl.start({
    x: toolX + toolWidth / 2,
    y: toolY + toolHeight / 2
  });

  // Animate the cursor border radius to the
  // active state.
  cursorControl.set({
    borderRadius: "20px 8px 8px 20px"
  });
}

export { selectTool };
