const axios = require('axios');

module.exports = {
  name: 'shortenurl',
  category: '🔗 Utilities',
  aliases: [],
  usage: 'shortenurl [URL]',
  description: 'Generates a shortened URL for the provided link.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const originalUrl = args[0];

      if (!originalUrl || !isValidURL(originalUrl)) {
        return message.reply('Please provide a valid URL.');
      }

      // TinyURL API endpoint for shortening URLs
      const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`;

      // Make a GET request to the TinyURL API
      const response = await axios.get(apiUrl);

      const shortenedUrl = response.data;

      // Send the shortened URL as a message
      message.channel.send(`Shortened URL: ${shortenedUrl}`);
    } catch (error) {
      console.error(error);
      return message.reply('An error occurred while shortening the URL.');
    }
  },
};

// Function to validate URL format
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
