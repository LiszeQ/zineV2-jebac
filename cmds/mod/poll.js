const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    const tresc = args.join(' ')
    args = tresc.split(/%%/g);
    const pytanie = args[0];
    const opcje = [...new Set(args.slice(1))];
    if (!tresc) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (opcje.length < 2) return client.embeds.error(message, client.lang.handle(message, 'You can\'t give less than 2 answers', 'Nie możesz podać mniej niż 2 odpowiedzi'))
    else if (opcje.length > 9) return client.embeds.error(message, client.lang.handle(message, 'You can\'t provide more than 9 answers', 'Nie możesz podać więcej niż 9 odpowiedzi'))
    else {
        let emotki = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣',
            '🔟'
        ]

        let str = ''
        let eNum = 0

        // Str
        opcje.forEach(() => {
            str += `${emotki[eNum]} - ${opcje[eNum]}\n`
            eNum++
        })

        // Na kanał
        let embed = new MessageEmbed()
        .setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'Poll', 'Ankieta')}`)
        .addFields(
            {
                name: client.lang.handle(message, 'Question', 'Pytanie'),
                value: `:bar_chart: **${require('discord.js').Util.escapeBold(pytanie)}**`
            },
            {
                name: client.lang.handle(message, 'Choices', 'Odpowiedzi'),
                value: str
            }
        )
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed).then(async (pollMsg) => {
            for (let eNum = 0; eNum < opcje.length; eNum++) {
                await pollMsg.react(emotki[eNum]);
            }
        })
    }
}
module.exports.help = {
    name: 'poll', 
    descriptionpl: 'Tworzy ankietę',
    descriptionen: 'Creates poll',
    usagepl: 'poll <Pytanie %% Odpowiedź 1 %% Odpowiedź 2 ...>',
    usageen: 'poll <Question %% Choice 1 %% Choice 2 %% ...>',
    category: 'Moderacja'
}
module.exports.conf = {
    aliases: ['ankieta'],
    permsLevel: 3
}