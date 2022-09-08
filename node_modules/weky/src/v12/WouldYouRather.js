const Discord = require('discord.js');
const disbut = require('discord-buttons');
const { decode } = require('html-entities');
const {
	fetchhtml,
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
		options.embed.title = 'Would you rather... | Weky Development';
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

	if (!options.buttons.optionA) options.buttons.optionA = 'Option A';
	if (typeof options.buttons.optionA !== 'string') {
		throw new TypeError('Weky Error: button must be a string.');
	}

	if (!options.buttons.optionB) options.buttons.optionB = 'Option B';
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
	const $ = await fetchhtml('http://either.io');
	await think.edit({
		embed: new Discord.MessageEmbed()
			.setTitle(`${options.thinkMessage}...`)
			.setColor(options.embed.color),
	});
	const blue = $('div.result.result-1').children();
	const red = $('div.result.result-2').children();
	const res = {
		questions: [blue.eq(3).text(), red.eq(3).text()],
		percentage: {
			1: blue.eq(1).text(),
			2: red.eq(1).text(),
		},
	};
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
		.setDescription(
			`**A)** ${decode(res.questions[0])} \n**B)** ${decode(res.questions[1])}`,
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
			gameCollector.on('collect', (wyr) => {
				if (wyr.clicker.user.id !== options.message.author.id) {
					return wyr.reply.send(
						options.othersMessage.replace(
							'{{author}}',
							options.message.author.id,
						),
						true,
					);
				}
				wyr.reply.defer();
				if (wyr.id === id1) {
					btn = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(
							`${options.buttons.optionA}` + ` (${res.percentage['1']})`,
						)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(
							`${options.buttons.optionB}` + ` (${res.percentage['2']})`,
						)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					const _embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setDescription(
							`**A) ${decode(res.questions[0])} (${
								res.percentage['1']
							})** \nB) ${decode(res.questions[1])} (${res.percentage['2']})`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						_embed.setTimestamp();
					}
					think.edit({
						embed: _embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
				} else if (wyr.id === id2) {
					btn = new disbut.MessageButton()
						.setStyle('gray')
						.setLabel(
							`${options.buttons.optionA}` + ` (${res.percentage['1']})`,
						)
						.setID(id1)
						.setDisabled();
					btn2 = new disbut.MessageButton()
						.setStyle('blurple')
						.setLabel(
							`${options.buttons.optionB}` + ` (${res.percentage['2']})`,
						)
						.setID(id2)
						.setDisabled();
					gameCollector.stop();
					const _embed = new Discord.MessageEmbed()
						.setTitle(options.embed.title)
						.setDescription(
							`A) ${decode(res.questions[0])} (${
								res.percentage['1']
							}) \n**B) ${decode(res.questions[1])} (${res.percentage['2']})**`,
						)
						.setColor(options.embed.color)
						.setFooter(options.embed.footer);
					if (options.embed.timestamp) {
						_embed.setTimestamp();
					}
					think.edit({
						embed: _embed,
						components: [{ type: 1, components: [btn, btn2] }],
					});
				}
			});
		});
};
