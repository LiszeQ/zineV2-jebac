const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, member) => {
    if (client.base.get(member.guild.id, 'welcomeChannel') === 'Not specified' || client.base.get(member.guild.id, 'welcomeChannel') === 'Nie podano') return
    if (client.base.get(member.guild.id, 'welcomeModule')) {
        let embed = new MessageEmbed()
        .setTitle(client.base.get(member.guild.id, 'welcomeEmbedTitle'))
        .setDescription(String(
            client.base.get(member.guild.id, 'welcomeMessage'))
                .replace('{membermention}', `${member}`)
                .replace('{memberid}', `${member.user.id}`)
                .replace('{membertag}', `${member.user.tag}`)
                .replace('{membercreationdate}', `${require('moment')(member.user.createdAt).format('YYYY-MM-DD HH:ss')}`)
                .replace('{guildname}', `${member.guild.name}`)
                .replace('{guildid}', `${member.guild.id}`)
                .replace('{guildmembers}', `${member.guild.members.cache.filter(m => !m.user.bot).size}`)
        )
        .setColor(`0x${String(client.base.get(member.guild.id, 'welcomeMessageColor')).replace('#', '')}`)
        member.guild.channels.cache.get(String(client.base.get(member.guild.id, 'welcomeChannel')).replace('<#', '').replace('>', '')).send(embed)
    }
}
module.exports.help = {
    name: 'guildMemberAdd'
}