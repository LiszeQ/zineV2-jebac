const fetch = require('node-fetch')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let int = parseInt(args[0]) ? args[0] : Math.floor(Math.random() * 45) + 1 
    let tekst = int === args[0] ? args.slice(1).join(' ') : args.join(' ')
    if (!tekst) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (parseInt(int) && int <= 0 || int >= 46) return client.embeds.error(message, client.lang.handle(message, 'Enter the correct icon number greater than 1 and less than or equal to 45', 'Podaj właściwy numer ikony większy niż 1 i mniejszy lub równy 45'))
    else {
        const data = await fetch('https://api.alexflipnote.dev/challenge?text=' + tekst + '&icon=' + int, {
            method: 'GET',
            headers: { 'Authorization': client.config.privateVars.authToken }
        });
        const arr = await data.arrayBuffer();
        const img = Buffer.from(arr);
        
        const att = new MessageAttachment(img, 'image.png')
        let embed = new MessageEmbed()
        .setTitle('<a:yes:787665605464424468> Challenge')
        .attachFiles(att)
        .setImage('attachment://image.png')
        .setColor('#5aff73')
        .setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: 'challenge',
    descriptionpl: 'Generator challenge w Minecraft.',
    descriptionen: 'MC challenge generator.',
    usageen: 'challenge [icon number] <text>',
    usagepl: 'challenge [numer ikony] <tekst>',
    category: 'Zabawa',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['chall'],
}