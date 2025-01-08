export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = 444;
  error.message = message;
  return error;
};
