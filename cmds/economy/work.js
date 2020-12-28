module.exports.run = async (message, args, client) => {
    let amount = Math.floor(Math.random() * 261) + 19
    let odp = [
        client.lang.handle(message, 'You robbed an old lady of ', 'Okradłeś starszą kobietę z '),
        client.lang.handle(message, 'You write the website code. You earn', 'Napisałeś kod strony internetowej. Zarabiasz '),
        client.lang.handle(message, 'You helped an elderly neighbor with groceries. You got from her ', 'Pomogłeś starszej sąsiadce przy noszeniu zakupów. Dostałeś od niej '),
        client.lang.handle(message, 'You are done writing the frontend of the page. The boss paid you ', 'Skończyłeś pisać frontend strony. Szef wypłacił ci '),
        client.lang.handle(message, 'You have prepared the website code. After analysis, the co-owner paid you ', 'Przygotowałeś kod strony WWW. Po analizie współwłaściciel wypłacił ci '),
        client.lang.handle(message, 'You blew up the IMG vault and found it there ', 'Wysadziłeś skarbiec IMG i znalazłeś tam ')
    ]
    client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash') + amount), 'cash')
    client.embeds.successWithCustomColor(message, '#fffb52', '<:money:789101191194738688> Work', `${odp[Math.floor(Math.random() * odp.length)]}${amount}$`)
}
module.exports.help = {
    name: 'work',
    descriptionpl: 'Zarób pieniądze w ekonomii',
    descriptionen: 'Work in economy',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['zarob', 'zarabiaj'],
    cooldown: 120
}