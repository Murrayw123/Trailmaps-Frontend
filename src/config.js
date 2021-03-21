import { isDevEnvironment, isTestEnvironment } from "./utilities";

const environment = () => {
  if (isTestEnvironment()) {
    // being intercepted anyway
    return "http://localhost:8000";
  }
  if (isDevEnvironment()) {
    return process.env.REACT_APP_URLPREFIX;
  }
  return "";
};

export const URLPREFIX = environment();
