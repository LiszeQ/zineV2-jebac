const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.member
    let image = await cc.Canvas.rainbow(user.user.displayAvatarURL({ dynamic: false, format: 'png' }))
    let att = new MessageAttachment(image, 'image.png')
    let embed = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> Gay')
    .setDescription(client.lang.handle(message, `You are ${Math.floor(Math.random() * 100)}% gay`, `Jesteś gejem w ${Math.floor(Math.random() * 100)}%`))
    .attachFiles(att)
    .setImage('attachment://image.png')
    .setColor('#5aff73')
    .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'gay',
    descriptionpl: 'Sprawdza, czy jesteś gejem (;',
    descriptionen: 'Checks if you are gay (;',
    usageen: 'gay [user]',
    usagepl: 'gay [użytkownik]',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['nosprawdzczyjestemgejem', 'areiagay', 'czyjestemgejem', 'gej'],
}