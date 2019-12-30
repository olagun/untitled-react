import { store } from "../store";
import { ADVANCE_STEP } from "../config";

export const advanceStep = () => {
  store.dispatch({ type: ADVANCE_STEP });
};
