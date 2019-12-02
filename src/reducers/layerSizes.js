import { ADDED_LAYER } from "../config";

const layerSizes = (state = {}, { type, layer, x, y, width, height }) => {
  if (type === ADDED_LAYER)
    return {
      ...state,
      [layer]: {
        x,
        y,
        width,
        height
      }
    };

  return state;
};

export { layerSizes };
