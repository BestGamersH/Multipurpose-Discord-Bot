const data = new Set();
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	randomHexColor,
	getRandomString,
	checkForUpdates,
	getRandomSentence,
} = require('../../functions/function');

module.exports = async (options) => {
	checkForUpdates();
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
		options.embed.title = 'Chaos Words | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.description) {
		options.embed.description =
			'You have **{{time}}** to find the hidden words in the below sentence.';
	}
	if (typeof options.embed.description !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
	}

	if (!options.embed.field1) options.embed.field1 = 'Sentence:';
	if (typeof options.embed.field1 !== 'string') {
		throw new TypeError('Weky Error: field1 must be a string.');
	}

	if (!options.embed.field2) {
		options.embed.field2 = 'Words Found/Remaining Words:';
	}
	if (typeof options.embed.field2 !== 'string') {
		throw new TypeError('Weky Error: field2 must be a string.');
	}

	if (!options.embed.field3) options.embed.field3 = 'Words found:';
	if (typeof options.embed.field3 !== 'string') {
		throw new TypeError('Weky Error: field3 must be a string.');
	}

	if (!options.embed.field4) options.embed.field4 = 'Words:';
	if (typeof options.embed.field4 !== 'string') {
		throw new TypeError('Weky Error: field4 must be a string.');
	}

	if (!options.embed.color) options.embed.color = randomHexColor();
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

	if (!options.winMessage) {
		options.winMessage = 'GG, You won! You made it in **{{time}}**.';
	}
	if (typeof options.winMessage !== 'string') {
		throw new TypeError('Weky Error: winMessage must be a string.');
	}

	if (!options.loseMessage) options.loseMessage = 'Better luck next time!';
	if (typeof options.loseMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.wrongWordMessage) {
		options.wrongWordMessage =
			'Wrong Guess! You have **{{remaining_tries}}** tries left.';
	}
	if (typeof options.wrongWordMessage !== 'string') {
		throw new TypeError('Weky Error: wrongWordMessage must be a string.');
	}

	if (!options.correctWordMessage) {
		options.correctWordMessage =
			'GG, **{{word}}** was correct! You have to find **{{remaining}}** more word(s).';
	}
	if (typeof options.correctWordMessage !== 'string') {
		throw new TypeError('Weky Error: correctWordMessage must be a string.');
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

	if (!options.words) {
		options.words = getRandomSentence(Math.floor(Math.random() * 6) + 2);
	}
	if (typeof options.words !== 'object') {
		throw new TypeError('Weky Error: words must be an array.');
	}

	if (!options.charGenerated) {
		options.charGenerated = options.words.join('').length - 1;
	}
	if (typeof options.charGenerated !== 'number') {
		throw new TypeError('Weky Error: charGenerated must be a number.');
	}

	if (!options.maxTries) options.maxTries = 10;
	if (typeof options.maxTries !== 'number') {
		throw new TypeError('Weky Error: maxTries must be a number.');
	}

	if (!options.othersMessage) {
		options.othersMessage = 'Only <@{{author}}> can use the buttons!';
	}
	if (typeof options.othersMessage !== 'string') {
		throw new TypeError('Weky Error: othersMessage must be a string.');
	}

	if (!options.buttonText) options.buttonText = 'Cancel';
	if (typeof options.buttonText !== 'string') {
		throw new TypeError('Weky Error: buttonText must be a string.');
	}

	if (data.has(options.message.author.id)) return;
	data.add(options.message.author.id);

	const id =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	let tries = 0;
	const array = [];
	let remaining = 0;
	const guessed = [];
	if (options.words.join('').length > options.charGenerated) {
		options.charGenerated = options.words.join('').length - 1;
	}
	for (let i = 0; i < options.charGenerated; i++) {
		array.push(
			'abcdefghijklmnopqrstuvwxyz'.charAt(
				Math.floor(Math.random() * 'abcdefghijklmnopqrstuvwxyz'.length),
			),
		);
	}
	options.words.forEach((e) => {
		array.splice(Math.floor(Math.random() * array.length), 0, e);
	});
	const arr = array.join('');
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			options.embed.description.replace('{{time}}', convertTime(options.time)),
		)
		.addField(options.embed.field1, array.join(''))
		.addField(options.embed.field2, `0/${options.words.length}`)
		.setFooter(options.embed.footer)
		.setColor(options.embed.color);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	let btn1 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.buttonText)
		.setID(id);
	const mes = await options.message.inlineReply(embed);
	await mes.edit({
		embed,
		components: [{ type: 1, components: [btn1] }],
	});
	const gameCreatedAt = Date.now();
	const filter = (m) => m.author.id === options.message.author.id;
	const game = await options.message.channel.createMessageCollector(filter, {
		time: options.time,
	});
	game.on('collect', async (msg) => {
		const condition =
			options.words.includes(msg.content.toLowerCase()) &&
			!guessed.includes(msg.content.toLowerCase());
		if (condition) {
			remaining++;
			const pos = array.indexOf(msg.content.toLowerCase());
			array.splice(pos, 1);
			guessed.push(msg.content.toLowerCase());
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.embed.description.replace(
						'{{time}}',
						convertTime(options.time),
					),
				)
				.addField(options.embed.field1, array.join(''))
				.addField(options.embed.field3, `${guessed.join(', ')}`)
				.addField(options.embed.field2, `${remaining}/${options.words.length}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setID(id);
			mes.edit({
				embed: _embed,
				components: [{ type: 1, components: [btn1] }],
			});
			if (remaining === options.words.length) {
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				mes.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				const time = convertTime(Date.now() - gameCreatedAt);
				const __embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.addField(options.embed.field1, arr)
					.setDescription(options.winMessage.replace('{{time}}', time))
					.addField(options.embed.field4, `${options.words.join(', ')}`)
					.setFooter(options.embed.footer)
					.setColor(options.embed.color);
				if (options.embed.timestamp) {
					__embed.setTimestamp();
				}
				options.message.inlineReply({
					embed: __embed,
				});
				data.delete(options.message.author.id);
				return game.stop();
			}
			const __embed = new Discord.MessageEmbed()
				.setFooter(options.embed.footer)
				.setDescription(
					`${options.correctWordMessage
						.replace('{{word}}', msg.content.toLowerCase())
						.replace('{{remaining}}', options.words.length - remaining)}`,
				)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				__embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: __embed,
			});
		} else {
			tries++;
			if (tries === options.maxTries) {
				const _embed = new Discord.MessageEmbed()
					.setTitle(options.embed.title)
					.setDescription(options.loseMessage)
					.addField(options.embed.field1, arr)
					.addField(options.embed.field4, `${options.words.join(', ')}`)
					.setFooter(options.embed.footer)
					.setColor(options.embed.color);
				if (options.embed.timestamp) {
					_embed.setTimestamp();
				}
				btn1 = new disbut.MessageButton()
					.setStyle('red')
					.setLabel(options.buttonText)
					.setDisabled()
					.setID(id);
				mes.edit({
					embed: embed,
					components: [{ type: 1, components: [btn1] }],
				});
				options.message.inlineReply({
					embed: _embed,
				});
				data.delete(options.message.author.id);
				return game.stop();
			}
			const _embed = new Discord.MessageEmbed()
				.setFooter(options.embed.footer)
				.setDescription(
					`${options.wrongWordMessage.replace(
						'{{remaining_tries}}',
						`${options.maxTries - tries}`,
					)}`,
				)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: _embed,
			});
		}
	});
	game.on('end', (msg, reason) => {
		if (reason === 'time') {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(options.loseMessage)
				.addField(options.embed.field1, arr)
				.addField(options.embed.field4, `${options.words.join(', ')}`)
				.setFooter(options.embed.footer)
				.setColor(options.embed.color);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			mes.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			data.delete(options.message.author.id);
			options.message.inlineReply(_embed);
		}
	});

	const gameCollector = mes.createButtonCollector((fn) => fn);
	gameCollector.on('collect', (button) => {
		if (button.clicker.user.id !== options.message.author.id) {
			return button.reply.send(
				options.othersMessage.replace('{{author}}', options.message.author.id),
				true,
			);
		}
		button.reply.defer();
		btn1 = new disbut.MessageButton()
			.setStyle('red')
			.setLabel(options.buttonText)
			.setDisabled()
			.setID(id);
		mes.edit({
			embed: embed,
			components: [{ type: 1, components: [btn1] }],
		});
		const _embed = new Discord.MessageEmbed()
			.setTitle(options.embed.title)
			.setDescription(options.loseMessage)
			.addField(options.embed.field1, arr)
			.addField(options.embed.field4, `${options.words.join(', ')}`)
			.setFooter(options.embed.footer)
			.setColor(options.embed.color);
		if (options.embed.timestamp) {
			_embed.setTimestamp();
		}
		options.message.inlineReply(_embed);
		data.delete(options.message.author.id);
		gameCollector.stop();
		return game.stop();
	});
};
