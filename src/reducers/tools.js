import { RESIZE } from "../config";

const tools = (state = [], { type, toolWidths = [] }) => {
  if (type === RESIZE) return toolWidths || state;
  return state;
};

export { tools };
