module.exports.run = async (message, args, client) => {
    if (!args.join(' ')) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!message.member.voice.channel) return client.embeds.error(message, client.lang.handle(message, 'You are not on voice channel', 'Nie jesteś na kanale głosowym'))
    else {
        if (client.musicPlayer.isPlaying(message.guild.id)) {
            await client.musicPlayer.addToQueue(message.guild.id, args.join(' '), {}, message.member).then(song => {
                return client.embeds.successWithTick(message, client.lang.handle(message, 'Added to queue', 'Dodano do kolejki'), client.lang.handle(message, `Added ${song.song.name} (duration: ${song.song.duration}) to queue`, `Dodano ${song.song.name} (czas trwania: ${song.song.duration}) do kolejki`))
            }).catch(err => { return client.embeds.error(message, client.lang.handle(message, 'Please type valid song name / URL', 'Podaj prawidłową nazwę / URL piosenki')) })
        } else {
            await client.musicPlayer.play(message.member.voice.channel, args.join(' '), {}, message.member).then(song => {
                return client.embeds.successWithTick(message, client.lang.handle(message, 'Playing', 'Teraz gramy'), client.lang.handle(message, `Currently playing ${song.song.name} (duration: ${song.song.duration})`, `Teraz gramy ${song.song.name} (czas trwania: ${song.song.duration})`))
            }).catch(err => { return client.embeds.error(message, client.lang.handle(message, 'Please type valid song name / URL', 'Podaj prawidłową nazwę / URL piosenki')) })
        }
    }
}
module.exports.help = {
    name: 'play',
    descriptionpl: 'Gra utwór na kanale głosowym.',
    descriptionen: 'Plays song on the voice channel',
    usageen: 'play [song name]',
    usagepl: 'play [nazwa piosenki]',
    category: 'Muzyka',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['p', 'graj'],
}