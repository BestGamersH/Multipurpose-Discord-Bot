
```const {
  MessageEmbed
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const {
  duration,
  nFormatter,
  handlemsg
} = require(`${process.cwd()}/handlers/functions`);
const moment = require("moment");
const fs = require('fs');

module.exports = {
  name: "newcommand", // Command name
  category: "🔰 Info", // Command category
  aliases: [], // Command aliases (if any)
  usage: "newcommand", // Command usage
  description: "Description of the new command", // Command description
  type: "bot", // Type of command (bot, music, fun, etc.)

  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language");

    try {
      // Your command logic here
      
    } catch (e) {
      console.log(String(e.stack).grey.bgRed);
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.getFooter(es))
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
        ]
      });
    }
  }
};
```