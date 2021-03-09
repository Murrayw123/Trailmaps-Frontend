export const isDevEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

export const isCIEnvironment = () => {
  return process.env.CI === "true";
};
