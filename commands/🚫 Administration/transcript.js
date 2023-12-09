const fs = require('fs');
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  name: "transcript",
  category: "🔰 Info",
  aliases: ["chatlog", "savemessages"],
  usage: "transcript <number_of_messages>",
  description: "Saves a transcript of the specified number of messages as an HTML file in Discord's dark theme style.",
  type: "bot",

  run: async (client, message, args, cmduser, text, prefix) => {
    const es = client.settings.get(message.guild.id, "embed");
    const ls = client.settings.get(message.guild.id, "language");

    try {
      if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply("You need administrator permissions to use this command.");
      }

      const limit = parseInt(args[0]);
      if (!limit || isNaN(limit) || limit < 1 || limit > 100) {
        return message.reply("Please provide a valid number of messages to save (1-100).");
      }

      const messages = await message.channel.messages.fetch({ limit: limit + 1 });

      const filteredMessages = messages
        .filter(m => !m.author.bot)
        .map(m => {
          const timestamp = m.createdAt.toLocaleString('en-US', { timeZone: 'UTC' });
          return `<div class="message">
                    <span class="timestamp">${timestamp}</span>
                    <span class="author">${m.author.tag}</span>: <span class="message-content">${m.content}</span>
                  </div>`;
        })
        .reverse()
        .join("");

      const fileName = `transcript_${message.channel.id}_${Date.now()}.html`;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Discord Transcript</title>
            <style>
              body {
                background-color: #36393f;
                color: #dcddde;
                font-family: Arial, sans-serif;
                font-size: 14px;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
              }
              .message {
                margin-bottom: 10px;
              }
              .timestamp {
                color: #72767d;
                font-size: 12px;
                margin-right: 5px;
              }
              .author {
                color: #7289da;
                font-weight: bold;
                margin-right: 5px;
              }
              .message-content {
                color: #dcddde;
              }
            </style>
          </head>
          <body>
            ${filteredMessages}
          </body>
        </html>
      `;

      fs.writeFileSync(fileName, htmlContent);

      const transcriptFile = new MessageAttachment(fileName, "transcript.html");
      await message.channel.send({ files: [transcriptFile] });

      fs.unlinkSync(fileName);

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
