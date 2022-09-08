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

	if (!options.word) options.word = functions.getRandomSentence(1);

	if (!options.button) options.button = {};
	if (typeof options.button !== 'object') {
		throw new TypeError('Weky Error: button must be an object.');
	}

	if (!options.button.cancel) options.button.cancel = 'Cancel';
	if (typeof options.button.cancel !== 'string') {
		throw new TypeError('Weky Error: cancel button text must be a string.');
	}

	if (!options.button.reshuffle) options.button.reshuffle = 'Reshuffle';
	if (typeof options.button.reshuffle !== 'string') {
		throw new TypeError('Weky Error: reshuffle button text must be a string.');
	}

	if (!options.embed) options.embed = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Weky Error: embed must be an object.');
	}

	if (!options.embed.title) {
		options.embed.title = 'Shuffle Guess | Weky Development';
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

	if (!options.startMessage) {
		options.startMessage =
			'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!';
	}
	if (typeof options.startMessage !== 'string') {
		throw new TypeError('Weky Error: startMessage must be a string.');
	}

	if (!options.winMessage) {
		options.winMessage =
			'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**';
	}
	if (typeof options.winMessage !== 'string') {
		throw new TypeError('Weky Error: winMessage must be a string.');
	}

	if (!options.loseMessage) {
		options.loseMessage =
			'Better luck next time! The correct answer was **{{answer}}**.';
	}
	if (typeof options.loseMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.incorrectMessage) {
		options.incorrectMessage = 'No {{author}}! The word isn\'t `{{answer}}`';
	}
	if (typeof options.incorrectMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
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

	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

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

	const word = functions.shuffleString(options.word.toString());

	let disbut = new Discord.MessageButton()
		.setLabel(options.button.reshuffle)
		.setCustomId(id1)
		.setStyle('SUCCESS');
	let cancel = new Discord.MessageButton()
		.setLabel(options.button.cancel)
		.setCustomId(id2)
		.setStyle('DANGER');
	const emd = new Discord.MessageEmbed()
		.setColor(options.embed.color)
		.setTitle(options.embed.title)
		.setFooter(options.embed.footer)
		.setDescription(
			options.startMessage
				.replace('{{word}}', word)
				.replace('{{time}}', functions.convertTime(options.time)),
		);
	if (options.embed.timestamp) {
		emd.setTimestamp();
	}

	const embed = await options.message.reply({
		embeds: [emd],
		components: [
			{
				type: 1,
				components: [disbut, cancel],
			},
		],
	});

	const gameCreatedAt = Date.now();
	const filter = (m) => m.author.id === options.message.author.id;
	const gameCollector = options.message.channel.createMessageCollector({
		filter,
		time: options.time,
		errors: ['time'],
	});

	gameCollector.on('collect', async (msg) => {
		if (msg.content.toLowerCase() === options.word.toString()) {
			gameCollector.stop();
			data.delete(options.message.author.id);
			disbut = new Discord.MessageButton()
				.setLabel(options.button.reshuffle)
				.setCustomId(id1)
				.setStyle('SUCCESS')
				.setDisabled();
			cancel = new Discord.MessageButton()
				.setLabel(options.button.cancel)
				.setCustomId(id2)
				.setStyle('DANGER')
				.setDisabled();
			const time = functions.convertTime(Date.now() - gameCreatedAt);
			const _embed = new Discord.MessageEmbed()
				.setColor(options.embed.color)
				.setFooter(options.embed.footer)
				.setDescription(
					options.winMessage
						.replace('{{word}}', options.word.toString())
						.replace('{{time}}', time),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({ embeds: [_embed] });
			embed.edit({
				embeds: [emd],
				components: [
					{
						type: 1,
						components: [disbut, cancel],
					},
				],
			});
		} else {
			const _embed = new Discord.MessageEmbed()
				.setDescription(
					options.incorrectMessage
						.replace('{{author}}', msg.author.toString())
						.replace('{{answer}}', msg.content.toLowerCase()),
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.reply({ embeds: [_embed] }).then((m) => m.delete({ timeout: 3000 }));
		}
	});

	const GameCollector = embed.createMessageComponentCollector({
		filter: (fn) => fn,
	});

	GameCollector.on('collect', async (btn) => {
		if (btn.user.id !== options.message.author.id) {
			return btn.reply({
				content: options.othersMessage.replace(
					'{{author}}',
					options.message.member.id,
				),
				ephemeral: true,
			});
		}
		await btn.deferUpdate();

		if (btn.customId === id1) {
			const _embed = new Discord.MessageEmbed()
				.setColor(options.embed.color)
				.setTitle(options.embed.title)
				.setFooter(options.embed.footer)
				.setDescription(
					options.startMessage
						.replace(
							'{{word}}',
							functions.shuffleString(options.word.toString()),
						)
						.replace('{{time}}', functions.convertTime(options.time)),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			return embed.edit({
				embeds: [_embed],
				components: [
					{
						type: 1,
						components: [disbut, cancel],
					},
				],
			});
		} else if (btn.customId === id2) {
			gameCollector.stop();
			data.delete(options.message.author.id);
			disbut = new Discord.MessageButton()
				.setLabel(options.button.reshuffle)
				.setCustomId(id1)
				.setStyle('SUCCESS')
				.setDisabled();
			cancel = new Discord.MessageButton()
				.setLabel(options.button.cancel)
				.setCustomId(id2)
				.setStyle('DANGER')
				.setDisabled();
			const _embed = new Discord.MessageEmbed()
				.setColor(options.embed.color)
				.setTitle(options.embed.title)
				.setFooter(options.embed.footer)
				.setDescription(
					options.loseMessage.replace('{{answer}}', options.word.toString()),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			return embed.edit({
				embeds: [_embed],
				components: [
					{
						type: 1,
						components: [disbut, cancel],
					},
				],
			});
		}
	});

	gameCollector.on('end', async (_collected, reason) => {
		if (reason === 'time') {
			disbut = new Discord.MessageButton()
				.setLabel(options.button.reshuffle)
				.setCustomId(id1)
				.setStyle('SUCCESS')
				.setDisabled();
			cancel = new Discord.MessageButton()
				.setLabel(options.button.cancel)
				.setCustomId(id2)
				.setStyle('DANGER')
				.setDisabled();
			const _embed = new Discord.MessageEmbed()
				.setColor(options.embed.color)
				.setFooter(options.embed.footer)
				.setDescription(
					options.loseMessage.replace('{{answer}}', options.word.toString()),
				);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.reply({ embeds: [_embed] });
			data.delete(options.message.author.id);
			return embed.edit({
				embeds: [emd],
				components: [
					{
						type: 1,
						components: [disbut, cancel],
					},
				],
			});
		}
	});
};
