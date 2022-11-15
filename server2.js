const request = require("request");
const TelegramBot = require("node-telegram-bot-api");
const { func } = require("assert-plus");
const token = "5676336616:AAGy3kovJeWk9LAl7W8-IkyCvRbZZIey_24";
const bot = new TelegramBot(token, { polling: true });
bot.on("message", function (mg) {
  request(
    "https://www.omdbapi.com/?t=" + mg.text + "&apikey=afe5e2ec",
    function (error, response, body) {
      console.log(JSON.parse(body).Response);
      if (JSON.parse(body).Response == "True") {
        bot.sendMessage(mg.chat.id, "Title " + JSON.parse(body).Title);
        bot.sendMessage(mg.chat.id, "Actors " + JSON.parse(body).Actors);
        bot.sendMessage(
          mg.chat.id,
          "Release Date " + JSON.parse(body).Released
        );
        bot.sendMessage(
          mg.chat.id,
          "Rating " + JSON.parse(body).Ratings[0].Value
        );
      } else {
        bot.sendMessage(mg.chat.id, "Movie not found");
      }
    }
  );
});
