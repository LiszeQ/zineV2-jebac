const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.member
    let image = await cc.Canvas.trigger(user.user.displayAvatarURL({ dynamic: false, format: 'png' }))
    let att = new MessageAttachment(image, 'image.gif')
    let embed = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> Triggered')
    .attachFiles(att)
    .setImage('attachment://image.gif')
    .setColor('#5aff73')
    .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'triggered',
    descriptionpl: 'Tak. Triggered. Chyba nie muszę ci tłumaczyć.',
    descriptionen: 'Yes. Triggered.',
    usageen: 'triggered [user]',
    usagepl: 'triggered [użytkownik]',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
}