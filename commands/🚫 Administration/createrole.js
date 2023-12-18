const { Permissions } = require('discord.js');

module.exports = {
  name: 'createrole',
  category: 'Moderation',
  aliases: [],
  usage: 'createrole <role name> <permissions>',
  description: 'Generates a new custom role with specified permissions.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if (!message.member.permissions.has('MANAGE_ROLES'))
        return message.reply('You do not have permission to manage roles.');

      const roleName = args[0];
      if (!roleName)
        return message.reply('Please provide a name for the new role.');

      const permissions = args.slice(1).join(' ');
      if (!permissions)
        return message.reply('Please specify permissions for the role.');

      const parsedPermissions = Permissions.FLAGS[permissions.toUpperCase()];
      if (!parsedPermissions)
        return message.reply('Invalid permissions provided.');

      // Create the new role
      const createdRole = await message.guild.roles.create({
        name: roleName,
        permissions: parsedPermissions,
        reason: 'Role creation requested by user.',
      });

      return message.channel.send(`Role ${createdRole.name} has been created.`);
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while creating the role.');
    }
  },
};
