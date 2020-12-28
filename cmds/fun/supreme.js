const fetch = require('node-fetch')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let tekst = args.join(' ')
    if (!tekst) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (tekst.includes('--light')) {
        const data = await fetch('https://api.alexflipnote.dev/supreme?text=' + encodeURI(String(tekst).replace('--light', '')) + '&light=true', {
            method: 'GET',
            headers: { 'Authorization': client.config.privateVars.authToken }
        });
        const arr = await data.arrayBuffer();
        const img = Buffer.from(arr);
        
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Supreme')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    } else if (tekst.includes('--dark')) {
        const data = await fetch('https://api.alexflipnote.dev/supreme?text=' + String(tekst).replace('--dark', '') + '&dark=true', {
            method: 'GET',
            headers: { 'Authorization': client.config.privateVars.authToken }
        });
        const arr = await data.arrayBuffer();
        const img = Buffer.from(arr);
        
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Supreme')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    } else {
        const data = await fetch('https://api.alexflipnote.dev/supreme?text=' + tekst, {
            method: 'GET',
            headers: { 'Authorization': client.config.privateVars.authToken }
        });
        const arr = await data.arrayBuffer();
        const img = Buffer.from(arr);
        
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Supreme')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'supreme',
    descriptionpl: 'Generator loga Supreme.',
    descriptionen: 'Supreme logo generator.',
    usageen: 'supreme <text>',
    usagepl: 'supreme <tekst>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['spr'],
    flags: {
        pl: ['\`--dark\` - Czarne logo Supreme', '\`--light\` - Jasne logo Supreme'],
        en: ['\`--dark\` - Dark Supreme logo', '\`--light\` - Light Supreme logo']
    }
}