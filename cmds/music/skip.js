module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    let s = await client.musicPlayer.skip(message.guild.id)
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Skipped', 'Pominięto'), client.lang.handle(message, `Skipped ${s.name}.`, `Pominięto ${s.name}.`))
}
module.exports.help = {
    name: 'skip',
    descriptionpl: 'Pomija piosenkę.',
    descriptionen: 'Skips song.',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['s'],
}