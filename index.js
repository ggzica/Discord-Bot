require('dotenv').config();
const fs = require('fs');
const Discord = require("discord.js");
const ascii = require("ascii-table");
const Mongoose =require('mongoose');


// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

//Discord Client
const client = new Discord.Client();


//Client Commands Collection
client.commands = new Discord.Collection();
client.categories = new Discord.Collection();


//Commands Handler
fs.readdirSync('./commands').filter(dir => {
    client.categories.set(dir,dir)
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
            table.addRow(file, '✅');
        } else {
            table.addRow(file, `❌`);
            continue;
        }
    }

});

//Show ASCII Table of Modules Loaded
console.log(table.toString());


Mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true , useUnifiedTopology : true , useFindAndModify : false})
Mongoose.connection.on('error',err=>console.log(err))




client.on("ready", () => {
    console.log(`I'm Online , my name is ${client.user.username}`)

    client.user.setPresence({
        status: "online",
        activity: {
            name: "Me Getting Developed",
            type: "WATCHING"
        }
    })
})

client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();


    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (command)
        command.run(client, message, args);

})

client.login(process.env.TOKEN);