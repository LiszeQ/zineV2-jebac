module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    client.musicPlayer.stop(message.guild.id)
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Stopped', 'Zatrzymano'), client.lang.handle(message, 'Stopped player.', 'Zatrzymano odtwarzacz.'))
}
module.exports.help = {
    name: 'stop',
    descriptionpl: 'Stopuje odtwarzacz.',
    descriptionen: 'Stops player.',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['zatrzymaj'],
}