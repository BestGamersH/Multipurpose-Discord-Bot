const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'thankyou',
  category: '🙏 Gratitude',
  aliases: ['thanks', 'thank'],
  usage: 'thankyou <@user> <reason>',
  description: 'Publicly thank another member for their contributions.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      // Fetch mentioned user
      const user = message.mentions.members.first();
      if (!user) {
        return message.reply('Please mention the user you want to thank.');
      }

      // Remove the mentioned user from the arguments
      args.shift();
      const reason = args.join(' ');

      if (!reason) {
        return message.reply('Please provide a reason for thanking the user.');
      }

      // Storing thanks in JSON format
      const thanksData = JSON.parse(fs.readFileSync('./data/thanks.json', 'utf8'));

      if (!thanksData[message.guild.id]) {
        thanksData[message.guild.id] = {};
      }

      if (!thanksData[message.guild.id][user.id]) {
        thanksData[message.guild.id][user.id] = [];
      }

      thanksData[message.guild.id][user.id].push({
        thanker: message.author.id,
        reason: reason,
        timestamp: new Date().toISOString(),
      });

      fs.writeFileSync('./data/thanks.json', JSON.stringify(thanksData, null, 2));

      // Sending a thank-you message as an embed
      const thankEmbed = new MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`🙏 **${message.author.tag}** thanked **${user.user.tag}** for: "${reason}"`);

      await message.channel.send({ embeds: [thankEmbed] });
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while processing the thank-you message.');
    }
  },
};
