import { CREATED_HISTORY_ITEM, ADDED_LAYER, SAM, SHAPE, TEXT } from "../config";

const history = (state = [], message) => {
  const { type, entry } = message;

  switch (type) {
    case CREATED_HISTORY_ITEM:
      console.log('CREATED HISTORY ITEM', message);
      return [entry, ...state];

    case ADDED_LAYER:
      const { person = SAM, layerType = TEXT } = message;

      console.log('ADDED_LAYER', person);
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
