# Example for Snake

```js
await Snake({
	message: message,
	embed: {
		title: 'Snake | Weky Development',
		description: 'GG, you scored **{{score}}** points!',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	emojis: {
		empty: '⬛',
		snakeBody: '🟩',
		food: '🍎',
		up: '⬆️',
		right: '⬅️',
		down: '⬇️',
		left: '➡️',
	},
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttonText: 'Cancel'
});
```
