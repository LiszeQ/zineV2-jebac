const { MessageEmbed } = require('discord.js');
module.exports.run = async (message, args, client) => {
    let opcja = args[0];
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]) || client.users.cache.get(args[1])
    let powod = [...args].slice(2).join(' ') || client.lang.handle(message, 'Not specified', 'Nie podano powodu')
    if (!opcja || !user && !args[1]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!user && args[1]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie mogę znaleźć takiego użytkownika'))
    else if (opcja === 'add' || opcja === 'dodaj' || opcja === 'dajgbana') {
        client.gbanManager.ensure(user.id, { status: false, moderator: null, reason: null, date: null })
        if (client.gbanManager.get(user.id, 'status')) return client.embeds.error(message, client.lang.handle(message, 'This user is already globally banned', 'Ten użytkownik jest już globalnie zbanowany'))
        if (client.config.perms.developer.includes(user.id)) return client.embeds.error(message, client.lang.handle(message, 'You can\'t ban this user', 'Nie możesz zbanować tego użytkownika'))
        client.gbanManager.set(user.id, true, 'status')
        client.gbanManager.set(user.id, powod, 'reason')
        client.gbanManager.set(user.id, `${message.author}`, 'moderator')
        client.gbanManager.set(user.id, require('moment-timezone')().tz('Poland').format('YYYY-MM-DD HH:mm'), 'date')
        client.embeds.successWithTick(message, client.lang.handle(message, 'Done', 'Sukces'), client.lang.handle(message, `Successfully banned globally ${user}.`, `Pomyślnie zbanowano globalnie użytkownika ${user}.`))
        
        // Do usera
        let embedToUser = new MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'You\'re globally banned', 'Zostałeś globalnie zbanowany')}`)
        .addFields(
            {
                name: 'Moderator',
                value: message.author
            },
            {
                name: client.lang.handle(message, 'Reason', 'Powód'),
                value: `\`${powod}\``
            },
            {
                name: client.lang.handle(message, 'Date', 'Data'),
                value: require('moment-timezone')().tz('Poland').format('YYYY-MM-DD HH:mm')
            }
        )
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        user.send(embedToUser).catch(function () { client.embeds.error(message, client.lang.handle(message, 'I can\'t send messages to this user', 'Nie mogę wysłać wiadomości do tego użytkownika')) })
        // Na kanał GBANY

        let embed = new MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'Global ban', 'Zbanowano globalnie')}`)
        .addFields(
            {
                name: client.lang.handle(message, 'User', 'Użytkownik'),
                value: user
            },
            {
                name: 'Moderator',
                value: message.author
            },
            {
                name: client.lang.handle(message, 'Reason', 'Powód'),
                value: `\`${powod}\``
            },
            {
                name: client.lang.handle(message, 'Date', 'Data'),
                value: require('moment-timezone')().tz('Poland').format('YYYY-MM-DD HH:mm')
            }
        )
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        await client.guilds.fetch('765944077253476413').then(g => g.channels.cache.get('766300875236048896').send(embed))
    } else if (opcja === 'remove' || opcja === 'usuń' || opcja === 'usun' || opcja === 'zabierzgbana') {
        client.gbanManager.ensure(user.id, { status: false, moderator: null, reason: null, date: null })
        if (!client.gbanManager.get(user.id, 'status')) return client.embeds.error(message, client.lang.handle(message, 'This user is not globally banned', 'Ten użytkownik nie jest globalnie zbanowany'))
        client.gbanManager.set(user.id, false, 'status')
        client.gbanManager.set(user.id, '', 'reason')
        client.gbanManager.set(user.id, '', 'moderator')
        client.gbanManager.set(user.id, '', 'date')
        client.embeds.successWithTick(message, client.lang.handle(message, 'Done', 'Sukces'), client.lang.handle(message, `Successfully unbanned globally ${user}.`, `Pomyślnie odbanowano globalnie użytkownika ${user}.`))
        
        // Do usera
        let embedToUser = new MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'You\'re globally unbanned', 'Zostałeś globalnie odbanowany')}`)
        .addFields(
            {
                name: 'Moderator',
                value: message.author
            },
            {
                name: client.lang.handle(message, 'Reason', 'Powód'),
                value: `\`${powod}\``
            },
            {
                name: client.lang.handle(message, 'Date', 'Data'),
                value: require('moment-timezone')().tz('Poland').format('YYYY-MM-DD HH:mm')
            }
        )
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        user.send(embedToUser).catch(function () { client.embeds.error(message, client.lang.handle(message, 'I can\'t send messages to this user', 'Nie mogę wysłać wiadomości do tego użytkownika')) })
        // Na kanał GBANY

        let embed = new MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'Global unban', 'Odbanowano globalnie')}`)
        .addFields(
            {
                name: client.lang.handle(message, 'User', 'Użytkownik'),
                value: user
            },
            {
                name: 'Moderator',
                value: message.author
            },
            {
                name: client.lang.handle(message, 'Reason', 'Powód'),
                value: `\`${powod}\``
            },
            {
                name: client.lang.handle(message, 'Date', 'Data'),
                value: require('moment-timezone')().tz('Poland').format('YYYY-MM-DD HH:mm')
            }
        )
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        await client.guilds.fetch('765944077253476413').then(g => g.channels.cache.get('766300875236048896').send(embed))
    } else if (opcja === 'check' || opcja === 'sprawdz') {
        client.gbanManager.ensure(user.id, { status: false, moderator: null, reason: null, date: null })
        if (!client.gbanManager.get(user.id, 'status')) return client.embeds.successWithCustomColor(message, '#fff65b', '<a:yes:787665605464424468> Gban check', client.lang.handle(message, 'This user **ARE NOT** global banned', 'Ten użytkownik **NIE JEST** globalnie zbanowany'))
        else {
            let embed = new MessageEmbed()
            .setTitle('<a:yes:787665605464424468> Gban check')
            .setDescription(client.lang.handle(message, 'This user **ARE** global banned', 'Ten użytkownik **JEST** globalnie zbanowany'))
            .setColor('#fff65b')
            .addFields(
                {
                    name: 'Moderator',
                    value: client.gbanManager.get(user.id, 'moderator')
                },
                {
                    name: client.lang.handle(message, 'Reason', 'Powód'),
                    value: `\`${client.gbanManager.get(user.id, 'reason')}\``
                },
                {
                    name: client.lang.handle(message, 'Date', 'Data'),
                    value: client.gbanManager.get(user.id, 'date')
                }
            )
            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
        }
    }
}
module.exports.help = {
    name: 'gban',
    descriptionpl: 'Banuje globalnie wspomnianego użytkownika',
    descriptionen: 'Bans globally mentioned user',
    usagepl: 'gban <add / remove / check> <użytkownik> [powód]',
    usageen: 'gban <add / remove / check> <user> [reason]',
    category: 'Developerskie',
}
module.exports.conf = {
    aliases: ['gb'],
    requiredBotPerms: ['MANAGE_MESSAGES'],
    permsLevel: 5,
}