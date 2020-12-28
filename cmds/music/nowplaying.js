module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    let np = await client.musicPlayer.nowPlaying(message.guild.id)
    let bar = await client.musicPlayer.createProgressBar(message.guild.id, '20', '<:dot:785849918584913960>', '<:bar:785850328817729556>')
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Now playing', 'Teraz gramy'), client.lang.handle(message, `Title: ${np.name}\nURL: ${np.url}\nDuration: ${np.duration}\nRequested by: ${np.requestedBy}\n\n${bar}`, `Tytuł: ${np.name}\nURL: ${np.url}\nCzas trwania: ${np.duration}\nWywołał: ${np.requestedBy}\n\n${bar}`))
}
module.exports.help = {
    name: 'nowplaying',
    descriptionpl: 'Pokazuje aktualnie graną piosenkę',
    descriptionen: 'Displays actual playing song',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['np'],
}