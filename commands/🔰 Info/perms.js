const { Permissions } = require('discord.js');

module.exports = {
  name: 'perms',
  category: 'ℹ️ Info',
  aliases: [],
  usage: 'perms <@user>',
  description: 'Displays the permissions of the mentioned user in the current channel.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const mentionedUser = message.mentions.members.first();
      if (!mentionedUser) {
        return message.reply('Please mention a user.');
      }

      const userPermissions = message.channel.permissionsFor(mentionedUser);
      if (!userPermissions) {
        return message.reply('Cannot retrieve permissions for the mentioned user.');
      }

      const permissions = Object.entries(Permissions.FLAGS);

      const formattedPermissions = permissions.map(([key, value]) => {
        const hasPermission = userPermissions.has(value);
        return `${hasPermission ? '✅' : '❌'} ${key}`;
      });

      message.channel.send(`**Permissions of ${mentionedUser.user.tag} in this channel:**\n\`\`\`css\n${formattedPermissions.join('\n')}\n\`\`\``);
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while fetching permissions.');
    }
  },
};
