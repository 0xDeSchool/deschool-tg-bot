import axios from 'axios';
import 'dotenv/config'
const SERVER_URL = process.env.SERVER_URL;
const BOT_TOKEN = process.env.BOT_TOKEN;

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`
const URI = `/webhook/${BOT_TOKEN}`
const webhookURL = `${SERVER_URL}${URI}`

// configuring the bot via Telegram API to use our route below as webhook
const useSetupWebhook = async () => {
  try {
      const { data } = await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true`)
      console.log(data)
  } catch (error) {
      return error
  }
}

export default useSetupWebhook