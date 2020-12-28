module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    let s = await client.musicPlayer.resume(message.guild.id)
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Resumed', 'Wznowiono'), client.lang.handle(message, `Resumed ${s.name}.`, `Wznowiono ${s.name}.`))
}
module.exports.help = {
    name: 'resume',
    descriptionpl: 'Wznawia piosenkę.',
    descriptionen: 'Resume song.',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
}