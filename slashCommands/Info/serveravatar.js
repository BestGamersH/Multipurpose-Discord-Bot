const Discord = require("discord.js");
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
  name: "serveravatar",
  description: "Shows the ServerAvatar",
  run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
    //things u can directly access in an interaction!
    const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction; 
    const { guild } = member;
    
    try {
      interaction?.reply({ephemeral: true, embeds: [new Discord.MessageEmbed()
      .setAuthor(handlemsg(client.la[ls].cmds.info.serveravatar.author, { servername: guild.name }), guild.iconURL({dynamic: true}), "https://discord.gg/bestgamershk")
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
      .addField("<a:arrow:1168762387067846687> PNG",`[\`LINK\`](${guild.iconURL({format: "png"})})`, true)
      .addField("<a:arrow:1168762387067846687> JPEG",`[\`LINK\`](${guild.iconURL({format: "jpg"})})`, true)
      .addField("<a:arrow:1168762387067846687> WEBP",`[\`LINK\`](${guild.iconURL({format: "webp"})})`, true)
      .setURL(guild.iconURL({
        dynamic: true
      }))
      .setFooter(client.getFooter(es))
      .setImage(guild.iconURL({
        dynamic: true, size: 256,
      }))
    ]});
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
    }
  }
}
/**
 * @INFO
 * Bot Coded by bestgamershk_ | https://discord.gg/bestgamershk
 * @INFO
 * Work for BestGamersHK | discord.gg/bestgamershk
 * @INFO
 * Please mention him, when using this Code!
 * @INFO
 */
