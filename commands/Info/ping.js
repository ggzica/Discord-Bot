module.exports = {
    name: "ping",
    category: "Info",
    description: "Returns Latency and API Ping",
    usage:"!help",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging`)

        msg.edit(`🏓 Pong\n Latency is ${Math.floor(msg.createdTimestamp-message.createdTimestamp)}\n API Latency ${Math.round(client.ws.ping)}ms`)
    }
}