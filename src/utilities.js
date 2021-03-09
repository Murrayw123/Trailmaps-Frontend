export const isDevEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

export const isTestEnvironment = () => {
  return process.env.REACT_APP_TEST === "true";
};
