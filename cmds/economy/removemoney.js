module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let money = args[1]
    if (!user && !args[0] || !money) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!user && args[0]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else {
        if (args[1].includes('--bank') || args[2] && args[2].includes('--bank')) {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            client.eco.ensure(`${user.id}_on_${message.guild.id}`, {
                user: `${user}`,
                guild: message.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            if (!checkN(String(args[1]).replace(/--bank/g, '').trim()) || String(args[1]).replace(/--bank/g, '').trim() <= 0 || String(args[1]).replace(/--bank/g, '').trim().includes('-') || String(args[1]).replace(/--bank/g, '').trim().includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            client.eco.set(`${user.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${user.id}_on_${message.guild.id}`, 'bank') - parseInt(String(args[1]).replace(/--bank/g, '').trim())), 'bank')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Removed money', 'Zabrano pieniądze'), client.lang.handle(message, `Successfully removed ${String(money).replace(/--bank/g, '').trim()}$ from ${user}'s bank balance.`, `Pomyślnie zabrano ${String(money).replace(/--bank/g, '').trim()}$ z banku użytkownika ${user}.`))
        } else if (args[1].includes('--cash') || args[2] && args[2].includes('--cash')) {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            client.eco.ensure(`${user.id}_on_${message.guild.id}`, {
                user: `${user}`,
                guild: message.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            if (!checkN(String(args[1]).replace(/--cash/g, '').trim()) || String(args[1]).replace(/--cash/g, '').trim() <= 0 || String(args[1]).replace(/--cash/g, '').trim().includes('-') || String(args[1]).replace(/--cash/g, '').trim().includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            client.eco.set(`${user.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash') - parseInt(String(args[1]).replace(/--cash/g, '').trim())), 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Removed money', 'Zabrano pieniądze'), client.lang.handle(message, `Successfully removed ${String(money).replace(/--bank/g, '').trim()}$ from ${user}'s cash balance.`, `Pomyślnie zabrano ${String(money).replace(/--bank/g, '').trim()}$ z portfela użytkownika ${user}.`))
        } else {
            function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
            client.eco.ensure(`${user.id}_on_${message.guild.id}`, {
                user: `${user}`,
                guild: message.guild.id,
                cash: 0,
                bank: 0,
                total: 0
            })
            if (!checkN(money) || money <= 0 || money.includes('-') || money.includes('e')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid money amount', 'Podaj prawidłową sumę pieniędzy'))
            client.eco.set(`${user.id}_on_${message.guild.id}`, Math.floor(client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash') - parseInt(money)), 'cash')
            client.embeds.successWithTick(message, client.lang.handle(message, 'Removed money', 'Zabrano pieniądze'), client.lang.handle(message, `Successfully removed ${money}$ from ${user}.`, `Pomyślnie zabrano ${money}$ od użytkownika ${user}.`))
        }
    }
}
module.exports.help = {
    name: 'removemoney',
    descriptionpl: 'Zabiera pieniądze użytkownikowi',
    descriptionen: 'Removes money from user',
    usagepl: 'removemoney <user> <ilość pieniędzy>',
    usageen: 'removemoney <user> <money amount>',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['zabierzhajstemumenelowi'],
    permsLevel: 3,
    flags: {
        pl: ['\`--bank\` - Zabiera pieniądze z banku (użycie: removemoney <użytkownik> <kwota> --bank)', '\`--cash\` - Zabiera pieniądze z portfela (użycie: removemoney <użytkownik> <kwota> --cash)'],
        en: ['\`--bank\` - Removes money from bank (usage: removemoney <user> <amount> --bank)', '\`--cash\` - Removes money from wallet (usage: removemoney <user> <amount> --cash)'],
    }
}