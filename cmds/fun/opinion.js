const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let opinia = args.join(' ')
    if (!opinia) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    let image = await cc.Canvas.opinion(message.member.user.displayAvatarURL({ dynamic: false, format: 'png' }), opinia)
    let att = new MessageAttachment(image, 'image.png')
    let embed = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> ' + client.lang.handle(message, 'In my opinion...', 'W mojej opinii...'))
    .attachFiles(att)
    .setImage('attachment://image.png')
    .setColor('#5aff73')
    .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'opinion',
    descriptionpl: 'Wyraź swoją opinię',
    descriptionen: 'Represents your opinion',
    usageen: 'opinion <message>',
    usagepl: 'opinia <wiadomość>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['opinia', 'wyrazswojezdanie'],
}