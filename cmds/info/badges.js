module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]) || client.users.cache.get(args[1]) || message.author
    let badge = args[2]
    if (!akcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    switch(akcja) {
        case 'add':
            let permscheck = await client.functions.resolvePerms(message, 5)
            if (permscheck) {
                if (!akcja || !user && !args[1]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
                else if (user.id === message.author.id && args[1] && String(args[1]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
                switch(badge) {
                    /*
                        developer: false,
                        staff: false,
                        bughunter: false,
                        zasluzony: false,
                        partner: false,
                        supporter: false,
                        earlyaccess: false
                    */
                    case 'developer':
                        if (client.badges.get(user.id, 'developer')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'developer')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Developer to ${user}.`, `Pomyślnie dodano odznakę Developer użytkownikowi ${user}.`))
                        break
                    case 'staff':
                        if (client.badges.get(user.id, 'staff')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'staff')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Staff to ${user}.`, `Pomyślnie dodano odznakę Staff użytkownikowi ${user}.`))
                        break
                    case 'bughunter':
                        if (client.badges.get(user.id, 'bughunter')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'bughunter')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Bug hunter to ${user}.`, `Pomyślnie dodano odznakę Bug hunter użytkownikowi ${user}.`))
                        break
                    case 'zasluzony':
                        if (client.badges.get(user.id, 'zasluzony')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'zasluzony')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Deserver to ${user}.`, `Pomyślnie dodano odznakę Zasłużony użytkownikowi ${user}.`))
                        break
                    case 'partner':
                        if (client.badges.get(user.id, 'partner')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'partner')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Partner to ${user}.`, `Pomyślnie dodano odznakę Partner użytkownikowi ${user}.`))
                        break
                    case 'supporter':
                        if (client.badges.get(user.id, 'supporter')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'supporter')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Supporter to ${user}.`, `Pomyślnie dodano odznakę Supporter użytkownikowi ${user}.`))
                        break
                    case 'earlyaccess':
                        if (client.badges.get(user.id, 'earlyaccess')) return client.embeds.error(message, client.lang.handle(message, 'This user already have this badge', 'Ten użytkownik posiada już tą odznakę'))
                        client.badges.set(user.id, true, 'earlyaccess')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully added badge Early Access to ${user}.`, `Pomyślnie dodano odznakę Wczesny dostęp użytkownikowi ${user}.`))
                        break
                    default:
                        client.embeds.error(message, client.lang.handle(message, 'Could not find that badge\nAvailable badges: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`supporter\`, \`earlyaccess\`', 'Nie znaleziono takiej odznaki\nDostępne odznaki: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`supporter\`, \`earlyaccess\`'))
                        break
                }
            }
            break
        case 'remove':
            let permscheck2 = await client.functions.resolvePerms(message, 5)
            if (permscheck2) {
                if (!akcja || !user && !args[1]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
                else if (user.id === message.author.id && args[1] && String(args[1]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
                switch(badge) {
                    /*
                        developer: true,
                        staff: true,
                        bughunter: true,
                        zasluzony: true,
                        partner: true,
                        supporter: true,
                        earlyaccess: true
                    */
                    case 'developer':
                        if (!client.badges.get(user.id, 'developer')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'developer')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Developer from ${user}.`, `Pomyślnie usunięto odznakę Developer użytkownikowi ${user}.`))
                        break
                    case 'staff':
                        if (!client.badges.get(user.id, 'staff')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'staff')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Staff from ${user}.`, `Pomyślnie usunięto odznakę Staff użytkownikowi ${user}.`))
                        break
                    case 'bughunter':
                        if (!client.badges.get(user.id, 'bughunter')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'bughunter')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Bug hunter from ${user}.`, `Pomyślnie usunięto odznakę Bug hunter użytkownikowi ${user}.`))
                        break
                    case 'zasluzony':
                        if (!client.badges.get(user.id, 'zasluzony')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'zasluzony')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Deserver from ${user}.`, `Pomyślnie usunięto odznakę Zasłużony użytkownikowi ${user}.`))
                        break
                    case 'partner':
                        if (!client.badges.get(user.id, 'partner')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'partner')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Partner from ${user}.`, `Pomyślnie usunięto odznakę Partner użytkownikowi ${user}.`))
                        break
                    case 'supporter':
                        if (!client.badges.get(user.id, 'supporter')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, true, 'supporter')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Supporter from ${user}.`, `Pomyślnie usunięto odznakę Supporter użytkownikowi ${user}.`))
                        break
                    case 'earlyaccess':
                        if (!client.badges.get(user.id, 'earlyaccess')) return client.embeds.error(message, client.lang.handle(message, 'This user doesn\'t have this badge', 'Ten użytkownik nie posiada tej odznaki'))
                        client.badges.set(user.id, false, 'earlyaccess')
                        client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `Successfully removed badge Early Access from ${user}.`, `Pomyślnie usunięto odznakę Wczesny dostęp użytkownikowi ${user}.`))
                        break
                    default:
                        client.embeds.error(message, client.lang.handle(message, 'Could not find that badge\nAvailable badges: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`supporter\`, \`earlyaccess\`', 'Nie znaleziono takiej odznaki\nDostępne odznaki: \`developer\`, \`staff\`, \`bughunter\`, \`zasluzony\`, \`partner\`, \`supporter\`, \`earlyaccess\`'))
                        break
                }
            }
            break
        case 'show':
            if (args[1] && args[1].includes('--all')) {
                return client.embeds.successWithTick(message, client.lang.handle(message, 'All badges', 'Wszystkie odznaki'),
                    client.lang.handle(message,
                        '<:dev:784398720749142076> - Developer\n' +
                        '<:dev:785829525653028884> - Staff\n' +
                        '<:bughunter:786941682083037204> - Bug hunter\n' +
                        '<:deserver:786942091883708486> - Deserver\n' +
                        '<:partner:786942330133413918> - Partner\n' +
                        '<:supporter:786942612807614504> - Supporter\n' +
                        ':test_tube: - Early access',

                        '<:dev:784398720749142076> - Programista\n' +
                        '<:dev:785829525653028884> - Zarząd\n' +
                        '<:bughunter:786941682083037204> - Bug hunter\n' +
                        '<:deserver:786942091883708486> - Zasłużony\n' +
                        '<:partner:786942330133413918> - Partner\n' +
                        '<:supporter:786942612807614504> - Wspierający\n' +
                        ':test_tube: - Wczesny dostęp'
                    )
                )
                break
            }
            let badges = client.functions.pushBadges(message, user)
            client.embeds.successWithTick(message, 'Badges', client.lang.handle(message, `${user} badges:\n${badges.length > 0 ? badges.join(' | ') : client.lang.handle(message, 'None', 'Brak odznak')}`, `Odznaki ${user}:\n${badges.length > 0 ? badges.join(' | ') : client.lang.handle(message, 'None', 'Brak odznak')}`))
            break
        default:
            client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
            break
    }
}
module.exports.help = {
    name: 'badges',
    descriptionpl: 'Wyświetla listę odznak lub je dodaje / usuwa',
    descriptionen: 'Displays badges list or it adds / deletes',
    usagepl: 'badges <add | remove | show> [użytkownik]',
    usageen: 'badges <add | remove | show> [user]',
    category: 'Informacyjne',
}
module.exports.conf = {
    aliases: ['bg', 'odznaki', 'badge', 'profilebadges'],
    flags: {
        pl: ['\`--all\` - Pokazuje wszystkie dostępne odznaki'],
        en: ['\`--all\` - Displays all badges']
    }
}