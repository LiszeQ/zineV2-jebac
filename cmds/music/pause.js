module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    let s = await client.musicPlayer.pause(message.guild.id)
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Paused', 'Zapauzowano'), client.lang.handle(message, `Paused ${s.name}.`, `Zapauzowano ${s.name}.`))
}
module.exports.help = {
    name: 'pause',
    descriptionpl: 'Pauzuje piosenkę.',
    descriptionen: 'Pauses song.',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
}