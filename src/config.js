import { isDevEnvironment } from "./utilities";

export const mapStyles = [
  { key: "darkmatter", pretty: "Dark Matter - (dark theme)" },
  { key: "basic", pretty: "Basic" },
  { key: "positron", pretty: "Positron - (greyscale)" },
  { key: "topo", pretty: "Topographical" },
];

export const URLPREFIX = isDevEnvironment()
  ? process.env.REACT_APP_URLPREFIX
  : "";
