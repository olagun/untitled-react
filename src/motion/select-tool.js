import { TOOLS } from "../config";
import { store } from "../store";

async function selectTool({ cursorControl, tool, toolControls }) {
  const toolIndex = TOOLS.indexOf(tool);
  // const toolControl = toolControls[toolIndex];
  const { tools: toolWidths } = store.getState();
  const { x, y, width, height } = toolWidths[toolIndex];

  // move to the tool
  await cursorControl.start({
    x: x + width / 2,
    y: y + height / 2
  });

  cursorControl.start({
    borderRadius: "100px 6px 6px 100px"
  });
}

export { selectTool };
