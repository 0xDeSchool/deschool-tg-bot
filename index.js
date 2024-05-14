import 'dotenv/config'
import express from "express";
import { handler } from './controller/index.js'
const PORT = 4040;
const app = express();

app.use(express.json());

app.post("*", async (req, res) => {
  console.log(req.body);
  res.send(handler(req, "POST"));
});

app.get("*", async (req, res) => {
  res.send(handler(req, "GET"));
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
