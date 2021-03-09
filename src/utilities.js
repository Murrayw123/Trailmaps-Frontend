export const isDevEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

export const isTestEnvironment = () => {
  console.debug("TEST123", process.env.TEST);
  return process.env.TEST === "true";
};
