const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let tekst = args.join(' ')
    if (!tekst) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (tekst.includes('--dark')) {
        let img = await cc.Canvas.youtube({ username: message.author.username, content: String(tekst).replace('--dark', ''), avatar: message.author.displayAvatarURL({ dynamic: false, format: 'png' }), dark: true })
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> YouTube (dark)')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    } else {
        let img = await cc.Canvas.youtube({ username: message.author.username, content: tekst, avatar: message.author.displayAvatarURL({ dynamic: false, format: 'png' }), dark: false })
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> YouTube')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'youtube',
    descriptionpl: 'Generator komentarza YouTube',
    descriptionen: 'YouTube comment generator',
    usageen: 'youtube <text>',
    usagepl: 'youtube <tekst>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['yt', 'ytcomment'],
    flags: {
        pl: ['\`--dark\` - Ciemne tło'],
        en: ['\`--dark\` - Dark theme']
    }
}