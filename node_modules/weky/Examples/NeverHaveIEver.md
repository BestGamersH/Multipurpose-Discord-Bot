# Example for Never Have I Ever

```js
await NeverHaveIEver({
	message: message,
	embed: {
		title: 'Never Have I Ever | Weky Development',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	buttons: { optionA: 'Yes', optionB: 'No' }
});
```