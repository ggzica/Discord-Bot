
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: "clear",
    category: "Moderation",
    description: "Clears the chat",
    usage : "!clear <1-100>",
    run: async (client, message , args) => {
        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner' || role.name === 'Moderator')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));    
            
        if(isNaN(args[0]) || parseInt(args[0]) <= 0)
                return message.reply(`Wrong Number!`).then(m => m.delete({
                    timeout: 5000
                })); 



            let deleteAmmount;

            if(parseInt(args[0]) > 100)
                deleteAmmount = 100;
            else deleteAmmount = parseInt(args[0]);

            message.channel.bulkDelete(deleteAmmount,true)
                            .then(deleted=>message.channel.send(`I deleted \`${deleted.size}\` messages.`))
                            .catch(err=>message.reply(`Something Went Wrong ${err}`))
    }

    

}
