import { CREATED_HISTORY_ITEM } from "../config";

const history = (state = [], { type, entry }) => {
  if (type === CREATED_HISTORY_ITEM) return [entry, ...state];
  return state;
};

export { history };
