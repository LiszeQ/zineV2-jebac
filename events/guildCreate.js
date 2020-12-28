const { MessageEmbed } = require('discord.js');
module.exports.run = async (client, guild) => {
    const guildSettings = {
        lang: 'en',
        prefix: '-',
        announcementChannel: 'Not specified',
        announcementMention: 'Not specified',
        modLogChannel: 'Not specified',
        suggestionsChannel: 'Not specified',
        welcomeModule: 'Off',
        welcomeChannel: 'Not specified',
        welcomeMessage: 'Hello {membermention}!',
        leaveModule: 'Off',
        leaveChannel: 'Not specified',
        leaveMessage: 'Bye {membertag}!',
    }

    client.base.ensure(guild.id, guildSettings)

    let embed = new MessageEmbed()
    .setTitle('<a:yes:786197973011791953> Thanks!')
    .setDescription('Thanks for adding Zine!\nCommand list: \`-help\`\nConfiguration: \`-config\`\nInformations about bot: \`-botinfo\`')
    .setColor('#7289da')
    if (guild.systemChannel) guild.systemChannel.send(embed)

    let embed_log = new MessageEmbed()
    .setTitle('<a:yes:787665605464424468> Nowy serwer')
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
    name: 'guildCreate'
}