# Example for Fight

```js
await Fight({
    message: message,
    opponent: message.mentions.users.first(),
    embed: {
        title: 'Fight | Weky Development',
        color: '#5865F2',
        footer: '©️ Weky Development',
        timestamp: true
    },
    buttons: {
      hit: 'Hit',
      heal: 'Heal',
      cancel: 'Stop',
      accept: 'Accept',
      deny: 'Deny'
    },
    acceptMessage: '<@{{challenger}}> has challenged <@{{opponent}}> for a fight!',
    winMessage: 'GG, <@{{winner}}> won the fight!',
    endMessage: '<@{{opponent}}> didn\'t answer in time. So, I dropped the game!',
    cancelMessage: '<@{{opponent}}> refused to have a fight with you!',
    fightMessage: '{{player}} you go first!',
    opponentsTurnMessage: 'Please wait for your opponents move!',
    highHealthMessage: 'You cannot heal if your HP is above 80!',
    lowHealthMessage: 'You cannot cancel the fight if your HP is below 50!',
    returnWinner: false,
    othersMessage: 'Only {{author}} can use the buttons!'
});
```