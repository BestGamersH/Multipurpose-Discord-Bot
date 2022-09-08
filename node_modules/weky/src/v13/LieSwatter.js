const fetch = require('node-fetch');
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
		options.embed.title = 'Lie Swatter | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
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

	if (!options.thinkMessage) options.thinkMessage = 'I am thinking';
	if (typeof options.thinkMessage !== 'string') {
		throw new TypeError('Weky Error: thinkMessage must be a boolean.');
	}

	if (!options.winMessage) {
		options.winMessage =
			'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.';
	}
	if (typeof options.winMessage !== 'string') {
		throw new TypeError('Weky Error: winMessage must be a boolean.');
	}

	if (!options.loseMessage) {
		options.loseMessage = 'Better luck next time! It was a **{{answer}}**.';
	}
	if (typeof options.loseMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a boolean.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (!options.buttons) options.buttons = {};
	if (typeof options.buttons !== 'object') {
		throw new TypeError('Weky Error: buttons must be an object.');
	}

	if (!options.buttons.true) options.buttons.true = 'Truth';
	if (typeof options.buttons.true !== 'string') {
		throw new TypeError('Weky Error: true buttons text must be a string.');
	}

	if (!options.buttons.lie) options.buttons.lie = 'Lie';
	if (typeof options.buttons.lie !== 'string') {
		throw new TypeError('Weky Error: lie buttons text must be a string.');
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

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}...`)
				.setColor(options.embed.color),
		],
	});

	const { results } = await fetch(
		'https://opentdb.com/api.php?amount=1&type=boolean',
	).then((res) => res.json());
	const question = results[0];

	await think.edit({
		embeds: [
			new Discord.MessageEmbed()
				.setTitle(`${options.thinkMessage}..`)
				.setColor(options.embed.color),
		],
	});

	let answer;
	let winningID;
	if (question.correct_answer === 'True') {
		winningID = id1;
		answer = options.buttons.true;
	} else {
		winningID = id2;
		answer = options.buttons.lie;
	}

	let btn1 = new Discord.MessageButton()
		.setStyle('PRIMARY')
		.setLabel(options.buttons.true)
		.setCustomId(id1);
	let btn2 = new Discord.MessageButton()
		.setStyle('PRIMARY')
		.setLabel(options.buttons.lie)
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
		.setDescription(decode(question.question))
		.setColor(options.embed.color)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think
		.edit({
			embeds: [embed],
			components: [{ type: 1, components: [btn1, btn2] }],
		});

	const gameCreatedAt = Date.now();
	const gameCollector = think.createMessageComponentCollector({
		filter: (fn) => fn,
	});

	gameCollector.on('collect', async (button) => {
		if (button.user.id !== options.message.author.id) {
			return button.reply({
				content: options.othersMessage.replace(
					'{{author}}',
					options.message.member.id,
				),
				ephemeral: true,
			});
		}

		await button.deferUpdate();

		if (button.customId === winningID) {
			btn1 = new Discord.MessageButton()
				.setLabel(options.buttons.true)
				.setCustomId(id1)
				.setDisabled();
			btn2 = new Discord.MessageButton()
				.setLabel(options.buttons.lie)
				.setCustomId(id2)
				.setDisabled();
			gameCollector.stop();
			if (winningID === id1) {
				btn1.setStyle('SUCCESS');
				btn2.setStyle('DANGER');
			} else {
				btn1.setStyle('DANGER');
				btn2.setStyle('SUCCESS');
			}
			think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1, btn2] }],
			});
			const time = functions.convertTime(Date.now() - gameCreatedAt);
			const winEmbed = new Discord.MessageEmbed()
				.setDescription(
					`${options.winMessage
						.replace('{{answer}}', decode(answer))
						.replace('{{time}}', time)}`,
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				winEmbed.setTimestamp();
			}
			options.message.reply({ embeds: [winEmbed] });
		} else {
			btn1 = new Discord.MessageButton()
				.setLabel(options.buttons.true)
				.setCustomId(id1)
				.setDisabled();
			btn2 = new Discord.MessageButton()
				.setLabel(options.buttons.lie)
				.setCustomId(id2)
				.setDisabled();
			gameCollector.stop();
			if (winningID === id1) {
				btn1.setStyle('SUCCESS');
				btn2.setStyle('DANGER');
			} else {
				btn1.setStyle('DANGER');
				btn2.setStyle('SUCCESS');
			}
			think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1, btn2] }],
			});
			const lostEmbed = new Discord.MessageEmbed()
				.setDescription(
					`${options.loseMessage.replace('{{answer}}', decode(answer))}`,
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				lostEmbed.setTimestamp();
			}
			options.message.reply({ embeds: [lostEmbed] });
		}
	});
};
