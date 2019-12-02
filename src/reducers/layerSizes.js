import { ADDED_LAYER, UPDATE_LAYER, JAY, SHAPE, SQUARE } from "../config";

const layerSizes = (state = {}, message) => {
  const { type, layer  } = message;

  if (type === ADDED_LAYER) {
    const {
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      name = "Untitled",
      person = JAY,
      active = false,
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
        type: SHAPE
      }
    };
  }

  if (type === UPDATE_LAYER) {
    console.log(state, state[layer]);

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
