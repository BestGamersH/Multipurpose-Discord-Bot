const Discord = require('discord.js');
const fetch = require('node-fetch');
const disbut = require('discord-buttons');
const {
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
		options.embed.title = 'Never Have I Ever | Weky Development';
	}
	if (typeof options.embed.title !== 'string') {
		throw new TypeError('Weky Error: embed title must be a string.');
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

	if (!options.buttons) options.buttons = {};
	if (typeof options.buttons !== 'object') {
		throw new TypeError('Weky Error: buttons must be an object.');
	}

	if (!options.buttons.optionA) options.buttons.optionA = 'Yes';
	if (typeof options.buttons.optionA !== 'string') {
		throw new TypeError('Weky Error: button must be a string.');
	}

	if (!options.buttons.optionB) options.buttons.optionB = 'No';
	if (typeof options.buttons.optionB !== 'string') {
		throw new TypeError('Weky Error: button must be a string.');
	}

	const id1 =
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20) +
		'-' +
		getRandomString(20);

	const id2 =
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
	let { statement } = await fetch(
		'https://api.nhie.io/v1/statements/random?category[]=harmless',
	).then((res) => res.json());
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	statement = statement.trim();
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});

	let btn = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(`${options.buttons.optionA}`)
		.setID(id1);
	let btn2 = new disbut.MessageButton()
		.setStyle('blurple')
		.setLabel(`${options.buttons.optionB}`)
		.setID(id2);

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
	});
	const embed = new Discord.MessageEmbed()
		.setTitle(options.embed.title)
		.setDescription(statement)
		.setColor(options.embed.color)
		.setFooter(options.embed.footer);
	if (options.embed.timestamp) {
		embed.setTimestamp();
	}
	await think
		.edit({
			embed: embed,
			components: [{ type: 1, components: [btn, btn2] }],
		})
		.then(async (m) => {
			const gameCollector = m.createButtonCollector((fn) => fn);
			gameCollector.on('collect', (nhie) => {
				if (nhie.clicker.user.id !== options.message.author.id) {
					return nhie.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				nhie.reply.defer();
				if (nhie.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(`${options.buttons.optionA}`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(`${options.buttons.optionB}`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
				} else if (nhie.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(`${options.buttons.optionA}`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(`${options.buttons.optionB}`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
				}
			});
		});
};
