module.exports.run = async (message, args, client) => {
    client.embeds.successWithCustomColor(message, '#7289da', ':clock1030: Ping', `Ping bota: ${Date.now() - message.createdTimestamp}\nPing API Discorda: ${client.ws.ping}`)
}
module.exports.help = {
    name: 'ping',
    descriptionpl: 'Ping bota i api Discorda.',
    descriptionen: 'Bot API latency.',
    category: 'Bot',
}
module.exports.conf = {
    aliases: ['latency', 'pingapi', 'pingbota'],
}