import { isCIEnvironment, isDevEnvironment } from "./utilities";

const environment = () => {
  if (isDevEnvironment()) {
    return process.env.REACT_APP_URLPREFIX;
  }
  if (isCIEnvironment()) {
    // being intercepted anyway
    return "http://localhost:8000";
  }
  return "";
};

export const URLPREFIX = environment();
