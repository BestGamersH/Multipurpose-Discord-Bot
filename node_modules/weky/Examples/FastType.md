# Example for Fast Type

```js
await FastType({
    message: message,
    embed: {
        title: 'FastType | Weky Development',
        description: 'You have **{{time}}** to type the below sentence.',
        color: '#5865F2',
        footer: '©️ Weky Development',
        timestamp: true
    },
    sentence: 'This is a sentence!',
    winMessage: 'GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.',
    loseMessage: 'Better luck next time!',
    cancelMessage: 'You ended the game!',
    time: 60000,
    buttonText: 'Cancel',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
```