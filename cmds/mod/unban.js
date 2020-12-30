const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let reason = [...args].slice(1).join(' ') || client.lang.handle(message, 'Not specified', 'Nie podano')
    if (!user && !args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!user && args[0]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else if (user.id === message.guild.owner.id) return client.embeds.error(message, client.lang.handle(message, 'Server owner is not banned', 'Puknij się w głowę. Pomyśl: jak właściciel serwera może być zbanowany? No właśnie.'))
    else if (user.id === client.user.id) return client.embeds.error(message, client.lang.handle(message, 'I am not banned', 'Nie mam bana'))
    else {
        let banned = false;
        let bans = await message.guild.fetchBans()
        bans.forEach(userb => {
            if (userb.id === user.id || userb.user.id === user.id) banned = true
        })
        if (!banned) return client.embeds.error(message, client.lang.handle(message, 'This user is not banned', 'Ten użytkownik nie jest zbanowany'))
        try { await message.guild.members.unban(user, reason) } catch { return client.embeds.error(message, client.lang.handle(message, 'I can\'t unban this user', 'Nie mogę odbanować tego użytkownika')) }

        // INFRACTIONS
// Created by lambda v1, by sebt08 and Aleks1123
// Sador to podjebal od nas lmao
// Kod jest slaby, stary ale nadal nasz
        client.infractions.ensure(`${user.id}_on_${message.guild.id}`, { infractions: 0, history: [] })
        const sch = {
            action: 'Unban',
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
                .setTitle('<a:yes:787665605464424468> Unban')
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

        client.embeds.successWithTick(message, client.lang.handle(message, 'Unbanned user', 'Odbanowano użytkownika'), client.lang.handle(message, `Successfully unbanned ${user} with reason \`${reason}\`.`, `Pomyślnie odbanowano użytkownika ${user} z powodem \`${reason}\`.`))
    }
}
module.exports.help = {
    name: 'unban',
    descriptionpl: 'Odbanuje użytkownika',
    descriptionen: 'Unbans user',
    usageen: 'unban <user> [reason]',
    usagepl: 'unban <użytkownik> [powód]',
    category: 'Moderacja',
    permsLevel: 2,
}
module.exports.conf = {
    aliases: ['ub', 'odbanuj'],
    requiredBotPerms: ['BAN_MEMBERS'],
}
