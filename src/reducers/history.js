import { CREATED_HISTORY_ITEM, ADDED_LAYER, JAY, SHAPE, TEXT } from "../config";

const history = (state = [], message) => {
  const { type, entry } = message;

  switch (type) {
    case CREATED_HISTORY_ITEM:
      return [entry, ...state];
    case ADDED_LAYER:
      const { person = JAY, layerType = TEXT } = message;
      return [
        {
          person,
          time: Date.now(),
          action: layerType
        },
        ...state
      ];

    default:
      return state;
  }
};

export { history };
