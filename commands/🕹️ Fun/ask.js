const axios = require('axios');

module.exports = {
  name: 'ask',
  category: '💬 Chat',
  aliases: ['chat'],
  usage: 'ask <question>',
  description: 'Ask a question to BrainShop AI.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const question = args.join(' ')

      const apiEndpoint = `http://api.brainshop.ai/get?bid=178672&key=2EHKmxNFo0NBZcx0&uid=[uid]&msg=${encodeURIComponent(question)}`;

      const response = await axios.get(apiEndpoint);

      const aiResponse = response.data.cnt;

      await message.channel.send(aiResponse);
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while processing your question.');
    }
  },
};