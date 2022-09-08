<p align="center"><img width="100px"
   style="margin-bottom:-6px" src="https://cdn.discordapp.com/avatars/809496186905165834/7dbf02cb782c7111b817f329cac0257a.png" /></p>
<h1 align="center">Weky</h1>
<p align="center">
   <a href="https://www.npmjs.com/package/weky"><img src="https://img.shields.io/npm/v/weky.svg?style=flat-square" /></a>
   <a href="https://weky-docs.js.org/"><img src="https://img.shields.io/badge/Documentation-Yes-amiajokegreen.svg?style=flat-square" /></a>
   <a href="https://github.com/WekyDev/weky-npm/blob/main/LICENSE"><img src="https://nuggies.js.org/assets/img/license.ade17f5e.svg" /></a>
   <br>
   <a href="https://www.npmjs.com/package/weky"><img src="https://nodei.co/npm/weky.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a>
</p>

## What is weky?
- A fun npm package to play games within Discord with buttons!
- looking for examples? click here: [Examples](https://github.com/WekyDev/weky-npm/tree/main/Examples)

## Features
- 🧑 Beginner friendly
- 🎉 Easy to use
- ✨ Simple
- 🔘 Discord Buttons
- 🤖 Supports Discord.js V13 and V12
- and much more!

## Install the package 📥
```sh
npm install weky
```

## Usage 📚
```js
const { Calculator } = require("weky");
await Calculator({
    message: message,
    embed: {
        title: 'Calculator | Weky Development',
        color: '#5865F2',
        footer: '©️ Weky Development',
        timestamp: true
    },
    disabledQuery: 'Calculator is disabled!',
    invalidQuery: 'The provided equation is invalid!',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
```

## Example ✏️
#### Discord.js v12.5.3
```js
const Discord = require('discord.js');
require('@weky/inlinereply');
const client = new Discord.Client();
const disbut = require('discord-buttons');
const { Calculator } = require('weky');
disbut(client);

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
	if(message.content === '!calculator') {
		await Calculator({
			message: message,
			embed: {
				title: 'Calculator | Weky Development',
				color: '#5865F2',
				footer: '©️ Weky Development',
				timestamp: true,
			},
			disabledQuery: 'Calculator is disabled!',
			invalidQuery: 'The provided equation is invalid!',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}
});

client.login('DISCORD_BOT_TOKEN');
```

#### Discord.js v13.1.0
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const { Calculator } = require('weky');

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
	if (message.content === '!calculator') {
		await Calculator({
			message: message,
			embed: {
				title: 'Calculator | Weky Development',
				color: '#5865F2',
				footer: '©️ Weky Development',
				timestamp: true,
			},
			disabledQuery: 'Calculator is disabled!',
			invalidQuery: 'The provided equation is invalid!',
			othersMessage: 'Only <@{{author}}> can use the buttons!',
		});
	}
});

client.login('DISCORD_BOT_TOKEN');
```
## Result 📤
<img src="https://i.imgur.com/DEdhHHd.png">

## Contributing 🤝
- Contributions, issues and feature requests are welcome!
- Feel free to check **[issues page](https://github.com/WekyDev/weky-npm/issues)**.

## Developers 👨‍💻
- **[Face#5454](https://github.com/face-hh)**
- **[Sujal Goel#7602](https://github.com/sujalgoel)**
- **[rayz#4986](https://github.com/rayzdev)**

## Support ❔
<a href="https://discord.gg/ANzBrkcXZy"><img src="https://invidget.switchblade.xyz/ANzBrkcXZy" /></a>