# Example for Will You Press The Button

````js
await WillYouPressTheButton({
	message: message,
	embed: {
		title: 'Will you press the button? | Weky Development',
		description: '```{{statement1}}```\n**but**\n\n```{{statement2}}```',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	button: { yes: 'Yes', no: 'No' },
	thinkMessage: 'I am thinking',
	othersMessage: 'Only <@{{author}}> can use the buttons!'
});
````
