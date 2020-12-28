module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    else if (args[0] === 'on') {
        client.musicPlayer.setRepeatMode(message.guild.id, true)
        return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully enabled loop', 'Pomyślnie włączono powtarzanie utworu'))
    } else if (args[0] === 'off') {
        client.musicPlayer.setRepeatMode(message.guild.id, false)
        return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully disabled loop', 'Pomyślnie wyłączono powtarzanie utworu'))
    } else return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
}
module.exports.help = {
    name: 'loop',
    descriptionpl: 'Powtarza aktualnie graną piosenkę',
    descriptionen: 'Loop actually playing music',
    usagepl: 'loop <on / off>',
    usageen: 'loop <on / off>',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['l'],
}