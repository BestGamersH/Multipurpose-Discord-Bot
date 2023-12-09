const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'cat',
  category: '🐱 Animals',
  aliases: ['randomcat', 'meow'],
  usage: 'cat',
  description: 'Sends a random cat image.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();

      if (!data || !data[0] || !data[0].url) {
        return message.reply('Failed to fetch a cat image. Try again later.');
      }

      const catImage = data[0].url;

      // Creating an embed with the cat image
      const catEmbed = new MessageEmbed()
        .setColor('#ff9900')
        .setDescription(`Here you go, ${message.author}!`)
        .setImage(catImage);

      // Sending the cat image as an embed
      await message.channel.send({ embeds: [catEmbed] });
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while fetching the cat image.');
    }
  },
};
