import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { GameReducer } from "./Game/GameReducer";
import { userReducer } from "./user/UserReducer";
const rootReducer = combineReducers({
    game : GameReducer,
    user : userReducer
})

export const store = createStore(rootReducer);

// ,applyMiddleware(logger)