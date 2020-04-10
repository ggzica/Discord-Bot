const {
    MessageEmbed
} = require('discord.js');
const {
    stripIndents
} = require('common-tags');
const {
    promptMessage
} = require('../../functions');


module.exports = {
    name: "kick",
    category: "Moderation",
    description: "Kicks the member",
    usage: "!kick <@user> <reason>",
    run: async (client, message, args) => {

        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));



        const logChannel = message.guild.channels.cache.find(ch => ch.name === 'logs') || message.channel;
        let kMember = '';

        if (message.mentions.members.first())
            kMember = message.mentions.members.first()



        if (!kMember)
            return message.reply('You didn\'t mention a person!').then(m => m.delete({
                timeout: 5000
            }));

        if (kMember.user.id === message.author.id)
            return message.reply('You Can\'t kick yourself!').then(m => m.delete({
                timeout: 5000
            }));

        if (!args[1])
            return message.reply('Please provide a reason for the kick!').then(m => m.delete({
                timeout: 5000
            }));

        const embed = new MessageEmbed()
            .setColor(`#ff0000`)
            .setThumbnail(kMember.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setDescription(stripIndents `**> Kicked Member :** ${kMember.user} (${kMember.user.id})
                        **> Kicked By:** ${message.member} (${message.member.id})
                        **> Reason:** ${args.slice(1).join(" ")}`)


        const promptEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor("This verification becomes invalid after 30s")
            .setDescription(`Do you want to kick ${kMember.user}?`)

        message.channel.send(promptEmbed).then(async msg =>{
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"])

            if(emoji === "✅")
            {
                msg.delete();

                kMember.kick(args.slice(1).join(" "))
                .catch(err=>{
                    console.log(err)
                })

                logChannel.send(embed)
            }
            else if(emoji === "❌"){
                msg.delete();
                message.reply('Kick Canceled').then(m => m.delete({
                    timeout: 5000
                }));
            }
        })


    }
}