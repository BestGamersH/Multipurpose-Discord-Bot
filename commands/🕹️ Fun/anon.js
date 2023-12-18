const { Permissions, Collection } = require('discord.js');

// Create a cooldowns Collection to store cooldowns for each command
const cooldowns = new Collection();

module.exports = {
  name: 'anon',
  category: '🕵️‍♂️ Anonymous',
  aliases: [],
  usage: 'anon [message]',
  description: 'Sends an anonymous message in the current channel (10 seconds cooldown).',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      // Check if the command was used in a guild (server)
      if (message.guild) {
        const anonymousMessage = args.join(' ');

        if (!anonymousMessage) {
          return message.reply('Please provide a message for the anonymous post.');
        }

        // Check if the command is on cooldown for this user
        if (!cooldowns.has('anon')) {
          cooldowns.set('anon', new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get('anon');
        const cooldownAmount = 10000; // 10 seconds cooldown

        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before reusing the command.`);
          }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Send the anonymous message in the current channel
        await message.channel.send(`Anonymous message: ${anonymousMessage}`);

        // Delete the user's message invoking the command
        await message.delete();
      } else {
        return message.reply('This command can only be used in a server.');
      }
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while sending the anonymous message.');
    }
  },
};

const { Permissions, Collection } = require('discord.js');

// Create a cooldowns Collection to store cooldowns for each command
const cooldowns = new Collection();

module.exports = {
  name: 'anon',
  category: '🕵️‍♂️ Anonymous',
  aliases: [],
  usage: 'anon [message]',
  description: 'Sends an anonymous message in the current channel (10 seconds cooldown).',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      // Check if the command was used in a guild (server)
      if (message.guild) {
        const anonymousMessage = args.join(' ');

        if (!anonymousMessage) {
          return message.reply('Please provide a message for the anonymous post.');
        }

        // Check if the command is on cooldown for this user
        if (!cooldowns.has('anon')) {
          cooldowns.set('anon', new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get('anon');
        const cooldownAmount = 10000; // 10 seconds cooldown

        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before reusing the command.`);
          }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Send the anonymous message in the current channel
        await message.channel.send(`Anonymous message: ${anonymousMessage}`);

        // Delete the user's message invoking the command
        await message.delete();
      } else {
        return message.reply('This command can only be used in a server.');
      }
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while sending the anonymous message.');
    }
  },
};
