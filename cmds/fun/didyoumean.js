const fetch = require('node-fetch')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let tekst = args.join(' ')
    args = tekst.split(/%%/g)
    if (!tekst || !args[0] || !args[1]) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else {
        const data = await fetch('https://api.alexflipnote.dev/didyoumean?top=' + String(args[0]) + '&bottom=' + String(args[1]), {
            method: 'GET',
            headers: { 'Authorization': client.config.privateVars.authToken }
        });
        const arr = await data.arrayBuffer();
        const img = Buffer.from(arr);
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Did you mean...')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'didyoumean',
    descriptionpl: 'Czy myślałeś o...',
    descriptionen: 'Did you mean Zine?',
    usageen: 'didyoumean <text1 %% text2>',
    usagepl: 'didyoumean <tekst 1 %% tekst 2>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['dym'],
}