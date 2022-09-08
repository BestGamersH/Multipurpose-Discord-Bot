const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { decode } = require('html-entities');
const {
	randomHexColor,
	getRandomString,
	checkForUpdates,
	WillYouPressTheButton,
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

	const fetchedData = await WillYouPressTheButton();
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	const res = {
		questions: [fetchedData.txt1, fetchedData.txt2],
		percentage: {
			1: fetchedData.yes,
			2: fetchedData.no,
		},
	};
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}..`)
			.setColor(options.embed.color),
	});

	let btn = new disbut.MessageButton()
		.setStyle('green')
		.setLabel(options.button.yes)
		.setID(id1);
	let btn2 = new disbut.MessageButton()
		.setStyle('red')
		.setLabel(options.button.no)
		.setID(id2);

	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}.`)
			.setColor(options.embed.color),
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
	await think
		.edit({
			embed: embed,
			components: [{ type: 1, components: [btn, btn2] }],
		})
		.then(async (m) => {
			const gameCollector = m.createButtonCollector((fn) => fn);
			gameCollector.on('collect', (wyptb) => {
				if (wyptb.clicker.user.id !== options.message.author.id) {
					return wyptb.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				wyptb.reply.defer();
				if (wyptb.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('green')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('red')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					think.edit({
						embed: embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
				} else if (wyptb.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('red')
						.setLabel(`${options.button.yes} (${res.percentage['1']})`)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('green')
						.setLabel(`${options.button.no} (${res.percentage['2']})`)
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
