const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args.join(' ').slice(1)) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args.join(' ').slice(1)) || client.users.cache.get(args.join(' ').slice(1)) || message.member
    let kolor = args[0];
    if (!kolor) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    let image = await cc.Canvas.colorfy(user.user.displayAvatarURL({ dynamic: false, format: 'png' }), kolor)
    let att = new MessageAttachment(image, 'image.png')
    let embed = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> ' + client.lang.handle(message, 'Changed color', 'Zmieniono kolor'))
    .attachFiles(att)
    .setImage('attachment://image.png')
    .setColor('#5aff73')
    .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'colorfy',
    descriptionpl: 'Zmień kolor avataru wybranego użytkownika',
    descriptionen: 'Change user avatar color',
    usageen: 'colorfy <color> [user]',
    usagepl: 'colorfy <kolor> [użytkownik]',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['zmienkolor'],
}