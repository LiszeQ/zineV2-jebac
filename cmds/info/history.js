const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let embeds = []
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.author
    if (user.id === message.author.id && args[0] && String(args[0]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    client.infractions.ensure(`${user.id}_on_${message.guild.id}`, { history: [] })
    let infr = client.infractions.get(`${user.id}_on_${message.guild.id}`, 'history')
    infr.forEach(i => {
        client.infractions.ensure(`${i.number}_on_${message.guild.id}`, { deleted: false })
        if (client.infractions.get(`${i.number}_on_${message.guild.id}`, 'deleted')) {} else {
            let embed = new MessageEmbed()
            .setTitle('<a:yes:787665605464424468> History')
            .addFields(
                {
                    name: client.lang.handle(message, 'Action', 'Akcja'),
                    value: i.action || 'Not defined'
                },
                {
                    name: client.lang.handle(message, 'Date', 'Data'),
                    value: i.date || 'Not defined'
                },
                {
                    name: 'Moderator',
                    value: i.moderator || 'Not defined'
                },
                {
                    name: client.lang.handle(message, 'Reason', 'Powód'),
                    value: i.reason || 'Not defined'
                },
                {
                    name: client.lang.handle(message, 'Action number', 'Numer akcji'),
                    value: String(`**${i.number || 'Not defined'}**`)
                },
            )
            .setColor('#5aff73')
            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            embeds.push(embed)
        }
    })
    if (embeds.length === 0 && user.id == message.author.id) return client.embeds.error(message, client.lang.handle(message, 'You have no moderation actions', 'Nie posiadasz akcji moderacyjnych'))
    if (embeds.length === 0 && user.id !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'This user have no moderation actions', 'Ten użytkownik nie posiada akcji moderacyjnych'))
    new (require('discord.js-reaction-menu')).menu({
        channel: message.channel,
        userID: message.author.id,
        pages: embeds,
        time: 120000,
    })
}
module.exports.help = {
    name: 'history', 
    descriptionpl: 'Historia użytkownika',
    descriptionen: 'User history',
    usagepl: 'history [użytkownik]',
    usageen: 'history [użytkownik]',
    category: 'Informacyjne'
}
module.exports.conf = {
    aliases: ['ri', 'role', 'rola'],
}