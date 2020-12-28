module.exports.run = async (message, args, client) => {
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'Queue is empty', 'Kolejka jest pusta'))
    await client.musicPlayer.clearQueue(message.guild.id)
    return client.embeds.successWithTick(message, client.lang.handle(message, 'Cleared queue', 'Wyczyszczono kolejkę'), client.lang.handle(message, 'Successfully cleared queue.', 'Pomyślnie wyczyszczono kolejkę.'))
}
module.exports.help = {
    name: 'clearqueue',
    descriptionpl: 'Czyści kolejkę',
    descriptionen: 'Cleares queue',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['cq'],
}