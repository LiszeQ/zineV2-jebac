module.exports.run = async (message, args, client) => {
    if (message.content.includes('--cash')) {
        let desc = ''
        let i = 0
        const f = client.eco.filter(e => e.guild === message.guild.id && e.cash > 0).array()
        const s = f.sort((a, b) => b.cash - a.cash)
        const top = s.splice(0, 10)
        
        let embed = new (require('discord.js')).MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Cash leaderboard')
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        
        for (let data of top) {
            i++
            desc += `**#${i}.** ${data.user} - ${data.cash}$\n`
        }
        embed.setDescription(desc || client.lang.handle(message, 'None', 'Brak'))
        return message.channel.send(embed)
    } else if (message.content.includes('--bank')) {
        let desc = ''
        let i = 0
        const f = client.eco.filter(e => e.guild === message.guild.id && e.bank > 0).array()
        const s = f.sort((a, b) => b.bank - a.bank)
        const top = s.splice(0, 10)
        
        let embed = new (require('discord.js')).MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Bank leaderboard')
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        
        for (let data of top) {
            i++
            desc += `**#${i}.** ${data.user} - ${data.bank}$\n`
        }
        embed.setDescription(desc || client.lang.handle(message, 'None', 'Brak'))
        return message.channel.send(embed)
    } else {
        let desc = ''
        let i = 0
        const f = client.eco.filter(e => e.guild === message.guild.id && e.total > 0).array()
        const s = f.sort((a, b) => b.total - a.total)
        const top = s.splice(0, 10)
        
        let embed = new (require('discord.js')).MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'Economy leaderboard', 'Leaderboard ekonomii')}`)
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        
        for (let data of top) {
            i++
            desc += `**#${i}.** ${data.user} - ${data.total}$\n`
        }
        embed.setDescription(desc || client.lang.handle(message, 'None', 'Brak'))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'top', 
    descriptionpl: 'Topka ekonomii.',
    descriptionen: 'Top economy balances.',
    category: 'Ekonomia'
}
module.exports.conf = {
    aliases: ['ecotop'],
    flags: {
        pl: ['\`--cash\` - Leaderboard cash', '\`--bank\` - Leaderboard bank'],
        en: ['\`--cash\`- Cash leaderboard', '\`--bank\` - Bank leaderboard']
    }
}