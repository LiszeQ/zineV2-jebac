module.exports.run = async (message, args, client) => {
    const czas = args[0]
    const kanal = message.mentions.channels.first()
    const zwycięzcy = String(args[2])
    const nagroda = args.slice(3).join(' ')
    function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
    if (
      !czas || !kanal && !args[1] || !zwycięzcy || !nagroda
    ) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!kanal && args[1]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel', 'Nie znaleziono takiego kanału'))
    else if (!zwycięzcy.endsWith('w')) return client.embeds.argsError(message, 'Argument \`<winners count>\` must end in \`w\` (winners)', 'Argument \`<liczba zwycięzców>\` musi być zakończony na \`w\` (liczba zwycięzców)')
    else if (zwycięzcy.replace('w', '').length > 2) return client.embeds.error(message, client.lang.handle(message, 'You cannot enter more than 99 winners', 'Nie możesz podać liczby zwycięzców większej niż 99'))
    else if (zwycięzcy.endsWith('w') && !checkN(zwycięzcy.replace('w', '')) && zwycięzcy.replace('w', '').length === 0) return client.embeds.error(message, client.lang.handle(message, 'Argument \`<winners count>\` must end in \`w\` (winners)', 'Argument \`<liczba zwycięzców>\` musi być zakończony na \`w\` (liczba zwycięzców)'))
    else if (czas.endsWith('m') && czas.replace('m', '') > 10080 || czas.endsWith('h') && czas.replace('h', '') > 168 || czas.endsWith('d') && czas.replace('d', '') > 7) client.embeds.error(message, client.lang.handle(message, 'You cannot create giveaways longer than a week', 'Nie możesz tworzyć konkursów dłuższych niż tydzień'))
    else if (!(require('better-ms')).getMilliseconds(czas)) return client.embeds.error(message, client.lang.handle(message, 'Please enter the correct time', 'Podaj prawidłowy czas'))
    else {
        client.giveaways.start(kanal, {
          time: (require('better-ms')).getMilliseconds(czas),
          prize: nagroda,
          winnerCount: zwycięzcy.replace('w', ''),
          hostedBy: message.author,
          messages: {
              giveaway: client.lang.handle(message, ':tada: **New giveaway**', ':tada: **Nowy giveaway**'),
              giveawayEnded: client.lang.handle(message, ':tada: **Giveaway ended!**', ':tada: **Konkurs został zakończony!**'),
              timeRemaining: client.lang.handle(message, 'Giveaway ends at: **{duration}**', 'Giveaway zostanie zakończony za: **{duration}**'),
              inviteToParticipate: client.lang.handle(message, 'To join the giveaway, add a reaction :tada:.', 'Aby dołączyć do konkursu dodaj reakcję :tada:.'),
              winMessage: client.lang.handle(message, ':tada: Congratulations {winners}, you win the **{prize}**!', ':tada: Gratulacje {winners}, wygrałeś / -liście **{prize}**!'),
              noWinner: client.lang.handle(message, 'Nobody took part in the contest or too few people reacted!', 'Nikt nie wziął udziału w konkursie lub zareagowała za mała ilość osób!'),
              embedFooter: client.lang.handle(message, 'This giveaway are managed by Zine', 'Ten konkurs jest obsługiwany przez bota Zine'),
              hostedBy: client.lang.handle(message, 'Created by: {user}', 'Stworzony przez {user}'),
              winners: client.lang.handle(message, 'winners', 'zwycięzcy / ców'),
              endedAt: client.lang.handle(message, 'Giveaways are managed by Zine', 'Konkursy są obsługiwane przez bota Zine'),
              units: {
                  seconds: client.lang.handle(message, 'seconds', 'sekund'),
                  minutes: client.lang.handle(message, 'minutes', 'minut'),
                  hours: client.lang.handle(message, 'hours', 'godzin'),
                  days: client.lang.handle(message, 'days', 'dni'),
                  pluralS: false
              },
          }
      })
    message.channel.send(client.lang.handle(message, `Successfully created new giveaway on ${kanal}.`, `Pomyślnie stworzono nowy konkurs na kanale ${kanal}.`));
  }
}
module.exports.help = {
    name: 'giveaway',
    descriptionpl: 'Tworzy konkurs',
    descriptionen: 'Creates giveaway',
    usageen: 'giveaway <time, e.g. 3h45m> <channel> <winners count> <prize>',
    usagepl: 'giveaway <czas, np. 3h45m> <kanał> <liczba zwycięzców> <nagroda>',
    category: 'Giveaway',
}
module.exports.conf = {
    aliases: ['gstart'],
    cooldown: 50,
    permsLevel: 3
}