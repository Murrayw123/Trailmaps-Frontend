import {applyMiddleware, createStore} from "redux";
import dataReducer from "redux/reducers";
import thunk from "redux-thunk";
import {Services} from "helpers/ServiceInit";

export const dataStore = createStore(dataReducer as any, applyMiddleware(thunk));
export const services = new Services(dataStore);
