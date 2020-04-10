const {
    MessageEmbed
} = require('discord.js');
const {
    stripIndents
} = require('common-tags');


module.exports = {
    name: "report",
    category: "Moderation",
    description: "Report a member",
    usage:"!report <@user> <reason>",
    run: async (client, message, args) => {
        
        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner' || role.name === 'Moderator')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));


        let rMember = ''

        if (message.mentions.members.first())
            rMember = message.mentions.members.first().user


        if (!rMember)
            return message.reply('You didn\'t mention a person!').then(m => m.delete({
                timeout: 5000
            }));


        if (!args[1])
            return message.reply('Please provide a reason for the report!').then(m => m.delete({
                timeout: 5000
            }));


        const reportChannel = message.guild.channels.cache.find(ch => ch.name === 'reports');


        const embed = new MessageEmbed()
            .setColor(`#ff0000`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.displayAvatarURL())
            .setDescription(stripIndents `**> Member :** ${rMember} (${rMember.id})
                        **> Reported By:** ${message.member} (${message.member.id})
                        **> Reported In:** ${message.channel}
                        **> Reason:** ${args.slice(1).join(" ")}`)

        return reportChannel.send(embed)
    }

}