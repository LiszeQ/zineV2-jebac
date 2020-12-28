const { MessageEmbed } = require('discord.js');
module.exports.run = async (message, args, client) => {
    let input = args.join(' ')
    if (!input) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    let start = process.hrtime()
    let czas = process.hrtime(start)
    let evaled = new Promise((res) => res(eval(input)))
    return evaled.then((o) => {
        o = require('util').inspect(o, { depth: 0 })
        if (o.includes(client.token)) throw new TypeError('Poufne zmienne zostały zabezpieczone')
        if (evaled.length > 1024) {
            let e = new MessageEmbed()
            .setColor('#75FF67')
            .setTitle('<a:yes:787665605464424468> Eval')
            .addFields(
                {
                    name: client.lang.handleLanguage(message, 'Command', 'Komenda'),
                    value: '```js\n' + input + '```'
                },
                {
                    name: client.lang.handle(message, 'Return', 'Zwrot'),
                    value: '```' + client.lang.handle(message, `Return exceeded the character limit`, `Zwrot przekroczył limit znaków`) + '```'
                },
                {
                    name: client.lang.handle(message, 'Return type', 'Typ zwrotu'),
                    value: '```js\n' + typeof o + '```'
                },
                {
                    name: client.lang.handle(message, 'Execution time', 'Czas wykonania'),
                    value: '```js\n' + client.lang.handle(message, `${czas[0] > 0 ? `${czas[0].toFixed(2)} seconds` : ''}${czas[1] / 1e6.toFixed(2)} milliseconds`, `${czas[0] > 0 ? `${czas[0].toFixed(2)} sekund` : ''}${czas[1] / 1e6.toFixed(2)} milisekund`) + '```'
                }
            )
            .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(e)
        } else {
            let e = new MessageEmbed()
            .setColor('#75FF67')
            .setTitle('<a:yes:787665605464424468> Eval')
            .addFields(
                {
                    name: client.lang.handle(message, 'Command', 'Komenda'),
                    value: '```js\n' + input + '```'
                },
                {
                    name: client.lang.handle(message, 'Return', 'Zwrot'),
                    value: '```js\n' + o + '```'
                },
                {
                    name: client.lang.handle(message, 'Return type', 'Typ zwrotu'),
                    value: '```js\n' + typeof o + '```'
                },
                {
                    name: client.lang.handle(message, 'Execution time', 'Czas wykonania'),
                    value: '```js\n' + client.lang.handle(message, `${czas[0] > 0 ? `${czas[0].toFixed(2)} seconds` : ''}${czas[1] / 1e6.toFixed(2)} milliseconds`, `${czas[0] > 0 ? `${czas[0].toFixed(2)} sekund` : ''}${czas[1] / 1e6.toFixed(2)} milisekund`) + '```'
                }
            )
            .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(e)
        }
    }).catch(err => {
        let e = new MessageEmbed()
        .setColor('#ff4b4b')
        .setTitle(`<a:err:787665605968789544> ${client.lang.handle(message, 'Error while evaled code', 'Error w trakcie wykonywania kodu')}`)
        .setDescription(client.lang.handle(message, `Error text: \`\`\`js\n${err}\`\`\``, `Treść błędu: \`\`\`js\n${err}\`\`\``))
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(e);
    })
}
module.exports.help = {
    name: 'eval',
    descriptionpl: 'Wykonuje podany kod JS w konsoli',
    descriptionen: 'Executes JS code in console',
    usagepl: 'eval <kod JS>',
    usageen: 'eval <input>',
    category: 'Developerskie',
}
module.exports.conf = {
    aliases: ['e'],
    permsLevel: 5,
}