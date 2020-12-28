const cc = require('canvacord')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let user2 = message.mentions.members.array()[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]) || client.users.cache.get(args[1])
    if (!user1 || !user2) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else {
        message.channel.startTyping(1)
        const img = await cc.Canvas.slap(user1.user.displayAvatarURL({ dynamic: false, format: 'png' }), user2.user.displayAvatarURL({ dynamic: false, format: 'png' }))
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Slap')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
        message.channel.stopTyping(1)
    }
}
module.exports.help = {
    name: 'slap',
    descriptionpl: 'Uderza kogoś w policzek',
    descriptionen: 'Hits someone',
    usageen: 'slap <user1> <user2>',
    usagepl: 'slap <użytkownik 1> <użytkownik 2>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    cooldown: 15,
}