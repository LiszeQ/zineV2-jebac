const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, member) => {
    client.base.set(`${member.id}_on_${member.guild.id}`, false, 'isVerified')
    if (client.base.get(member.guild.id, 'leaveChannel') === 'Not specified' || client.base.get(member.guild.id, 'leaveChannel') === 'Nie podano') return
    if (client.base.get(member.guild.id, 'leaveModule')) {
        let embed = new MessageEmbed()
        .setTitle(client.base.get(member.guild.id, 'leaveEmbedTitle'))
        .setDescription(String(
            client.base.get(member.guild.id, 'leaveMessage'))
                .replace('{membermention}', `${member}`)
                .replace('{memberid}', `${member.user.id}`)
                .replace('{membertag}', `${member.user.tag}`)
                .replace('{membercreationdate}', `${require('moment')(member.user.createdAt).format('YYYY-MM-DD HH:ss')}`)
                .replace('{guildname}', `${member.guild.name}`)
                .replace('{guildid}', `${member.guild.id}`)
                .replace('{guildmembers}', `${member.guild.members.cache.filter(m => !m.user.bot).size}`)
        )
        .setColor(`0x${String(client.base.get(member.guild.id, 'leaveMessageColor')).replace('#', '')}`)
        member.guild.channels.cache.get(String(client.base.get(member.guild.id, 'leaveChannel')).replace('<#', '').replace('>', '')).send(embed)
    }
}
module.exports.help = {
    name: 'guildMemberRemove'
}