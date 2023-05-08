import { combineReducers } from "redux";

import shopReducer from "./prodReducer";
import basketReducer from "./basketReducer";

const rootReducer = combineReducers({
  shop: shopReducer,
  basket: basketReducer,
});

export default rootReducer;

export type RootReducerType = ReturnType<typeof rootReducer>;
