module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let money = args[1]
    if (!user && !args[0] || !money) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!user && args[0]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else if (user.id === message.author.id) return client.embeds.error(message, client.lang.handle(message, 'You can\'t transfer your money to you', 'Nie możesz przelać pieniędzy samemu sobie'))
    else {
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        if (money === 'all') {
            client.eco.ensure(`${user.id}_on_${message.guild.id}`, {
                user: `${user}`,
                guild: message.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')) === 0) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have money in your cash balance', 'Nie posiadasz pieniędzy w kieszeni'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, 0, 'cash')
            client.eco.set(`${user.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash') + parseInt(money)), 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Transfer', 'Przelew'), client.lang.handle(message, `Successfully transfered all of your money to ${user}.`, `Pomyślnie przelano wszystkie twoje pieniądze do użytkownika ${user}.`))
        }
        else {
            client.eco.ensure(`${user.id}_on_${message.guild.id}`, {
                user: `${user}`,
                guild: message.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            if (!checkN(money) || money <= 0 || money.includes('-') || money.includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')) < parseInt(money)) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have that much money in your cash balance', 'Nie posiadasz tyle pieniędzy w kieszeni'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash') - parseInt(money)), 'cash')
            client.eco.set(`${user.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash') + parseInt(money)), 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Transfer', 'Przelew'), client.lang.handle(message, `Successfully transfered ${money}$ to ${user}.`, `Pomyślnie przelano ${money}$ do użytkownika ${user}.`))
        }
    }
}
module.exports.help = {
    name: 'pay',
    descriptionpl: 'Przelewa pieniądze do użytkownika',
    descriptionen: 'Pay money to user',
    usagepl: 'pay <user> <ilość pieniędzy | all>',
    usageen: 'pay <user> <money amount | all>',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['transfer']
}