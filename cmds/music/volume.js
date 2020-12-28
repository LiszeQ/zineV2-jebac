module.exports.run = async (message, args, client) => {
    function checkN(n) {
        return !isNaN(n) &&
        !isNaN(parseFloat(n))
    }
    if (!client.musicPlayer.isPlaying(message.guild.id)) return client.embeds.error(message, client.lang.handle(message, 'The player is not playing', 'Muzyka nie jest odtwarzana'))
    else if (!args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (args[0] >= 200 || args[0] <= 0 || !checkN(args[0])) return client.embeds.error(message, client.lang.handle(message, 'Please type valid volume smaller than 200', 'Podaj właściwą wartość mniejszą niż 200'))
    else {
        client.musicPlayer.setVolume(message.guild.id, args[0])
        return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully updated volume', 'Pomyślnie zmieniono głośność utworu'))
    }
}
module.exports.help = {
    name: 'volume',
    descriptionpl: 'Zmienia głośność utworu',
    descriptionen: 'Changes song volume',
    usagepl: 'volume <nowa głośność>',
    usageen: 'volume <new volume>',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['vol'],
}