const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let reason = [...args].slice(1).join(' ') || client.lang.handle(message, 'Not specified', 'Nie podano')
    if (!user && !args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!user && args[0] || !message.guild.member(user)) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else if (user.id === message.guild.owner.id) return client.embeds.error(message, client.lang.handle(message, 'You can\'t kick owner', 'Nie możesz wyrzucić właściciela'))
    else if (user.id === client.user.id) return client.embeds.error(message, client.lang.handle(message, 'Unfortunately, you can\'t kick me.', 'Niestety, nie możesz mnie wyrzucić.'))
    else if (user.id === message.author.id) return client.embeds.error(message, client.lang.handle(message, 'You can\'t kick someone', 'Nie możesz wyrzucić siebie'))
    else if (user.hasPermission('KICK_MEMBERS') && message.member.id !== message.guild.owner.id || user.hasPermission('BAN_MEMBERS') && message.member.id !== message.guild.owner.id) return client.embeds.error(message, client.lang.handle(message, 'You can\'t kick this user because it is a moderator', 'Nie możesz wyrzucić tego użytkownika ponieważ jest moderatorem'))
    else if (message.member.roles.highest.position <= user.roles.highest.position && message.member.id !== message.guild.owner.id) return client.embeds.error(message, client.lang.handle(message, 'You can\'t kick this user', 'Nie możesz wyrzucić tego użytkownika'))
    else if (message.guild.me.roles.highest.position <= user.roles.highest.position) return client.embeds.error(message, client.lang.handle(message, 'I can\'t kick this user', 'Nie mogę wyrzucić tego użytkownika'))
    else {
        try { user.kick(reason) } catch { return client.embeds.error(message, client.lang.handle(message, 'I can\'t kick this user', 'Nie mogę wyrzucić tego użytkownika')) }

        // INFRACTIONS
// Created by lambda v1, by sebt08 and Aleks1123
// Sador to podjebal od nas lmao
// Kod jest slaby, stary ale nadal nasz
        client.infractions.ensure(`${user.id}_on_${message.guild.id}`, { history: [] })
        const sch = {
            action: 'Kick',
            date: require('moment')(new Date()).format('YYYY-MM-DD HH:mm'),
            moderator: `${message.author}`,
            reason: reason,
            number: Math.floor(parseInt(client.base.get(message.guild.id, 'totalCases')) + 1)
        }
        client.infractions.push(`${user.id}_on_${message.guild.id}`, sch, 'history')
        client.base.set(message.guild.id, Math.floor(client.base.get(message.guild.id, 'totalCases') + 1), 'totalCases')

        // TO USER

        client.users.fetch(user.id).then(user => {
            let embed = new MessageEmbed()
            .setTitle('<a:yes:787665605464424468> Kick')
            .addFields(
                {
                    name: client.lang.handle(message, 'Guild', 'Serwer'),
                    value: `${message.guild.name} (\`${message.guild.id}\`)`
                },
                {
                    name: 'Moderator',
                    value: `${message.author} (\`${message.author.id}\`)`
                },
                {
                    name: client.lang.handle(message, 'Reason', 'Powód'),
                    value: `\`${reason}\``
                }
            )
            .setColor('#5aff73')
            .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            try { user.send(embed) } catch { return client.embeds.error(message, client.lang.handle(message, 'I can\'t send messages to this user', 'Nie mogę wysłać wiadomości do tego użytkownika')) }
        })
        
        // KANAŁ

        client.embeds.successWithTick(message, client.lang.handle(message, 'Kicked user', 'Wyrzucono użytkownika'), client.lang.handle(message, `Successfully kicked ${user} with reason \`${reason}\`.`, `Pomyślnie wyrzucono użytkownika ${user} z powodem \`${reason}\`.`))
    }
}
module.exports.help = {
    name: 'kick',
    descriptionpl: 'Wyrzuca użytkownika',
    descriptionen: 'Kicks user',
    usageen: 'kick <user> [reason]',
    usagepl: 'kick <użytkownik> [powód]',
    category: 'Moderacja',
    permsLevel: 2,
}
module.exports.conf = {
    aliases: ['k', 'wyrzuc', 'wyrzuć'],
    requiredBotPerms: ['KICK_MEMBERS'],
}
