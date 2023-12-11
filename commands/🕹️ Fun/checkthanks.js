const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'checkthanks',
  category: '🙏 Gratitude',
  aliases: ['mythanks', 'viewthanks','ct',],
  usage: 'checkthanks [@user]',
  description: 'Check the number of thanks you have received or view thanks given to another user.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const user = message.mentions.members.first() || message.member;

      const thanksData = JSON.parse(fs.readFileSync('./data/thanks.json', 'utf8'));

      if (!thanksData[message.guild.id] || !thanksData[message.guild.id][user.id]) {
        return message.reply('No thanks found for this user.');
      }

      const receivedThanks = thanksData[message.guild.id][user.id];

      const embed = new MessageEmbed()
        .setColor('#ffa500')
        .setTitle(`Thanks Received for ${user.user.tag}`)
        .setDescription(`Total Thanks: ${receivedThanks.length}\n\n`);

      for (const thanks of receivedThanks) {
        const thanker = client.users.cache.get(thanks.thanker);
        embed.addField(
          `Thanked for ${thanks.reason}`,
          `**Thanked by**: ${thanker ? thanker.tag : 'Unknown User'}\n**Date**: ${thanks.timestamp}`
        );
      }

      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while fetching the thanks data.');
    }
  },
};
