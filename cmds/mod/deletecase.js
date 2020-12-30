module.exports.run = async (message, args, client) => {
    let num = args[0]
    function checkNumber(n) { return !isNaN(n) && !isNaN(parseFloat(n)) }
    if (!checkNumber(num) || num === 0) return client.embeds.error(message, client.lang.handle(message, 'Please type valid infraction number', 'Podaj prawidłowy numer case'))
    else if (!client.infractions.get(`${num}_on_${message.guild.id}`)) return client.embeds.error(message, client.lang.handle(message, 'This case does not exist', 'Ten case nie istnieje na tym serwerze'))
    else if (client.infractions.get(`${num}_on_${message.guild.id}`, 'deleted')) return client.embeds.error(message, client.lang.handle(message, 'This case does not exist', 'Ten case nie istnieje na tym serwerze'))
    else {
        // Created by lambda v1, by sebt08 and Aleks1123
// Sador to podjebal od nas lmao
// Kod jest slaby, stary ale nadal nasz
        client.infractions.set(`${num}_on_${message.guild.id}`, true, 'deleted')
        client.base.set(message.guild.id, Math.floor(parseInt(client.base.get(message.guild.id, 'totalCases')) + 1), 'totalCases')
        client.embeds.successWithTick(message, client.lang.handle(message, 'Deleted case', 'Usunięto case'), client.lang.handle(message, `Successfully deleted case **#${num}**.`, `Pomyślnie usunięto case **#${num}**.`))
    }
}
module.exports.help = {
    name: 'deletecase', 
    descriptionpl: 'Usuwa infrakcje użytkownika',
    descriptionen: 'Deletes user infraction',
    usagepl: 'deletecase <numer>',
    usageen: 'deletecase <number>',
    category: 'Moderacja'
}
module.exports.conf = {
    aliases: ['dc'],
}
