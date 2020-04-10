const {
    MessageEmbed
} = require('discord.js');


module.exports = {
    name: "say",
    category: "Moderation",
    description: "Says input via the bot",
    usage: "!say <text | embed text>",
    run: async (client, message, args) => {

        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner' || role.name === 'Moderator')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));

        if (args.length < 1)
            return message.reply("Nothing To Say").then(m => m.delete({
                timeout: 5000
            }));



        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor('#0099ff')

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(" "));
        }

    }
}