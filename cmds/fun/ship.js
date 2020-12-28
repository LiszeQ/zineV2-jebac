const fetch = require('node-fetch')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let user1 = message.mentions.members.array()[0] || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0])
    let user2 = message.mentions.members.array()[1] || message.guild.members.cache.get(args[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(1).join(' ') || x.user.username === args[1]) || client.users.cache.get(args[1]) || message.member
    if (!user1 || !user2) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else {
        message.channel.startTyping(1)
        const data = await fetch('https://nekobot.xyz/api/imagegen?type=ship&user1=' + String(user1.user.displayAvatarURL({ dynamic: false })) + '&user2=' + String(user2.user.displayAvatarURL({ dynamic: false }))).then(res => res.json())
        const data_heart = await fetch('https://flamebot.pl/api/Ship.php').then(res => res.json());
        const att = new MessageAttachment(data.message, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Ship')
        .setDescription(
            client.lang.handle(message, 'Your love factor:\n', 'Twój współczynnik miłości:\n') +
            `${String(data_heart.odpowiedz).split('%')[0]}%`
        )
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
        message.channel.stopTyping(1)
    }
}
module.exports.help = {
    name: 'ship',
    descriptionpl: 'Współczynnik miłości.',
    descriptionen: 'Love percent.',
    usageen: 'ship <user1> <user2>',
    usagepl: 'ship <użytkownik 1> <użytkownik 2>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    cooldown: 15,
}