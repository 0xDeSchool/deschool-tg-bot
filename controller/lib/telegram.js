import 'dotenv/config'
import { errorHandler } from './helper.js';
import { getAxiosInstance } from './axios.js';

const BOT_TOKEN = process.env.BOT_TOKEN;

const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const axiosInstance = getAxiosInstance(BASE_URL);

export const sendMessage = (chatId, messageText) => {
  return axiosInstance.get("sendMessage", { 
    chat_id: chatId,
    text: messageText,
   })
   .catch((ex) => {
    errorHandler(ex, "sendMessage", "axios")
   });
}


export const handleMessage = async (messageObj) => {
  const messageText = messageObj.text;

  if (!messageText) {
    errorHandler("No message text", "handleMessage");
    return ""
  }

  try {
    const chatId = messageObj.chat.id;
    if (messageText.charAt(0) === "/") {
      const command = messageText.substr(1)
      switch (command) {
        case "start":
          return sendMessage(chatId, "Hello! How can I help you?");
        default:
          return sendMessage(chatId, "Sorry, I don't understand your command.");
      }
    } else {
      return sendMessage(chatId, messageText);
    }
  } catch (error) {
    errorHandler(error, "handleMessage");
  }
}