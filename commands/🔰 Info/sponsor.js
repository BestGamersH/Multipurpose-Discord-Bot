const {MessageEmbed} =require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
var ee = require(`${process.cwd()}/botconfig/embed.json`)
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { swap_pages2	 } = require(`${process.cwd()}/handlers/functions`);
module.exports = {
	name: "sponsor",
	category: "🔰 Info",
	aliases: ["sponsors"],
	description: "Shows the sponsor of this BoT",
	usage: "sponsor",
	type: "bot",
	run: async (client, message, args, cmduser, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
		
	try{
			let embed1 = new MessageEmbed()
		    .setColor(es.color)
		    .setTitle(eval(client.la[ls]["cmds"]["info"]["sponsor"]["variable1"]))
		    .setURL("http://axyl.online")
		    .setDescription(`no description provided`)
		    .setImage("https://cdn.discordapp.com/avatars/1074184278545547364/ac5ed327c46166067d345602ee5a0bf0.webp?size=1024")
		    .setFooter("OxyGen",  "https://cdn.discordapp.com/avatars/1074184278545547364/ac5ed327c46166067d345602ee5a0bf0.webp?size=1024")
		
		let embed2 = new MessageEmbed()
			.setColor(es.color)
			.setTimestamp()
			.setFooter("Astron | Axyl  'x10' == -5%",  'https://cdn.discordapp.com/avatars/1074184278545547364/ac5ed327c46166067d345602ee5a0bf0.webp?size=1024')
			.setImage("https://cdn.discordapp.com/avatars/1074184278545547364/ac5ed327c46166067d345602ee5a0bf0.webp?size=1024")
			.setTitle(eval(client.la[ls]["cmds"]["info"]["sponsor"]["variable4"]))
			.setURL("https://axyl.online")
			.setDescription(`no description provided`);
			swap_pages2(client, message, [embed1, embed2])
		} catch (e) {
        console.log(String(e.stack).grey.bgRed)
		return message.reply({embeds: [new MessageEmbed()
		  .setColor(es.wrongcolor)
		  .setFooter(client.getFooter(es))
		  .setTitle(client.la[ls].common.erroroccur)
		  .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
		]});
    }
  }
}

