# Example for Lie Swatter

```js
await LieSwatter({
	message: message,
	embed: {
		title: 'Lie Swatter | Weky Development',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	winMessage:
		'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
	loseMessage: 'Better luck next time! It was a **{{answer}}**.',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { true: 'Truth', lie: 'Lie' }
});
```
