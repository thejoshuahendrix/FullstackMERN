const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const chalk = require("chalk");
const cors = require("cors")
const session = require('express-session');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors())

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(chalk.bgBlue.white.bold("[Mongo Connected]"));
  })
  .catch((err) => console.log(err));


app.use("/", require("./routes/users"));


// export async function discordFetchState(code: string): Promise<string> {

//   const bodyFormData = new FormData();
//   bodyFormData.append("code", code);
//   bodyFormData.append("redirect_uri", process.env.DISCORD_REDIRECT_URI);
//   bodyFormData.append("grant_type", "authorization_code");
//   bodyFormData.append("client_id", process.env.DISCORD_CLIENT_ID);
//   bodyFormData.append("client_secret", process.env.DISCORD_CLIENT_SECRET);
//   bodyFormData.append("scope", "identify email");

//   const response = await fetch("https://discord.com/api/oauth2/token", {
//       method: 'POST',
//       headers: bodyFormData.getHeaders(),
//       body: bodyFormData,
//       redirect: 'follow'
//   });

//   const responseJsonParsed = await response.json();

//   console.log(responseJsonParsed);

//   if (!responseJsonParsed?.access_token)
//       throw new Error('No access_token found');
//   const access_token = responseJsonParsed.access_token;

//   return access_token;
// }





app.listen(PORT, () => {
  console.log("Server running on port : " + PORT);
});
