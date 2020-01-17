import { RESIZE } from "../config";

const artboard = (state = null, { type, artboardSize = null }) => {
	console.log('ARTBOARD', type, artboardSize, state);
  if (type === RESIZE) return artboardSize || state;
  return state;
};

export { artboard };
