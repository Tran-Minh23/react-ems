import { combineReducers, createStore } from "redux";
import authReducer from "./reducers/auth";

const rootReducers = combineReducers({
    auth: authReducer
})

const store = createStore(rootReducers);

export default store;