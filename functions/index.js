const functions = require("firebase-functions");
const Telegraf = require("telegraf");
const apixu = require("apixu");
const apixuClient = new apixu.Apixu({
  apikey: process.env.APIXU_KEY
});

const bot = new Telegraf(process.env.TELEGRAM_BOT);
bot.start(ctx => ctx.reply("Welcome"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.launch();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  apixuClient
    .current("London")
    .then(current => {
      response.send(current);
    })
    .catch(error => console.error("error", error));
});
