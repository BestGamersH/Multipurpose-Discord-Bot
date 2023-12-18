module.exports = {
    name: 'randomnumber',
    category: 'Utility',
    aliases: ['randnum'],
    usage: 'randomnumber',
    description: 'Generates a random number.',
    type: 'bot',
  
    run: async (client, message, args) => {
      const randomNumber = Math.floor(Math.random() * 1000000); // Change 1000 to the maximum number you want
  
      message.channel.send(`🎲 Your random number is: ${randomNumber}`);
    },
  };
  