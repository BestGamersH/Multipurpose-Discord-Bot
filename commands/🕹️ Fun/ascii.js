const figlet = require('figlet');

module.exports = {
  name: 'ascii',
  category: '🖼️ Image',
  aliases: [],
  usage: 'ascii <text>',
  description: 'Converts text (up to 20 characters) into ASCII art.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const textToAscii = args.join(' ');
      
      if (!textToAscii) {
        return message.reply('Please provide text to convert to ASCII.');
      }

      if (textToAscii.length > 20) {
        return message.reply('Please provide text up to 20 characters.');
      }

      figlet(textToAscii, function (err, data) {
        if (err) {
          console.error('Error:', err);
          return message.reply('An error occurred while converting text to ASCII.');
        }
        
        message.channel.send(`\`\`\`\n${data}\n\`\`\``);
      });
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while processing the command.');
    }
  },
};
