const fetch = require('node-fetch');
const { createCanvas } = require('canvas');
const { MessageAttachment } = require('discord.js');
const config = require('/home/vboxuser/Multipurpose-Discord-Bot-1/data/quotes.json');

module.exports = {
  name: 'stock',
  category: 'Finance',
  aliases: [],
  usage: 'stock <stock>',
  description: 'Fetches information about a stock and displays a 24-hour price chart.',
  type: 'bot',

  run: async (client, message, args) => {
    try {
      const apiKey = config.apiKey;
      const stockSymbol = args[0];

      if (!stockSymbol) return message.reply('Please provide a stock symbol.');

      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=example`);
      const data = await response.json();

      if (!data['Global Quote'] || !data['Global Quote']['01. symbol'])
        return message.reply('Stock data not found.');

      const stockInfo = data['Global Quote'];
      const response24h = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=example`);
      const data24h = await response24h.json();

      if (!data24h['Time Series (5min)'])
        return message.reply('No intraday data available.');

      const prices24h = Object.values(data24h['Time Series (5min)']);
      const prices24hArray = prices24h.map(item => parseFloat(item['4. close']));
      const maxPrice = Math.max(...prices24hArray);
      const minPrice = Math.min(...prices24hArray);

      const canvas = createCanvas(800, 500);
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#272727'; // Dark background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff'; // Title color
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Stock Info for ${stockInfo['01. symbol']}`, 20, 40);

      ctx.font = '16px Arial';
      let yPos = 90;
      ctx.fillText(`Open Price: ${stockInfo['02. open']}`, 20, yPos);
      ctx.fillText(`High Price: ${stockInfo['03. high']}`, 20, (yPos += 25));
      ctx.fillText(`Low Price: ${stockInfo['04. low']}`, 20, (yPos += 25));
      ctx.fillText(`Current Price: ${stockInfo['05. price']}`, 20, (yPos += 25));
      ctx.fillText(`Volume: ${stockInfo['06. volume']}`, 20, (yPos += 25));

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(20, 180);
      ctx.lineTo(780, 180);
      ctx.stroke();

      const chartWidth = 700;
      const chartHeight = 200;
      const chartX = 50;
      const chartY = 200;
      const intervalX = (chartWidth - 20) / prices24hArray.length;
      const intervalLabel = Math.floor(prices24hArray.length / 10);

      ctx.beginPath();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;

      ctx.moveTo(chartX, chartY + chartHeight);
      ctx.lineTo(chartX, chartY);

      for (let i = 0; i < prices24hArray.length; i++) {
        const x = chartX + (i * intervalX);
        const y = chartY + chartHeight - ((prices24hArray[i] - minPrice) / (maxPrice - minPrice)) * chartHeight;

        ctx.lineTo(x, y);
        ctx.stroke();

        if (i % intervalLabel === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${prices24hArray[i].toFixed(2)}`, x - 10, y - 5);
        }
      }

      const attachment = new MessageAttachment(canvas.toBuffer(), 'stock_info.png');
      return message.channel.send({ files: [attachment] });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return message.reply('An error occurred while fetching stock data.');
    }
  },
};
