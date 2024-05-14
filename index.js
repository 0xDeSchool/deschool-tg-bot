import 'dotenv/config'
import express from "express";
import { handler } from './controller/index.js'

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());

app.post("*", async (req, res) => {
  console.log('POST', req.body);
  res.send(handler(req, "POST"));
});

app.get("*", async (req, res) => {
  console.log('GET', req.body);
  res.send(handler(req, "GET"));
});

app.listen(PORT, async (err) => {
  console.log("Listening on port", PORT)
  // setting up our webhook url on server spinup
  try {
    console.log(`Server is up and Running at PORT : ${PORT}`)
  } catch (error) {
      console.log(error.message)
  }
});
