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
    name: "unmute",
    category: "Moderation",
    description: "Unmute a member",
    usage:"!unmute <@user> <reason> ",
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


        
           const isMuted =  mMember.roles.cache.filter(r => r.id === process.env.MUTE_ID)
                                .map(r => r)
                                .join(", ") || false;

            
            if(!isMuted)
            return message.reply('This user is not muted!').then(m => m.delete({
                timeout: 5000
            }));


            const logChannel = message.guild.channels.cache.find(ch => ch.name === 'logs');

            const embed = new MessageEmbed()
            .setColor(`#ff0000`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Unmuted member", mMember.user.displayAvatarURL())
            .setDescription(stripIndents `**> Member :** ${mMember.user} (${mMember.user.id})
                        **> Unuted By:** ${message.member} (${message.member.id})`)


                
            mMember.roles.remove(process.env.MUTE_ID).then(()=>{
                message.delete()
                mMember.send(`Hello , you have been unmuted in ${message.guild.name} by : ${message.member}`)
                logChannel.send(embed)
            })
 
    }

}