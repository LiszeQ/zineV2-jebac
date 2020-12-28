const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, guild, member) => {
    let lang = client.base.get(guild.id, 'lang') || 'en'
    if (!client.base.get(guild.id, 'modLogChannel') || client.base.get(guild.id, 'modLogChannel') === 'Not specified' || client.base.get(guild.id, 'modLogChannel') === 'Nie podano') return
    let embed = new MessageEmbed()
    .setTitle('<:information:786946316181045298> Ban')
    .addFields(
        {
            name: lang === 'en' ? 'Banned member' : 'Zbanowana osoba',
            value: `${member} (\`${member.id}\`)`
        },
        {
            name: lang === 'en' ? 'Banned member guild' : 'Serwer na którym osoba została zbanowana',
            value: `${guild.name} (\`${guild.id}\`)`
        },
    )
    .setColor('#40c1e8')
    guild.channels.cache.get(String(client.base.get(guild.id, 'modLogChannel')).replace('<#', '').replace('>', '')).send(embed)
}
module.exports.help = {
    name: 'guildBanAdd'
}