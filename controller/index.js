import { handleMessage } from './lib/telegram.js';
import { errorHandler } from './lib/helper.js';

export const handler = async (req, method) => {
  try {
    if (method === 'GET') {
      return "Hello get"
    }
    const { body } = req;
    if (body && body.message) {
      const messageObj = body.message;
      await handleMessage(messageObj);
      return "Success";
    }
    return "Unknown request"
  } catch (error) {
    errorHandler(error, "handler", method);
  }
}