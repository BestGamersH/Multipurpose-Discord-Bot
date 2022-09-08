const data = new Set();
const Discord = require('discord.js');
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
		options.embed.title = 'Fast Type | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.description) {
		options.embed.description =
			'You have **{{time}}** to type the below sentence.';
	}
	if (typeof options.embed.description !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
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

	if (!options.sentence) {
		options.sentence = functions
			.getRandomSentence(Math.floor(Math.random() * 10) + 3)
			.toString()
			.split(',')
			.join(' ');
	}
	if (typeof options.sentence !== 'string') {
		throw new TypeError('Weky Error: sentence must be a string');
	}

	if (!options.winMessage) {
		options.winMessage =
			'GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.';
	}
	if (typeof options.winMessage !== 'string') {
		throw new TypeError('Weky Error: winMessage must be a string.');
	}

	if (!options.loseMessage) options.loseMessage = 'Better luck next time!';
	if (typeof options.loseMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.time) options.time = 60000;
	if (parseInt(options.time) < 10000) {
		throw new Error(
			'Weky Error: time argument must be greater than 10 Seconds (in ms i.e. 10000).',
		);
	}
	if (typeof options.time !== 'number') {
		throw new TypeError('Weky Error: time must be a number.');
	}

	if (!options.buttonText) options.buttonText = 'Cancel';
	if (typeof options.buttonText !== 'string') {
		throw new TypeError('Weky Error: buttonText must be a string.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (!options.cancelMessage) options.cancelMessage = 'You ended the game!';
	if (typeof options.cancelMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

	const id =
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20) +
		'-' +
		functions.getRandomString(20);

	const sentence = options.sentence
		.toLowerCase()
		.split(' ')
		.map((msg) => `\`${msg.split('').join(' ')}\``)
		.join(' ');
	const gameCreatedAt = Date.now();
	let btn1 = new Discord.MessageButton()
		.setStyle('DANGER')
		.setLabel(options.buttonText)
		.setCustomId(id);
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			`${options.embed.description.replace(
				'{{time}}',
				functions.convertTime(options.time),
			)}`,
		)
		.addField('Sentence:', `${sentence}`)
		.setFooter(options.embed.footer)
		.setColor(options.embed.color);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	const think = await options.message.reply({
		embeds: [embed],
		components: [{ type: 1, components: [btn1] }],
	});

	const collector = await options.message.channel.createMessageCollector({
		filter: (m) => !m.author.bot && m.author.id === options.message.author.id,
		time: options.time,
	});

	collector.on('collect', async (msg) => {
		if (msg.content.toLowerCase().trim() === options.sentence.toLowerCase()) {
			const time = Date.now() - gameCreatedAt;
			const minute = (time / 1000 / 60) % 60;
			const wpm = msg.content.toLowerCase().trim().length / 5 / minute;
			const _embed = new Discord.MessageEmbed()
				.setDescription(
					options.winMessage
						.replace('{{time}}', functions.convertTime(time))
						.replace('{{wpm}}', wpm.toFixed(2)),
				)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({ embeds: [_embed] });
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			await think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
			collector.stop(msg.author.username);
			data.delete(options.message.author.id);
		} else {
			const _embed = new Discord.MessageEmbed()
				.setDescription(`${options.loseMessage}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({ embeds: [_embed] });
			collector.stop(msg.author.username);
			data.delete(options.message.author.id);
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			await think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
		}
	});

	collector.on('end', async (_collected, reason) => {
		if (reason === 'time') {
			const _embed = new Discord.MessageEmbed()
				.setDescription(`${options.loseMessage}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({ embeds: [_embed] });
			btn1 = new Discord.MessageButton()
				.setStyle('DANGER')
				.setLabel(options.buttonText)
				.setDisabled()
				.setCustomId(id);
			await think.edit({
				embeds: [embed],
				components: [{ type: 1, components: [btn1] }],
			});
			data.delete(options.message.author.id);
		}
	});

	const gameCollector = think.createMessageComponentCollector((fn) => fn);

	gameCollector.on('collect', (button) => {
		if (button.user.id !== options.message.author.id) {
			return button.reply({
				content: options.othersMessage.replace(
					'{{author}}',
					options.message.member.id,
				),
				ephemeral: true,
			});
		}
		btn1 = new Discord.MessageButton()
			.setStyle('DANGER')
			.setLabel(options.buttonText)
			.setDisabled()
			.setCustomId(id);
		think.edit({
			embeds: [embed],
			components: [{ type: 1, components: [btn1] }],
		});
		button.reply({
			content: options.cancelMessage,
			ephemeral: true,
		});
		gameCollector.stop();
		data.delete(options.message.author.id);
		return collector.stop();
	});
};
