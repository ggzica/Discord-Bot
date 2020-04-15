
const {
    MessageEmbed
} = require('discord.js');

const {
    promptMessage
} = require('../../functions');


module.exports = {
    name: "poll",
    category: "Fun",
    description: "Create a poll",
    usage : "!poll <question>",
    run: async (client, message , args) => {

        
        if(args.length === 0) 
        return message.reply('Please provide data for the poll!').then(m => m.delete({
            timeout: 5000
        }));



        const promptEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`Poll`)
        .setDescription(`${args.join(" ")}`)
        .setFooter(`Asked by ${message.member.displayName}`)


        message.channel.send(promptEmbed).then(async msg =>{
           promptMessage(msg, message.author, 30,  ["✅", "❌"])
        })



    }
}
