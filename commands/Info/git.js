
const {
    MessageEmbed
} = require('discord.js');
const {
    
    checkIfExisting
} = require('../../functions');
var validUrl = require('valid-url');
const fs = require('fs');
const Git = require('../../models/git.module')

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

        Git.find({
            userID : message.member.id
        },(err,found)=>{
            if(err) console.log(err)
            else{
                if(found.length === 0) createNewEntry(message,message.member.id,url)
                else updateEntry(message,message.member.id,url)
            }
           
        })

       

    }
}

function createNewEntry(message,userID,gitURL){
    let memberGit = new Git({
        userID : userID,
        gitURL : gitURL
    })

    const embed = new MessageEmbed()
    .setDescription(`The following URL: ${gitURL} has been added to your profile.`)

   
    memberGit.save(err=>{
        if(!err) 
        message.channel.send(embed)
        else{
            
            console.log(err)
            return message.reply('There was an error!').then(m => m.delete({
                timeout: 5000
            }));
        }
    })

}

function updateEntry(message,userID,gitURL){

    const embed = new MessageEmbed()
    .setDescription(`The following URL: ${gitURL} has been added to your profile.`)

    Git.findOneAndUpdate({userID : userID} , {gitURL : gitURL},(err,done)=>{
        if(err) console.log(err)
        else {
            message.channel.send(embed)
        }
    })
}