const { SSL_OP_EPHEMERAL_RSA } = require('constants')

module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    let arg = [...args].slice(1).join(' ')
    if (!akcja || !arg) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (akcja === 'fetch' || akcja === 'f') {
        client.users.fetch(arg).then(user => {
            client.embeds.successWithTick(message, 'Developer Tools', client.lang.handle(message, `Fetched ${user.tag}`, `Zfetchowano ${user.tag}`))
        }).catch(err => { client.embeds.error(message, client.lang.handle(message, 'Unknown user', 'Nieprawidłowe ID użytkownika')) })
    } else if (akcja === 'send' || akcja === 's') {
        message.channel.send(arg)
    } else if (akcja === 'get' || akcja === 'g') {
        let user = client.users.cache.get(arg)
        if (!user) return client.embeds.error(message, client.lang.handle(message, 'Unknown user', 'Nieprawidłowe ID użytkownika'))
        else {
            message.react('787665605464424468')
            let embed = new (require('discord.js')).MessageEmbed()
            .setTitle('<a:yes:787665605464424468> Developer Tools')
            .addFields(
                {
                    name: 'Tag',
                    value: user.tag
                },
                {
                    name: 'Nazwa',
                    value: user.username
                },
                {
                    name: 'ID',
                    value: user.id
                },
                {
                    name: 'Discrim',
                    value: user.discriminator
                },
                {
                    name: 'Created at',
                    value: require('moment')(user.createdAt).format('YYYY-MM-DD HH:mm')
                }
            )
            .setColor('#5aff73')
            message.author.send(embed)
        }
    } else if (akcja === 'update' || akcja === 'u') {
        const version = args[1]
        const content = [...args].slice(2).join(' ')
        if (!version.includes('.')) return client.embeds.error(message, client.lang.handle(message, 'Please type valid version', 'Podaj prawidłową wersję'))
        else {
            message.react('787665605464424468')
            let embed = new (require('discord.js')).MessageEmbed()
            .setTitle('<:information:786946316181045298> Update')
            .setDescription(`\`\`\`${content}\`\`\``)
            .addField('Wersja', `\`${version}\``)
            .setColor('#40c1e8')
            client.channels.fetch('766922498796683294').then(chn => chn.send(embed))
        }
    } else if (akcja === 'uu') {
        if (require('os').platform() === 'win32') return message.channel.send('Unsupported system')
        require('child_process').exec('apt-get update', (err, stdout, stderr) => {
            if (err) throw err;
            message.channel.send(stdout).catch(err => { message.channel.send('Char limit') })
        })
    } else return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
}
module.exports.help = {
    name: 'dev',
    descriptionpl: 'Dodatki dla developerów',
    descriptionen: 'Developer tools',
    usagepl: 'dev <fetch | send | get | update | uu> <treść>',
    usageen: 'dev <fetch | send | get | update | uu> <content>',
    category: 'Developerskie',
}
module.exports.conf = {
    aliases: ['d'],
    permsLevel: 5,
}