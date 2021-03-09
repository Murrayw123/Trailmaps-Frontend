export const isDevEnvironment = () => {
  return process.env.NODE_ENV === "development";
};

export const isProdEnvironment = () => {
  return process.env.NODE_ENV === "production";
};
