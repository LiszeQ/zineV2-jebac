module.exports.run = async (message, args, client) => {
    if (!client.base.get(message.guild.id, 'levelSystem') || client.base.get(message.guild.id, 'levelSystem') === 'Off') return client.embeds.error(message, client.lang.handle(message, 'Level system is disabled', 'Moduł poziomów jest wyłączony'))
    let desc = ''
    let i = 0
    const f = client.levels.filter(lvl => lvl.guild === message.guild.id && lvl.level > 0).array()
    const s = f.sort((a, b) => b.level - a.level)
    const top = s.splice(0, 10)
    
    let embed = new (require('discord.js')).MessageEmbed()
    .setTitle('<a:yes:787665605464424468> Leaderboard')
    .setColor('#5aff73')
    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    
    for (let data of top) {
        i++
        desc += `**#${i}.** ${data.user} - ${data.xp} XP, level ${data.level}\n`
    }
    embed.setDescription(desc || client.lang.handle(message, 'None', 'Brak'))
    message.channel.send(embed)
}
module.exports.help = {
    name: 'leaderboard', 
    descriptionpl: 'Topka wiadomości.',
    descriptionen: 'Top 10 messages.',
    category: 'Levelling'
}
module.exports.conf = {
    aliases: ['lb', 'leaders', 'msgtop', 'lvltop', 'topmessage'],
}