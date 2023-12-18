const fs = require('fs').promises;

// Path to the JSON file
const quotesPath = '/home/vboxuser/Multipurpose-Discord-Bot-1/data/quotes.json';

// Load quotes from the JSON file
let quotes = {};
try {
  quotes = require(quotesPath);
} catch (error) {
  console.error('Error loading quotes:', error.message);
}

module.exports = {
  name: 'addquote',
  category: 'Quotes',
  aliases: ["aq",],
  usage: 'addquote [message]',
  description: 'Adds a message to the quote database.',
  type: 'bot',

  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      const quote = args.join(' ');
      if (!quote)
        return message.reply('Please provide a message to add to the quotes.');

      // Store the quote with the author's ID as the key
      quotes[message.author.id] = quote;

      // Save quotes to the JSON file
      await fs.writeFile(quotesPath, JSON.stringify(quotes, null, 2));

      return message.reply('Quote added successfully!');
    } catch (error) {
      console.error('Error adding quote:', error.message);
      return message.reply('An error occurred while adding the quote.');
    }
  },
};
