module.exports.run = async (message, args, client) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || client.users.cache.get(args[0]) || message.member
    if (!client.base.get(message.guild.id, 'levelSystem') || client.base.get(message.guild.id, 'levelSystem') === 'Off') return client.embeds.error(message, client.lang.handle(message, 'Level system is disabled', 'Moduł poziomów jest wyłączony'))
    else if (user.id === message.author.id && args[0] && String(args[0]).replace('<@', '').replace('>', '').replace('!', '') !== message.author.id) return client.embeds.error(message, client.lang.handle(message, 'Could not find that user', 'Nie znaleziono takiego użytkownika'))
    else {
        client.levels.ensure(`${user.id}_on_${message.guild.id}`, {
            user: `${user}`,
            guild: message.guild.id,
            xp: 0,
            level: 0
        })
        const karta = new (require('canvacord')).Rank()
        .setAvatar(message.guild.member(user) ? user.user.displayAvatarURL({ format: "png", dynamic: false }) : user.displayAvatarURL({ format: "png", dynamic: false }))
        .setCurrentXP(parseInt(client.levels.get(`${user.id}_on_${message.guild.id}`, 'xp')))
        .setRequiredXP(parseInt(client.base.get(message.guild.id, 'requiredXP')))
        .setLevel(parseInt(client.levels.get(`${user.id}_on_${message.guild.id}`, 'level')))
        .setStatus(user.presence.status)
        .setProgressBar(["GREEN", "DARKGREEN", "LIGHTGREEN"], "GRADIENT")
        .setUsername(message.guild.member(user) ? user.user.username : user.username)
        .setDiscriminator(message.guild.member(user) ? user.user.discriminator : user.discriminator)
        karta.build().then(data => {
            const att = new (require('discord.js')).MessageAttachment(data, "rank.png")
            const emb = new (require('discord.js')).MessageEmbed()
            .setColor("#4b87ff")
            .attachFiles(att)
            .setImage("attachment://rank.png")
            return message.channel.send(emb)
        })
    }
}
module.exports.help = {
    name: 'rank', 
    descriptionpl: 'Informacje o poziomie użytkownika',
    descriptionen: 'Informations about user level',
    usagepl: 'rank [użytkownik]',
    usageen: 'rank [user]',
    category: 'Levelling'
}
module.exports.conf = {
    aliases: ['level'],
}