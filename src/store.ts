import { applyMiddleware, createStore } from "redux";
import dataReducer from "./redux/reducers";
import thunk from "redux-thunk";

export const store = createStore(dataReducer, applyMiddleware(thunk));
