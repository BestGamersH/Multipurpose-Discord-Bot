# Example for Rock Paper Scissors

```js
await RockPaperScissors({
	message: message,
	opponent: message.mentions.users.first(),
	embed: {
		title: 'Rock Paper Scissors | Weky Development',
		description: 'Press the button below to choose your element.',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	buttons: {
		rock: 'Rock',
		paper: 'Paper',
		scissors: 'Scissors',
		accept: 'Accept',
		deny: 'Deny',
	},
	time: 60000,
	acceptMessage:
		'<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
	winMessage: 'GG, <@{{winner}}> won!',
	drawMessage: 'This game is deadlock!',
	endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
	timeEndMessage:
		"Both of you didn't pick something in time. So, I dropped the game!",
	cancelMessage:
		'<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
	choseMessage: 'You picked {{emoji}}',
	noChangeMessage: 'You cannot change your selection!',
	othersMessage: 'Only {{author}} can use the buttons!',
	returnWinner: false
});
```
