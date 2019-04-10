const functions = require("firebase-functions");
const Telegraf = require("telegraf");
const apixu = require("apixu");

let config = require("./env.json").service;

// config =
//   Object.keys(functions.config()).length === 0
//     ? process.env
//     : functions.config().service;

if (Object.keys(functions.config()).length) {
  config = functions.config().service;
}

const apixuClient = new apixu.Apixu({
  apikey: config.apixu_key
});

const bot = new Telegraf(config.telegram_key);
bot.start(ctx => ctx.reply("Welcome"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.on("text", ctx => {
  let query = ctx.update.message.text;

  apixuClient
    .current(query)
    .then(current => {
      return ctx.reply(
        `The current weather in ${query} is Celsius: ${current.current.temp_c}
            Farenheit: ${current.current.temp_f}`
      );
    })
    .catch(error => {
      return ctx.reply(`This city does not exist`, error);
    });
});
bot.launch();

exports.helloWorld = functions.https.onRequest((request, response) => {
  apixuClient
    .current("London")
    .then(current => {
      return response.send(current);
    })
    .catch(error => console.error("error", error));
});
