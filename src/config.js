import { isDevEnvironment, isProdEnvironment } from "./utilities";

const environment = () => {
  if (isDevEnvironment()) {
    return process.env.REACT_APP_URLPREFIX;
  }
  if (isProdEnvironment()) {
    // being intercepted anyway
    return "";
  }
  return "http://localhost:8000";
};

export const URLPREFIX = environment();
