const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.author
    let member2 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.member
    let flagi = {
        DISCORD_EMPLOYEE: '<:dev:766927241631236116>',
        DISCORD_PARTNER: '<:partner:766927327731908639>',
        BUGHUNTER_LEVEL_1: '<:bughunter:766927328244531200>',
        BUGHUNTER_LEVEL_2: '<:bughunter_lvl2:766927327711723522>',
        HYPESQUAD_EVENTS: '<:hypesquadevents:766927327467929601>',
        HOUSE_BRAVERY: '<:bravery:766927327472123945>',
        HOUSE_BRILLIANCE: '<:brilliance:766927327597821963>',
        HOUSE_BALANCE: '<:balance:766927327707136010>',
        EARLY_SUPPORTER: '<:earlysupporter:766927327845548043>',
        VERIFIED_BOT: '<:verifiedbot:766927241710927892>',
        VERIFIED_DEVELOPER: '<:verifiedbotdeveloper:766927327472123927>'
    }
    if (!member && !args[0] || !member2 && !args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (member.id === message.author.id && args[0] && String(args[0]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else {
        client.badges.ensure(member.id, {
            developer: false,
            staff: false,
            bughunter: false,
            zasluzony: false,
            partner: false,
            supporter: false,
            earlyaccess: false
        })

        let avek = member2.bot ? member2.displayAvatarURL({ dynamic: true }) : member2.user.displayAvatarURL({ dynamic: true })
        let badges = !member2.bot ? client.functions.pushBadges(message, member) : []
        let flags_u = member.flags || member2.user.flags
        function displayAvatar(user, format) {
            if (message.guild.member(user)) {
                if (format === 'png') return user.user.displayAvatarURL({ dynamic: false, format: 'png' })
                if (format === 'jpg') return user.user.displayAvatarURL({ dynamic: false, format: 'jpg' })
                if (format === 'webp') return user.user.displayAvatarURL({ dynamic: false, format: 'webp' })
                if (format === 'gif') return user.user.displayAvatarURL({ dynamic: true })
            } else if (user.bot || user.user.bot) {
                if (format === 'png') return user.displayAvatarURL({ dynamic: false, format: 'png' })
                if (format === 'jpg') return user.displayAvatarURL({ dynamic: false, format: 'jpg' })
                if (format === 'webp') return user.displayAvatarURL({ dynamic: false, format: 'webp' })
                if (format === 'gif') return user.displayAvatarURL({ dynamic: true })
            } else {
                if (format === 'png') return user.displayAvatarURL({ dynamic: false, format: 'png' })
                if (format === 'jpg') return user.displayAvatarURL({ dynamic: false, format: 'jpg' })
                if (format === 'webp') return user.displayAvatarURL({ dynamic: false, format: 'webp' })
                if (format === 'gif') return user.displayAvatarURL({ dynamic: true })
            }
        }

        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Userinfo')
        .addFields(
            {
                name: client.lang.handle(message, 'Name and discrim', 'Nazwa i tag'),
                value: `${member.username || member2.user.username}#${member.discriminator || member2.user.discriminator}` 
            },
            {
                name: client.lang.handle(message, 'User ID', 'ID użytkownika'),
                value: member.id
            },
            {
                name: client.lang.handle(message, 'Perms level', 'Uprawnienia'),
                value: client.functions.getPermsText(message, member)
            },
            {
                name: client.lang.handle(message, 'Badges', 'Odznaki'),
                value: badges.length > 0 ? badges.join(' | ') : client.lang.handle(message, 'None', 'Brak odznak')
            },
            {
                name: client.lang.handle(message, 'Flags', 'Odznaki (w discordowym profilu)'),
                value: member.bot || member2.user.bot ? `<:bot:784400326211928094> ${client.lang.handle(message, 'or', 'lub')} <:verifiedbot:787337852156379185>` : `${flags_u ? flags_u.toArray().map(f => flagi[f]).join(', ') : client.lang.handle(message, 'None', 'Brak')}` || client.lang.handle(message, 'None', 'Brak')
            },
            {
                name: client.lang.handle(message, 'Avatar link', 'Link do avataru'),
                value: String(displayAvatar(member2, 'gif')).endsWith('.gif') ? `[gif](${displayAvatar(member2, 'gif')})` : `[png](${displayAvatar(member2, 'png')}) | ` +
                `[jpg](${displayAvatar(member2, 'jpg')}) | ` +
                `[webp](${displayAvatar(member2, 'webp')})`
            },
            {
                name: 'Status',
                value: `${member.presence.status || 'Error'}`
                    .replace('online', 'Online')
                    .replace('idle', client.lang.handle(message, 'Idle', 'Zaraz wracam'))
                    .replace('dnd', client.lang.handle(message, 'Do not Disturb', 'Nie przeszkadzać'))
                    .replace('offline', client.lang.handle(message, 'Offline', 'Niedostępny'))
            },
            {
                name: client.lang.handle(message, 'Activity', 'Aktywność'),
                value: `${member.presence.game || client.lang.handle(message, 'None', 'Brak')}`
            },
            {
                name: client.lang.handle(message, 'Discord account creation date', 'Data założenia konta na Discordzie'),
                value: `${require('moment').utc(member.createdAt).format('YYYY-MM-DD HH:mm:ss')}`
            },
            {
                name: client.lang.handle(message, 'Date of joining the server', 'Data dołączenia do serwera'),
                value: `${require('moment')(member2.joinedAt).format('YYYY-MM-DD HH:mm:ss')}`
            }
        )
        if (message.guild.member(member)) embed.addField(client.lang.handle(message, 'Roles', 'Lista ról'), `${member2.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1).join(', ') || client.lang.handle(message, 'None', 'Brak')}`)
        embed.setColor('#5aff73')
        embed.setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'userinfo', 
    descriptionpl: 'Informacje o użytkowniku',
    descriptionen: 'Informations about user',
    usagepl: 'userinfo [użytkownik]',
    usageen: 'userinfo [user]',
    category: 'Informacyjne'
}
module.exports.conf = {
    aliases: ['ui', 'whois', 'user'],
}