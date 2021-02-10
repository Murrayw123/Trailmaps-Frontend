import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type Dispatch = ThunkDispatch<{}, {}, AnyAction>;
