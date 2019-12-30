import { ARTBOARD_LAYER_REF } from "../config";

const layers = (state = {}, { type, layerSymbol, ref }) => {

  if (type === ARTBOARD_LAYER_REF)
    return {
      ...state,
      [layerSymbol]: ref
    };

  return state;
};

export { layers };
