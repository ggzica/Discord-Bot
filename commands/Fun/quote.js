
const {
    MessageEmbed
} = require('discord.js');

const Quote = require('inspirational-quotes');
const {
    stripIndents
} = require('common-tags');

module.exports = {
    name: "quote",
    category: "Fun",
    description: "Return a Quote",
    run: async (client, message) => {
       
        const quote = Quote.getQuote();

       const embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .addField('Quote', stripIndents `**> Text:**  ${quote.text} \n 
                        **> Author:**  ${quote.author}`, true)

       message.channel.send(embed);                 
    }
}
