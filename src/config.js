import { isDevEnvironment } from "./utilities";

export const URLPREFIX = isDevEnvironment()
  ? process.env.REACT_APP_URLPREFIX
  : "https://trailmaps.site";
