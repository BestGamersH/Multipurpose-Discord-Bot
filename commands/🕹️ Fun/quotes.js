const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs').promises;

const quotesPath = '/home/vboxuser/Multipurpose-Discord-Bot-1/data/quotes.json';
let quotes = {};

module.exports = {
  name: 'quote',
  category: 'Quotes',
  aliases: ["cq",],
  usage: 'quote [member]',
  description: 'Retrieves a specific quote by the member who sent it.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const targetMember = message.mentions.members.first() || message.member;
      quotes = require(quotesPath);
      const quote = quotes[targetMember.id];

      if (!quote)
        return message.reply('No quote found for this member.');

      const canvas = createCanvas(600, 400);
      const ctx = canvas.getContext('2d');
      
      // Load user avatar
      const avatar = await loadImage(targetMember.user.displayAvatarURL({ format: 'png' }));
      ctx.drawImage(avatar, 10, 10, 80, 80);

      // Set username
      ctx.fillStyle = '#ffffff';
      ctx.font = '18px Arial';
      ctx.fillText(targetMember.user.username, 100, 40);

      // Format the quote text with alternating colors
      let x = 10;
      let y = 120;
      let color = '#ffffff';
      ctx.fillStyle = color;

      for (let i = 0; i < quote.length; i++) {
        const char = quote.charAt(i);
        ctx.fillStyle = color;
        ctx.fillText(char, x, y);
        x += ctx.measureText(char).width;

        // Alternate colors for each character
        color = color === '#ffffff' ? '#000000' : '#ffffff';
      }

      const attachment = new MessageAttachment(canvas.toBuffer(), 'quote.png');

      // Create a button for paging
      const buttonRow = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Next Quote')
            .setCustomId('next_quote')
            .setStyle('PRIMARY'),
        );

      return message.channel.send({ files: [attachment], components: [buttonRow] });
    } catch (error) {
      console.error('Error fetching quote:', error.message);
      return message.reply('An error occurred while fetching the quote.');
    }
  },
};
