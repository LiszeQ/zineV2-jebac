module.exports.run = async (message, args, client) => {
    let money = args[0]
    if (!money) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else {
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        if (money === 'all') {
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')) === 0) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have money in your cash balance', 'Nie posiadasz pieniędzy w kieszeni'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank') + client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')), 'bank')
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, 0, 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Deposit', 'Przelew'), client.lang.handle(message, 'Successfully deposited all of your money to bank.', 'Pomyślnie przelano wszystkie twoje pieniądze do banku.'))
        }
        else {
            if (!checkN(money) || money <= 0 || money.includes('-') || money.includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')) < parseInt(money)) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have that much money in your cash balance', 'Nie posiadasz tyle pieniędzy w kieszeni'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank') + parseInt(money)), 'bank')
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash') - parseInt(money)), 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Deposit', 'Przelew'), client.lang.handle(message, `Successfully deposited ${money}$ to bank.`, `Pomyślnie przelano ${money}$ do banku.`))
        }
    }
}
module.exports.help = {
    name: 'dep',
    descriptionpl: 'Przelewa pieniądze do banku',
    descriptionen: 'Deposits money to bank',
    usagepl: 'dep <ilość pieniędzy | all>',
    usageen: 'dep <money amount | all>',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['deposit']
}