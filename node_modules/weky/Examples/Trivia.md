# Example for Trivia

```js
await Trivia({
	message: message,
	embed: {
		title: 'Trivia | Weky Development',
		description: 'You only have **{{time}}** to guess the answer!',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	difficulty: 'hard',
	thinkMessage: 'I am thinking',
	winMessage:
		'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
	loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
	emojis: {
		one: '1️⃣',
		two: '2️⃣',
		three: '3️⃣',
		four: '4️⃣',
	},
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	returnWinner: false
});
```
