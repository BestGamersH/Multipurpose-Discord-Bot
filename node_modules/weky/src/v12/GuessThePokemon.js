const gameData = new Set();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const disbut = require('discord-buttons');
const {
	convertTime,
	randomHexColor,
	checkForUpdates,
	getRandomString,
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
		options.embed.title = 'Guess The Pokémon | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
	}

	if (!options.embed.description) {
		options.embed.description =
			'**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.';
	}
	if (typeof options.embed.description !== 'string') {
		throw new TypeError('Weky Error: embed color must be a string.');
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

	if (!options.time) options.time = 60000;
	if (parseInt(options.time) < 10000) {
		throw new Error(
			'Weky Error: time argument must be greater than 10 Seconds (in ms i.e. 10000).',
		);
	}
	if (typeof options.time !== 'number') {
		throw new TypeError('Weky Error: time must be a number.');
	}

	if (!options.incorrectMessage) {
		options.incorrectMessage = 'No {{author}}! The pokémon isn\'t `{{answer}}`';
	}
	if (typeof options.incorrectMessage !== 'string') {
		throw new TypeError('Weky Error: loseMessage must be a string.');
	}

	if (!options.buttonText) options.buttonText = 'Cancel';
	if (typeof options.buttonText !== 'string') {
		throw new TypeError('Weky Error: buttonText must be a string.');
	}

	if (gameData.has(options.message.author.id)) return;
	gameData.add(options.message.author.id);

	const id =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const think = await options.message.inlineReply({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	const { data } = await fetch(
		'https://fun-api.sujalgoel.engineer/pokemon',
	).then((res) => res.json());
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	let btn1 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.buttonText)
		.setID(id);
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(
			options.embed.description
				.replace('{{type}}', data.types.join(', '))
				.replace('{{abilities}}', data.abilities.join(', '))
				.replace('{{time}}', convertTime(options.time)),
		)
		.setColor(options.embed.color)
		.setImage(data.HiddenImage)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think.edit({
		embed: embed,
		components: [{ type: 1, components: [btn1] }],
	});
	const gameCreatedAt = Date.now();
	const collector = new Discord.MessageCollector(
		options.message.channel,
		(m) => !m.author.bot,
		{ time: options.time },
	);
	collector.on('collect', async (msg) => {
		if (msg.author.id !== options.message.author.id) return;
		if (msg.content.toLowerCase() === data.name) {
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.winMessage
						.replace(
							'{{answer}}',
							data.name.charAt(0).toUpperCase() + data.name.slice(1),
						)
						.replace('{{time}}', convertTime(Date.now() - gameCreatedAt)),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.inlineReply({
				embed: _embed,
			});
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			await think.edit({
				embed,
				components: [{ type: 1, components: [btn1] }],
			});
			collector.stop();
			gameData.delete(options.message.author.id);
		} else {
			const _embed = new Discord.MessageEmbed()
				.setDescription(
					options.incorrectMessage
						.replace('{{answer}}', msg.content.toLowerCase())
						.replace('{{author}}', msg.author.toString()),
				)
				.setColor(options.embed.color)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			msg.inlineReply({
				embed: _embed,
			});
		}
	});

	const gameCollector = think.createButtonCollector((fn) => fn);
	gameCollector.on('collect', (button) => {
		if (button.clicker.user.id !== options.message.author.id) {
			return button.reply.send(
				options.othersMessage.replace('{{author}}', options.message.author.id),
				true,
			);
		}
		button.reply.defer();
		if (button.id === id) {
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			gameCollector.stop();
			collector.stop();
			gameData.delete(options.message.author.id);
			think.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: _embed,
			});
		}
	});
	collector.on('end', async (_msg, reason) => {
		if (reason === 'time') {
			btn1 = new disbut.MessageButton()
				.setStyle('red')
				.setLabel(options.buttonText)
				.setDisabled()
				.setID(id);
			gameCollector.stop();
			collector.stop();
			gameData.delete(options.message.author.id);
			think.edit({
				embed: embed,
				components: [{ type: 1, components: [btn1] }],
			});
			const _embed = new Discord.MessageEmbed()
				.setTitle(options.embed.title)
				.setDescription(
					options.loseMessage.replace(
						'{{answer}}',
						data.name.charAt(0).toUpperCase() + data.name.slice(1),
					),
				)
				.setColor(options.embed.color)
				.setImage(data.ShowImage)
				.setFooter(options.embed.footer);
			if (options.embed.timestamp) {
				_embed.setTimestamp();
			}
			options.message.inlineReply({
				embed: _embed,
			});
		}
	});
};
