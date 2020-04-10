
const {
    MessageEmbed
} = require('discord.js');

const {
    stripIndents
} = require('common-tags');
const {
    getMember,
    formatDate
} = require('../../functions');


module.exports = {
    name: "ban",
    category: "Moderation",
    description: "Ban a user for lifetime or an amount of time",
    usage : "!ban <@user> <reason>",
    run: async (client, message , args) => {

        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner' || role.name === 'Moderator')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));


        let bMember = ''

        if (message.mentions.members.first())
            bMember = getMember(message, args.join(" "))


        if (!bMember)
            return message.reply('You didn\'t mention a person!').then(m => m.delete({
                timeout: 5000
            }));


        if (!args[1])
            return message.reply('Please provide a reason for the mute!').then(m => m.delete({
                timeout: 5000
            }));

       
        const logChannel = message.guild.channels.cache.find(ch => ch.name === 'logs');


        const embed = new MessageEmbed()
        .setColor(`#ff0000`)
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL)
        .setAuthor("Banned member", bMember.user.displayAvatarURL())
        .setDescription(stripIndents `**> Member :** ${bMember.user} (${bMember.user.id})
                    **> Banned By:** ${message.member} (${message.member.id})
                    **> Reason:** ${args.slice(1).join(" ")}`)

        bMember.send(`Hello , you have been banned from ${message.guild.name} , Reason : ${args[1]}`)
        message.guild.memebrs.ban(bMember)
      
      
        logChannel.send(embed)
       
    }

}
