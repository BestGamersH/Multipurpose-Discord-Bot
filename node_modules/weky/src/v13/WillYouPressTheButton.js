const Discord = require('discord.js');
const { decode } = require('html-entities');
const functions = require('../../functions/function');

module.exports = async (options) => {
	functions.checkForUpdates();
	if (!options.message) {
		throw new Error('Weky Error: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Weky Error: Invalid Discord Message was provided.');
	}

	if (!options.embed) options.embed = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Weky Error: embed must be an object.');
	}

	if (!options.embed.title) {
		options.embed.title = 'Will you press the button? | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.description) {
		options.embed.description =
			'```{{statement1}}```\n**but**\n\n```{{statement2}}```';
	}
	if (typeof options.embed.description !== 'string') {
		throw new TypeError('Weky Error: embed description must be a string.');
	}

	if (!options.embed.color) options.embed.color = functions.randomHexColor();
	if (typeof options.embed.color !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
	}

	if (!options.embed.footer) {
		options.embed.footer = '©️ Weky Development';
	}
	if (typeof options.embed.footer !== 'string') {
		throw new TypeError('Weky Error: embed footer must be a string.');
	}

	if (!options.embed.timestamp) options.embed.timestamp = true;
	if (typeof options.embed.timestamp !== 'boolean') {
		throw new TypeError('Weky Error: timestamp must be a boolean.');
	}

	if (!options.button) options.button = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Weky Error: buttons must be an object.');
	}

	if (!options.button.yes) options.button.yes = 'Yes';
	if (typeof options.button.yes !== 'string') {
		throw new TypeError('Weky Error: yesLabel must be a string.');
	}

	if (!options.button.no) options.button.no = 'No';
	if (typeof options.button.no !== 'string') {
		throw new TypeError('Weky Error: noLabel must be a string.');
	}

	if (!options.thinkMessage) options.thinkMessage = 'I am thinking';
	if (typeof options.thinkMessage !== 'string') {
		throw new TypeError('Weky Error: thinkMessage must be a boolean.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	const id1 =
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20);

	const id2 =
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20);

	const think = await options.message.reply({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}.`)
				.setColor(options.embed.color),
		],
	});

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}..`)
				.setColor(options.embed.color),
		],
	});

	const fetchedData = await functions.WillYouPressTheButton();

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}...`)
				.setColor(options.embed.color),
		],
	});

	const res = {
		questions: [fetchedData.txt1, fetchedData.txt2],
		percentage: {
			1: fetchedData.yes,
			2: fetchedData.no,
		},
	};

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}..`)
				.setColor(options.embed.color),
		],
	});

	let btn = new Discord.MessageButton()
		.setStyle('SUCCESS')
		.setLabel(options.button.yes)
		.setCustomId(id1);
	let btn2 = new Discord.MessageButton()
		.setStyle('DANGER')
		.setLabel(options.button.no)
		.setCustomId(id2);

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}.`)
				.setColor(options.embed.color),
		],
	});

	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			`${options.embed.description
				.replace(
					'{{statement1}}',
					decode(
						res.questions[0].charAt(0).toUpperCase() +
							res.questions[0].slice(1),
					),
				)
				.replace(
					'{{statement2}}',
					decode(
						res.questions[1].charAt(0).toUpperCase() +
							res.questions[1].slice(1),
					),
				)}`,
		)
		.setColor(options.embed.color)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}

	await think.edit({
		embeds: [embed],
		components: [{ type: 1, components: [btn, btn2] }],
	});

	const gameCollector = think.createMessageComponentCollector({
		filter: (fn) => fn,
	});

	gameCollector.on('collect', async (wyptb) => {
		if (wyptb.user.id !== options.message.author.id) {
			return wyptb.reply({
				content: options.othersMessage.replace(
					'{{author}}',
					options.message.member.id,
				),
				ephemeral: true,
			});
		}

		await wyptb.deferUpdate();

		if (wyptb.customId === id1) {
			btn = new Discord.MessageButton()
				.setStyle('SUCCESS')
				.setLabel(`${options.button.yes} (${res.percentage['1']})`)
				.setCustomId(id1)
				.setDisabled();
			btn2 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(`${options.button.no} (${res.percentage['2']})`)
				.setCustomId(id2)
				.setDisabled();
			gameCollector.stop();
			await wyptb.editReply({
				embed: embed,
				components: [{ type: 1, components: [btn, btn2] }],
			});
		} else if (wyptb.customId === id2) {
			btn = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(`${options.button.yes} (${res.percentage['1']})`)
				.setCustomId(id1)
				.setDisabled();
			btn2 = new Discord.MessageButton()
				.setStyle('SUCCESS')
				.setLabel(`${options.button.no} (${res.percentage['2']})`)
				.setCustomId(id2)
				.setDisabled();
			gameCollector.stop();
			await wyptb.editReply({
				embed: embed,
				components: [{ type: 1, components: [btn, btn2] }],
			});
		}
	});
};
