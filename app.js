import 'dotenv/config'
import express from "express";
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { setupWebhook } from './useSetupWebhook'

const PORT = process.env.PORT || 4040;
const BOT_TOKEN = process.env.BOT_TOKEN;

const URI = `/webhook/${BOT_TOKEN}`

const bot = new Telegraf(BOT_TOKEN)
const app = express();

bot.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})

bot.on(message('text'), async (ctx) => {
  // Explicit usage
  await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using context shortcut
  await ctx.reply(`Hello ${ctx.state.role}`)
})


bot.launch()

app.use(express.json())
app.use(await bot.createWebhook({ domain: WEBHOOK_DOMAIN }));
app.get("/", (req, res) => {
  res.status(200).send('get ok');
})

// setup our webhook url route
app.post(URI, (req, res) => {
  console.log(req.body);
  
  /* 
    we need to respond back with 200 to let telegram know that we 
    have received the update. Failing to do so will result in telegram 
    not sending further updates after the first one.
  */
  res.status(200).send('ok');
})
app.listen(PORT, async () => {
  console.log("Listening on port", PORT)
  // setting up our webhook url on server spinup
  try {
    console.log(`Server is up and Running at PORT : ${PORT}`)
    await setupWebhook()
  } catch (error) {
      console.log(error.message)
  }
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))