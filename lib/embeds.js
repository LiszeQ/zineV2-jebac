const { MessageEmbed } = require('discord.js')
class EmbedGenerator {
    successWithTick(message, title, description) {
        if (!message || !title || !description) throw new Error('EmbedsManagerError: Please provide required args')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> ' + title)
        .setDescription(description)
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
    argsError(message, usage) {
        if (!message || !usage) throw new Error('EmbedsManagerError: Please provide required args')
        let embed = new MessageEmbed()
        .setTitle('<a:err:787665605968789544> Error')
        .setDescription(message.client.lang.handle(message, `Please provide required arguments.\nCommand usage: \`${message.client.prefix}${usage}\``, `Podaj wymagane argumenty.\nUżycie komendy:\`${message.client.prefix}${usage}\``))
        .setColor('#ff4b4b')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
    successWithCustomColor(message, color, title, description) {
        if (!message || !color || !title || !description) throw new Error('EmbedsManagerError: Please provide required args')
        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
    success(message, title, description) {
        if (!message || !title || !description) throw new Error('EmbedsManagerError: Please provide required args')
        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
    error(message, description) {
        if (!message || !description) throw new Error('EmbedsManagerError: Please provide required args')
        let embed = new MessageEmbed()
        .setTitle('<a:err:787665605968789544> Error')
        .setDescription(description)
        .setColor('#ff4b4b')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
    criticalError(message, error) {
        if (message.client.config.perms.developer.includes(message.author.id)) {
            let embed = new MessageEmbed()
            .setTitle('<a:err:787665605968789544> Error')
            .setDescription('```js\n' + !error.stack ? `\`\`\`${error}\`\`\`` : `\`\`\`${error.stack}\`\`\`` + '```')
            .setColor('#ff4b4b')
            return message.channel.send(embed)
        }
        let embed = new MessageEmbed()
        .setTitle('<a:err:787665605968789544> Error')
        .setDescription(message.client.lang.handle(message, 'Ohhh.. It looks like there was a critical error when trying to execute the command. It has already been reported to the bot developers. It will be fixed shortly.\nHowever, if you want to get in touch faster, join our [support server](https://discord.gg/3gTsfA9).', 'Ojjjjj... Wygląda na to, że podczas próby wywołania komendy wystąpił duży błąd. Został on już zgłoszony do developerów bota. Zostanie on naprawiony w najbliższym czasie.\nJeżeli jednak chcesz się szybciej skontaktować dołącz na nasz [serwer pomocy](https://discord.gg/3gTsfA9).'))
        .setColor('#ff4b4b')
        message.channel.send(embed)

        let embed1 = new MessageEmbed()
        .setTitle('<a:err:787665605968789544> Error')
        .setDescription('```js\n' + !error.stack ? `\`\`\`${error}\`\`\`` : `\`\`\`${error.stack}\`\`\`` + '```')
        .setColor('#ff4b4b')
        message.client.channels.fetch('774963567035416607').then(chn => { chn.send(embed1); chn.send('[ <@744935304271626258> ]') })
    }
}
module.exports = EmbedGenerator;