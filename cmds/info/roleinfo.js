const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(new String(args[0]).replace('<@&', '').replace('>', '')) || message.guild.roles.cache.find(x => x.name.toLowerCase() === args.slice(0).join(' ') || x.name === args[0])
    if (!role && !args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (!role && args[0]) return client.embeds.error(message, client.lang.handle(message, 'Could not find that guild', 'Nie znaleziono takiego serwera'))
    else {
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Roleinfo')
        .addFields(
            {
                name: client.lang.handle(message, 'Name', 'Nazwa'),
                value: role.name
            },
            {
                name: 'ID',
                value: role.id
            },
            {
                name: client.lang.handle(message, 'Users has this role', 'Liczba użytkowników posiadających tą rolę'),
                value: role.members.size
            },
            {
                name: client.lang.handle(message, 'Color', 'Kolor'),
                value: `\`${role.hexColor}\``
            },
            {
                name: client.lang.handle(message, 'Role mentionable', 'Rola możliwa do wzmianki'),
                value: role.mentionable ? client.functions.convertBool(message, 'yes') : client.functions.convertBool(message, 'no')
            },
            {
                name: client.lang.handle(message, 'Role hoist', 'Rola wyświetlana oddzielnie'),
                value: role.hoist ? client.functions.convertBool(message, 'yes') : client.functions.convertBool(message, 'no')
            },
            {
                name: client.lang.handle(message, 'Date of created the role', 'Data stworzenia roli'),
                value: `${require('moment')(role.createdAt).format('YYYY-MM-DD HH:mm:ss')}`
            }
        )
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'roleinfo', 
    descriptionpl: 'Informacje o roli',
    descriptionen: 'Informations about role',
    usagepl: 'roleinfo <rola>',
    usageen: 'roleinfo <role>',
    category: 'Informacyjne'
}
module.exports.conf = {
    aliases: ['ri', 'role', 'rola'],
}