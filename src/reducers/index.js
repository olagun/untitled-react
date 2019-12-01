import { combineReducers } from "redux";
import { tools } from "./tools";
import { artboard } from "./artboard";
import { step } from "./step";
import { history } from "./history";
import { layers } from "./layers";

const rootReducer = combineReducers({
  layers,
  tools,
  artboard,
  step,
  history
});

export default rootReducer;
