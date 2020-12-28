const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, guild) => {
    let embed_log = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> Złodzieje')
    .addFields(
        {
            name: 'Nazwa',
            value: guild.name
        },
        {
            name: 'ID',
            value: guild.id
        },
        {
            name: 'Userów',
            value: guild.members.cache.filter(m => !m.user.bot).size
        },
        {
            name: 'Region',
            value: guild.region
        },
        {
            name: 'Owner',
            value: `${guild.owner} (\`${guild.owner.id}\`)`
        },
    )
    .setColor('#5aff73')
    client.channels.fetch('775640078760280064').then(chn => chn.send(embed_log))
}
module.exports.help = {
    name: 'guildDelete'
}