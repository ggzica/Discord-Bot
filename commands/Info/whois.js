const {
    getMember,
    formatDate
} = require('../../functions');
const {
    MessageEmbed
} = require('discord.js');
const {
    stripIndents
} = require('common-tags');

module.exports = {
    name: "whois",
    category: "Info",
    description: "Returns User Info",
    usage:"!whois [@user]",
    run: async (client, message, args) => {


        //need to fix !whois @roles
        const member = getMember(message, args.join(" "))


        const joined = formatDate(member.joinedAt);

        const roles = member.roles.cache
            .filter(r => r.id != message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        const created = formatDate(member.user.createdAt)

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL(0))
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Member information:', stripIndents `**> Display name:** ${member.displayName}
                **> Joined at:** ${joined}
                **> Roles:** ${roles}`, true)

            .addField('User information:', stripIndents `**> ID:** ${member.user.id}
                **> Username**: ${member.user.username}
                **> Tag**: ${member.user.tag}
                **> Created at**: ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField("Currently Playing", `**>Name:** ${member.user.presence.game.name}`)

        message.channel.send(embed);
    }

}