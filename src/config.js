import { isDevEnvironment, isTestEnvironment } from "./utilities";

const environment = () => {
  if (isDevEnvironment()) {
    return process.env.REACT_APP_URLPREFIX;
  }
  if (isTestEnvironment()) {
    // being intercepted anyway
    return "http://localhost:8000";
  }
  return ""
};

export const URLPREFIX = environment();
