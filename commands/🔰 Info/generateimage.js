const Discord = require('discord.js');
const Canvas = require('discord-canvas');

module.exports = {
  name: 'generateimage',
  category: '🎨 Image',
  aliases: ['createimage'],
  usage: 'generateimage <text>',
  description: 'Generates an image with custom text and the user\'s avatar.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const textInput = args.join(' ');

      if (!textInput) {
        return message.reply('Please provide text for the image.');
      }

      const canvas = new Canvas.Image();

      const canvasImage = new Canvas.Canvas(400, 200);
      const ctx = canvasImage.getContext('2d');

      const background = await Canvas.loadImage('/home/vboxuser/Multipurpose-Discord-Bot-1/assets/bot.png'); // Replace with your image path

      ctx.drawImage(background, 0, 0, canvasImage.width, canvasImage.height);

      ctx.font = '30px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(textInput, 50, 100);

      const userAvatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
      ctx.drawImage(userAvatar, 300, 50, 50, 50);

      const attachment = new Discord.MessageAttachment(canvasImage.toBuffer(), 'generated_image.png');
      message.channel.send({ files: [attachment] });
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while generating the image.');
    }
  },
};
