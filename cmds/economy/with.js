module.exports.run = async (message, args, client) => {
    let money = args[0]
    if (!money) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else {
        function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
        if (money === 'all') {
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank')) === 0) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have money in your bank balance', 'Nie posiadasz pieniędzy w banku'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank') + client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')), 'cash')
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, 0, 'bank')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Withdraw', 'Wypłata'), client.lang.handle(message, 'Successfully withdrawed all of your money to bank.', 'Pomyślnie wypłacono wszystkie twoje pieniądze z banku.'))
        }
        else {
            if (!checkN(money) || money <= 0 || money.includes('-') || money.includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            if (parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank')) < parseInt(money)) return client.embeds.error(message, client.lang.handle(message, 'You don\'t have that much money in your bank balance', 'Nie posiadasz tyle pieniędzy w banku'))
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash') + parseInt(money)), 'cash')
            client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank') - parseInt(money)), 'bank')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Withdraw', 'Wypłata'), client.lang.handle(message, `Successfully withdrawed ${money}$ from bank.`, `Pomyślnie wypłacono ${money}$ z banku.`))
        }
    }
}
module.exports.help = {
    name: 'with',
    descriptionpl: 'Wypłaca pieniądze z banku',
    descriptionen: 'Withdraws money from bank',
    usagepl: 'with <ilość pieniędzy | all>',
    usageen: 'with <money amount | all>',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['withdraw']
}