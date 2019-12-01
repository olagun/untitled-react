import { RESIZE } from "../config";

const artboard = (state = null, { type, artboardSize = null }) => {
  if (type === RESIZE) return artboardSize || state;
  return state;
};

export { artboard };
