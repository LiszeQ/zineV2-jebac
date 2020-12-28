const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let guild = client.guilds.cache.get(args[0]) || client.guilds.cache.find(x => x.name.toLowerCase() === args.slice(0).join(' ') || x.name === args[0]) || message.guild
    if (!guild && !args[0]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (guild.id === message.guild.id && args[0] && String(args[0]) !== message.guild.name) return client.embeds.error(message, client.lang.handle(message, 'Could not find that guild', 'Nie znaleziono takiego serwera'))
    else {
        function getGuildBoostLevel() {
            if (guild.premiumSubscriptionCount < 2) return '0'
            if (guild.premiumSubscriptionCount >= 2) return '1'
            if (guild.premiumSubscriptionCount >= 15) return '2'
            if (guild.premiumSubscriptionCount >= 30) return '3'
        }
        function getGuildRegion() {
            if(guild.region == 'europe') return client.lang.handle(message, 'Europe', 'Europa') 
            if(guild.region == 'brazil') return client.lang.handle(message, 'Brasil', 'Brazylia')
            if(guild.region == 'hongkong') return client.lang.handle(message, 'Hongkong', 'Hong Kong')
            if(guild.region == 'india') return client.lang.handle(message, 'India', 'Indie')
            if(guild.region == 'japan') return client.lang.handle(message, 'Japan', 'Japonia')
            if(guild.region == 'russia') return client.lang.handle(message, 'Russia', 'Rosja')
            if(guild.region == 'singapore') return client.lang.handle(message, 'Singapore', 'Singapur')
            if(guild.region == 'southafrica') return client.lang.handle(message, 'South Africa', 'Afryka Południowa')
            if(guild.region == 'sydney') return client.lang.handle(message, 'Sydnej', 'Sydnej')
            if(guild.region == 'us-central') return client.lang.handle(message, 'Central USA', 'Centralna USA')
            if(guild.region == 'us-east') return client.lang.handle(message, 'East USA', 'Wschodnie USA')
            if(guild.region == 'us-south') return client.lang.handle(message, 'South USA', 'Południowe USA')
            if(guild.region == 'us-west') return client.lang.handle(message, 'West USA', 'Zachodnie USA')
            if(guild.region == 'frankfurt') return 'Frankfurt'
        }

        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Serverinfo')
        .addFields(
            {
                name: client.lang.handle(message, 'Name', 'Nazwa'),
                value: guild.name
            },
            {
                name: 'ID',
                value: guild.id
            },
            {
                name: client.lang.handle(message, 'Boost level', 'Poziom boostów'),
                value: `${guild.premiumSubscriptionCount >= 2 ? '<:boost:787618900811972618>' : '<:noboost:787618884995776533>'} ${client.lang.handle(message, `Level ${getGuildBoostLevel()} (${guild.premiumSubscriptionCount} boosts)`, `Poziom ${getGuildBoostLevel()} (${guild.premiumSubscriptionCount} boostów)`)}`
            },
            {
                name: client.lang.handle(message, 'Roles', 'Role'),
                value: guild.roles.cache.size >= 50 ? client.lang.handle(message, '\`Too many roles to display\`', '\`Za dużo ról aby wyświetlić\`') : `${guild.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => `\`${role.name}\``)
                    .slice(0, -1).join(', ')
                }`
            },
            {
                name: 'Region',
                value: getGuildRegion()
            },
            {
                name: client.lang.handle(message, 'Avatar link', 'Link do avataru'),
                value: guild.iconURL() ? `[${client.lang.handle(message, 'Click me', 'Kliknij tutaj')}](${guild.iconURL({ dynamic: true })})` : client.lang.handle(message, 'None', 'Brak')
            },
            {
                name: client.lang.handle(message, 'Emojis size', 'Ilość emotek'),
                value: guild.emojis.cache.size
            },
            {
                name: client.lang.handle(message, 'Emojis size', 'Ilość emotek'),
                value: guild.emojis.cache.size
            },
            {
                name: client.lang.handle(message, 'Members size', 'Ilość użytkowników'),
                value: guild.members.cache.filter((m) => !m.user.bot).size
            },
            {
                name: client.lang.handle(message, 'Bots size', 'Ilość botów'),
                value: guild.members.cache.filter((m) => m.user.bot).size
            },
            {
                name: client.lang.handle(message, 'Roles size', 'Ilość ról'),
                value: guild.roles.cache.size
            },
            {
                name: client.lang.handle(message, 'Date of created the server', 'Data stworzenia serwera'),
                value: `${require('moment')(guild.createdAt).format('YYYY-MM-DD HH:mm:ss')}`
            }
        )
        .setColor('#5aff73')
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'serverinfo', 
    descriptionpl: 'Informacje o serwerze',
    descriptionen: 'Informations about guild',
    usagepl: 'serverinfo [serwer]',
    usageen: 'serverinfo [guild]',
    category: 'Informacyjne'
}
module.exports.conf = {
    aliases: ['gi', 'si', 'server', 'guildinfo', 'guild'],
}