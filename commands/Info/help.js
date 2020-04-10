
const {
    MessageEmbed
} = require('discord.js');
const {
    stripIndents
} = require('common-tags');


module.exports = {
    name: "help",
    category: "Info",
    description: "Return all commands | or a command",
    usage: "!help [command]",
    run: async (client, message, args) => {
        if(args[0])
        {
            return getCMD(client,message,args[0])
        }
       
        else
        {
            getAll(client,message)
        }
    }
}

function getAll(client,message)
{
    const embed = new MessageEmbed()
                .setColor("RANDOM")

    const commands = (category) =>{
       
        return client.commands
                .filter(cmd=>cmd.category === category)
                .map(cmd => `- \`${cmd.name}\``)
                .join("\n")
    }

    const info = client.categories
            .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}**\n${commands(cat)}`)
            .reduce((string,category)=>string + "\n"+ category)

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client,message,input)
{
    const embed = new MessageEmbed()

    const cmd = client.commands.get(input.toLowerCase())

    let info = `Command Not Found!`

    if(!cmd)
    {
        return message.channel.send(embed.setColor("RED").setDescription(info))
    }

    if(cmd.name) info = `**Command Name:** ${cmd.name}`
    if(cmd.description) info += `\n**Description**: ${cmd.description}`
    if(cmd.usage){
        info += `\n**Usage**: ${cmd.usage}`
        embed.setFooter(`Syntax: <> = required , [] = optional`)
    }

    return message.channel.send(embed.setColor("GRENN").setDescription(info));
}

