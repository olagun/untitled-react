import { TOOLS } from "../config";
import { store } from "../store";

async function selectTool({ cursorControl, tool, toolControls }) {
  const toolIndex = TOOLS.indexOf(tool);
  const toolControl = toolControls[toolIndex];
  const { tool: toolWidths } = store.getState();
  const { x, y, width, height } = toolWidths[toolIndex];

  // move to the tool
  await cursorControl.start({
    x: x + width / 2,
    y: y + height / 2
  });
}

export { selectTool };
