module.exports.run = async (message, args, client) => {
    const msgID = args[0]
    if (!msgID) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!client.giveaways.giveaways.filter(g => g.messageID === msgID)[0]) return client.embeds.error(message, client.lang.handle(message, 'Check your message ID', 'Podaj prawidłowe ID wiadomości'))
    else if (!client.giveaways.giveaways.filter(g => g.messageID === msgID)[0].ended) return client.embeds.error(message, client.lang.handle(message, 'This giveaway is not ended', 'Ten giveaway jeszcze się nie zakończył'))
    else {
        client.giveaways.reroll(msgID, {
            messages: {
                congrat: client.lang.handle(message, ':tada: New winners: **{winners}**!', ':tada: Nowymi zwycięzcami są: **{winners}**!'),
                error: client.lang.handle(message, ':no_entry_sign: Nobody took part in the contest or too few people reacted!', ':no_entry_sign: Nikt nie wziął udziału w konkursie lub zareagowała za mała ilość osób!')
            }
        })
        const emotka = client.emojis.cache.get('766927244563447848')
        await message.react(emotka)
    }
}
module.exports.help = {
    name: 'greroll',
    descriptionpl: 'Rerolluje konkurs',
    descriptionen: 'Rerolls giveaway',
    usageen: 'greroll <giveaway message ID>',
    usagepl: 'greroll <ID konkursowej wiadomości>',
    category: 'Giveaway',
}
module.exports.conf = {
    aliases: ['rerolluj'],
    cooldown: 10,
    permsLevel: 3
}