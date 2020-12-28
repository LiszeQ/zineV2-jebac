module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'Queue is empty', 'Kolejka jest pusta'))
    let q = await client.musicPlayer.getQueue(message.guild.id)
    return client.embeds.successWithTick(message, 'Queue', q.songs.map((s, i) => {
        return `${i === 0 ? client.lang.handle(message, `**${i+1}**. ` + '**(Now playing): **', `**${i+1}**. ` + '**(Aktualnie gramy): **') : `**${i+1}**.`} - ${String(s.name).replace('Unknown', 'B/D') || 'B/D'} | ${client.lang.handle(message, 'Author', 'Autor')}: [${s.author.name || 'B/D'}](${s.author.ref || 'B/D'})`
    }).join('\n'))
}
module.exports.help = {
    name: 'queue',
    descriptionpl: 'Pokazuje kolejke muzyki',
    descriptionen: 'Displays music queue',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['q'],
}