const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.author
    if (user.id === message.author.id && args[0] && String(args[0]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    let embed = new MessageEmbed()
    .setTitle(`<:money:789101191194738688> ${client.lang.handle(message, 'Balance', 'Stan konta')}`)
    .addFields(
        {
            name: client.lang.handle(message, 'Cash', 'W portfelu'),
            value: `${client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash')}$`
        },
        {
            name: client.lang.handle(message, 'Bank', 'W banku'),
            value: `${client.eco.get(`${user.id}_on_${message.guild.id}`, 'bank')}$`
        },
        {
            name: client.lang.handle(message, 'Total', 'Łącznie'),
            value: `${Math.floor(parseInt(client.eco.get(`${user.id}_on_${message.guild.id}`, 'cash')) + parseInt(client.eco.get(`${user.id}_on_${message.guild.id}`, 'bank')))}$`
        }
    )
    .setColor('#fffb52')
    .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'bal',
    descriptionpl: 'Stan konta',
    descriptionen: 'Account balance',
    usagepl: 'bal [użytkownik]',
    usageen: 'bal [user]',
    category: 'Ekonomia',
}
module.exports.conf = {
    aliases: ['balance', 'account', 'money']
}