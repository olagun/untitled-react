import { RESIZE, ADVANCE_STEP } from "../config";

const step = (state = 0, { type }) => {
  if (type === ADVANCE_STEP) return state + 1;
  return state;
};

export { step };
