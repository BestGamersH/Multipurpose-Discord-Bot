const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'define',
  category: '📚 Dictionary',
  aliases: [],
  usage: 'define [word]',
  description: 'Retrieves the definition of a word from Urban Dictionary.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const word = args.join(' ');

      if (!word) {
        return message.reply('Please provide a word to define.');
      }

      // Urban Dictionary API endpoint for getting definitions
      const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`;

      // Make a GET request to the Urban Dictionary API
      const response = await axios.get(apiUrl);

      const definitionData = response.data.list;

      if (definitionData && definitionData.length > 0) {
        const definition = definitionData[0].definition;
        const example = definitionData[0].example;
        const author = definitionData[0].author;

        // Create an embed with the definition information
        const embed = new MessageEmbed()
          .setColor('#ffcc00')
          .setTitle(`Definition of ${word}`)
          .addField('Definition', definition)
          .addField('Example', example)
          .setFooter(`Definition by ${author}`);

        // Send the definition as an embed
        message.channel.send({ embeds: [embed] });
      } else {
        message.channel.send(`No definition found for **${word}**.`);
      }
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while fetching the definition.');
    }
  },
};
