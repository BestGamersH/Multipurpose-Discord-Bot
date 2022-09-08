const axios = require('axios');
const chalk = require('chalk');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const words = require('../data/words.json');
const { boxConsole } = require('./boxConsole');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	fetchhtml: async function(url) {
		const options = {
			header: {
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
				referer: 'https://www.google.com/',
			},
		};
		const html = await axios.get(url, options);
		return cheerio.load(html.data);
	},
	getRandomString: function(length) {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(
				Math.floor(Math.random() * randomChars.length),
			);
		}
		return result;
	},
	getRandomSentence: function(length) {
		const word = [];
		for (let i = 0; i < length; i++) {
			word.push(words[Math.floor(Math.random() * words.length)]);
		}
		return word;
	},
	shuffleString: function(string) {
		const str = string.split('');
		const length = str.length;
		for (let i = length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const tmp = str[i];
			str[i] = str[j];
			str[j] = tmp;
		}
		return str.join('');
	},
	convertTime: function(time) {
		const absoluteSeconds = Math.floor((time / 1000) % 60);
		const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
		const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));
		const d = absoluteDays
			? absoluteDays === 1
				? '1 day'
				: `${absoluteDays} days`
			: null;
		const h = absoluteHours
			? absoluteHours === 1
				? '1 hour'
				: `${absoluteHours} hours`
			: null;
		const m = absoluteMinutes
			? absoluteMinutes === 1
				? '1 minute'
				: `${absoluteMinutes} minutes`
			: null;
		const s = absoluteSeconds
			? absoluteSeconds === 1
				? '1 second'
				: `${absoluteSeconds} seconds`
			: null;
		const absoluteTime = [];
		if (d) absoluteTime.push(d);
		if (h) absoluteTime.push(h);
		if (m) absoluteTime.push(m);
		if (s) absoluteTime.push(s);
		return absoluteTime.join(', ');
	},
	shuffleArray: function(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},
	randomHexColor: function() {
		return (
			'#' +
			('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
		);
	},
	WillYouPressTheButton: function() {
		return fetch('https://api2.willyoupressthebutton.com/api/v2/dilemma ', {
			method: 'POST',
		})
			.then((data) => data.json())
			.then((data) => {
				return data.dilemma;
			});
	},
	checkForUpdates: async function() {
		const package = require('../../../package.json');
		const vLatest = require('../package.json').version;
		if (package.dependencies.weky) {
			if (vLatest !== package.dependencies.weky.slice(1)) {
				const msg = chalk(
					`new ${chalk.green('version')} of ${chalk.yellow(
						'weky',
					)} is available! ${chalk.red(
						package.dependencies.weky.slice(1),
					)} -> ${chalk.green(vLatest)}`,
				);
				const tip = chalk(
					`registry ${chalk.cyan('https://www.npmjs.com/package/weky')}`,
				);
				const install = chalk(
					`run ${chalk.green('npm i weky@latest')} to update`,
				);
				boxConsole([msg, tip, install]);
			}
		} else if (package.devDependencies.weky) {
			if (vLatest !== package.devDependencies.weky.slice(1)) {
				const msg = chalk(
					`new ${chalk.green('version')} of ${chalk.yellow(
						'weky',
					)} is available! ${chalk.red(
						package.devDependencies.weky.slice(1),
					)} -> ${chalk.green(vLatest)}`,
				);
				const tip = chalk(
					`registry ${chalk.cyan('https://www.npmjs.com/package/weky')}`,
				);
				const install = chalk(
					`run ${chalk.green('npm i weky@latest')} to update`,
				);
				boxConsole([msg, tip, install]);
			}
		}
	},
	addRow: function(btns) {
		const row = new MessageActionRow();
		for (const btn of btns) {
			row.addComponents(btn);
		}
		return row;
	},
	createButton: function(label, disabled, getRandomString) {
		let style = 'SECONDARY';
		if (label === 'AC' || label === 'DC' || label === '⌫') {
			style = 'DANGER';
		} else if (label === '=') {
			style = 'SUCCESS';
		} else if (
			label === '(' ||
			label === ')' ||
			label === '^' ||
			label === '%' ||
			label === '÷' ||
			label === 'x' ||
			label === '-' ||
			label === '+' ||
			label === '.'
		) {
			style = 'PRIMARY';
		}
		if (disabled) {
			const btn = new MessageButton()
				.setLabel(label)
				.setStyle(style)
				.setDisabled();
			if (label === '\u200b') {
				btn.setCustomId(getRandomString(10));
			} else {
				btn.setCustomId('cal' + label);
			}
			return btn;
		} else {
			const btn = new MessageButton().setLabel(label).setStyle(style);
			if (label === '\u200b') {
				btn.setDisabled();
				btn.setCustomId(getRandomString(10));
			} else {
				btn.setCustomId('cal' + label);
			}
			return btn;
		}
	},
};
