import { ADDED_LAYER, UPDATE_LAYER, JAY, SHAPE } from "../config";

const layerSizes = (state = {}, message) => {
  const { type, layer } = message;

  if (type === ADDED_LAYER) {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      name = "Untitled",
      person = JAY,
      active = false,
      layerType = SHAPE,
      placeholder = false
    } = message;

    return {
      ...state,
      [layer]: {
        x,
        y,
        width,
        height,
        name,
        person,
        placeholder,
        active,
        type: layerType
      }
    };
  }

  if (type === UPDATE_LAYER) {
    const {
      name = state[layer].name,
      person = state[layer].person,
      active = state[layer].active,
      placeholder = state[layer].placeholder
    } = message;

    return {
      ...state,
      [layer]: {
        ...state[layer],
        name,
        person,
        active,
        placeholder
      }
    };
  }

  return state;
};

export { layerSizes };
