export const errorHandler = (error, name, from) => {
  let loggerFunction = console.log;

  loggerFunction("----------START----------");
  loggerFunction(`Error: ${name}`);

  if (from === 'axios') {
    if (error.response) {
      loggerFunction("Error Response: ", error.response.data);
      loggerFunction("Error Status: ", error.response.status);
      loggerFunction("Error Headers: ", error.response.headers);
    } else if (error.request) {
      loggerFunction("Error Request: ", error.request);
    } else {
      loggerFunction("Error Message: ", error.message);
    }
  }
  loggerFunction("----------END----------");
}