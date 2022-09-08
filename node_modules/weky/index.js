/* eslint-disable no-useless-escape */

const flip = require('./data/flip.js');
const tiny = require('./data/tiny.js');
const bent = require('./data/bent.js');
const copy = require('./data/copy.js');
const DJSVersion = require('../../package.json').dependencies['discord.js'] || require('../../package.json').devDependencies['discord.js'];

module.exports = {
	bent: function(str) {
		let c = '';
		for (let a, d = 0, e = str.length; d < e; d++) {
			(a = bent[str.charAt(d)]),
			typeof a == 'undefined' && (a = str.charAt(d)),
			(c += a);
		}
		return c;
	},
	flip: function(str) {
		const c = [];
		for (let a, d = 0, e = str.length; d < e; d++) {
			(a = str.charAt(d)),
			d > 0 &&
				(a == '\u0324' || a == '\u0317' || a == '\u0316' || a == '\u032e')
				? ((a = flip[str.charAt(d - 1) + a]), c.pop())
				: ((a = flip[a]), typeof a == 'undefined' && (a = str.charAt(d))),
			c.push(a);
		}
		return c.reverse().join('');
	},
	mirror: function(str) {
		let c = [];
		const d = [];
		for (let a, e = 0, f = str.length; e < f; e++) {
			(a = str.charAt(e)),
			e > 0 &&
				(a == '\u0308' || a == '\u0300' || a == '\u0301' || a == '\u0302')
				? ((a = copy[str.charAt(e - 1) + a]), c.pop())
				: ((a = copy[a]), typeof a == 'undefined' && (a = str.charAt(e))),
			a == '\n' ? (d.push(c.reverse().join('')), (c = [])) : c.push(a);
		}
		d.push(c.reverse().join(''));
		return d.join('\n');
	},
	randomCase: function(string) {
		let result = '';
		if (!string) throw new TypeError('Weky Error: A string was not specified.');
		if (typeof string !== 'string') {
			throw new TypeError('Weky Error: Provided string is Invalid.');
		}
		for (const i in string) {
			const Random = Math.floor(Math.random() * 2);
			result += Random == 1 ? string[i].toLowerCase() : string[i].toUpperCase();
		}
		return result;
	},
	randomHexColor: function() {
		return (
			'#' +
			('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
		);
	},
	randomizeNumber: function(start, end) {
		if (!start) throw new TypeError('Weky Error: A number was not specified.');
		if (!end) throw new TypeError('Weky Error: A number was not specified.');
		if (typeof start !== 'number' && typeof end !== 'number') {
			throw new TypeError('Weky Error: Provided number data is Invalid');
		}
		const res = Math.floor(Math.random() * (end - start + 1) + start);
		return res;
	},
	randomizeString: function(array) {
		if (!array) throw new TypeError('Weky Error: A array was not specified.');
		if (typeof array !== 'object') {
			throw new TypeError('Weky Error: The provided array is invalid.');
		}
		const res = Math.floor(Math.random() * array.length);
		return array[res];
	},
	reverseText: function(string) {
		return string.split('').reverse().join('');
	},
	tinyCaptial: function(str) {
		let c = '',
			a;
		str = str.toUpperCase();
		for (let d = 0, e = str.length; d < e; d++) {
			(a = tiny[str.charAt(d)]),
			typeof a == 'undefined' && (a = str.charAt(d)),
			(c += a);
		}
		return c;
	},
	vaporwave: function(string) {
		return string
			.replace(/[a-zA-Z0-9!\?\.'";:\]\[}{\)\(@#\$%\^&\*\-_=\+`~><]/g, (char) =>
				String.fromCharCode(0xfee0 + char.charCodeAt(0)),
			)
			.replace(/ /g, '　');
	},
};

if(DJSVersion === '^12.5.3') {
	module.exports = {
		Sudo: require('./src/v12/Sudo'),
		Snake : require('./src/v12/Snake'),
		Fight : require('./src/v12/Fight'),
		Trivia : require('./src/v12/Trivia'),
		FastType : require('./src/v12/FastType'),
		QuickClick : require('./src/v12/QuickClick'),
		ChaosWords : require('./src/v12/ChaosWords'),
		LieSwatter : require('./src/v12/LieSwatter'),
		Calculator : require('./src/v12/Calculator'),
		ShuffleGuess : require('./src/v12/ShuffleGuess'),
		GuessTheNumber : require('./src/v12/GuessTheNumber'),
		NeverHaveIEver : require('./src/v12/NeverHaveIEver'),
		WouldYouRather : require('./src/v12/WouldYouRather'),
		GuessThePokemon : require('./src/v12/GuessThePokemon'),
		RockPaperScissors : require('./src/v12/RockPaperScissors'),
		WillYouPressTheButton : require('./src/v12/WillYouPressTheButton'),
	};
} else {
	module.exports = {
		Sudo: require('./src/v13/Sudo'),
		Snake : require('./src/v13/Snake'),
		Fight : require('./src/v13/Fight'),
		Trivia : require('./src/v13/Trivia'),
		FastType : require('./src/v13/FastType'),
		QuickFind: require('./src/v13/QuickFind'),
		QuickClick : require('./src/v13/QuickClick'),
		ChaosWords : require('./src/v13/ChaosWords'),
		LieSwatter : require('./src/v13/LieSwatter'),
		Calculator : require('./src/v13/Calculator'),
		ShuffleGuess : require('./src/v13/ShuffleGuess'),
		GuessTheNumber : require('./src/v13/GuessTheNumber'),
		NeverHaveIEver : require('./src/v13/NeverHaveIEver'),
		WouldYouRather : require('./src/v13/WouldYouRather'),
		GuessThePokemon : require('./src/v13/GuessThePokemon'),
		RockPaperScissors : require('./src/v13/RockPaperScissors'),
		WillYouPressTheButton : require('./src/v13/WillYouPressTheButton'),
	};
}