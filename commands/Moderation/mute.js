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
    name: "mute",
    category: "Moderation",
    description: "Mute a member",
    usage:"!mute <@user> <reason>",
    run: async (client, message, args) => {
        
        let hasPermission = message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Owner' || role.name === 'Moderator')
        if (!hasPermission)
            return message.reply('⛔ You don\' have permission to do so! ⛔').then(m => m.delete({
                timeout: 5000
            }));


        let mMember = ''

        if (message.mentions.members.first())
            mMember = getMember(message, args.join(" "))


        if (!mMember)
            return message.reply('You didn\'t mention a person!').then(m => m.delete({
                timeout: 5000
            }));


        if (!args[1])
            return message.reply('Please provide a reason for the mute!').then(m => m.delete({
                timeout: 5000
            }));


            let muteRole = ''
            muteRole = message.guild.roles.fetch('697878876759785522')
            

            const logChannel = message.guild.channels.cache.find(ch => ch.name === 'logs');

            const embed = new MessageEmbed()
            .setColor(`#ff0000`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Muted member", mMember.user.displayAvatarURL())
            .setDescription(stripIndents `**> Member :** ${mMember.user} (${mMember.user.id})
                        **> Muted By:** ${message.member} (${message.member.id})
                        **> Muted In:** ${message.channel}
                        **> Reason:** ${args.slice(1).join(" ")}`)



                
            mMember.roles.add(process.env.MUTE_ID).then(()=>{
                message.delete()
                mMember.send(`Hello , you have been muted in ${message.guild.name} for : ${args[1]}`)
                logChannel.send(embed)
            })





        

         
    }

}