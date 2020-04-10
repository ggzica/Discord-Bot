
const {
    MessageEmbed
} = require('discord.js');
const {
    getMember} = require('../../functions');
var validUrl = require('valid-url');
const fs = require('fs');

module.exports = {
    name: "git",
    category: "Info",
    description: "add github or equivalent link. (make sure to add https:// or http://)",
    usage: "!git <link>",
    run: async (client, message, args) => {
        var url = args[0]
        if(!validUrl.isUri(url))
        return message.reply('Link is wrong. Make sure to add http:// or https://').then(m => m.delete({
            timeout: 5000
        }));

    
        let memberGit = {
            id : message.member.id,
            gitURL : url
        }


        let data = JSON.stringify(memberGit)
        
        const embed = new MessageEmbed()
        .setDescription(`The following URL: ${url} has been added to your profile.`)
        
        fs.writeFile('./data/git.json',data,(done,err)=>{
            if(err) console.log(err)
            else message.channel.send(embed)
            })


    }
}
