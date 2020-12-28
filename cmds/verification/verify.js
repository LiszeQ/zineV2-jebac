const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    if (client.ver.get(`${message.author.id}_on_${message.guild.id}`, 'isVerified')) return client.embeds.error(message, client.lang.handle(message, 'You\'re already verified', 'Jesteś już zweryfikowany'))
    else if (!client.base.get(message.guild.id, 'verificationRole') || !client.base.get(message.guild.id, 'verificationChannel')) return client.embeds.error(message, client.lang.handle(message, 'Verification role or verfification channel is not specified', 'Nie ustawiono kanału lub roli weryfikacyjnej'))
        else if (String(client.base.get(message.guild.id, 'verificationChannel')).replace('<#', '').replace('>', '') !== message.channel.id) return client.embeds.error(message, client.lang.handle(message, 'You must be on guild verification channel', 'Musisz być na kanale weryfikacji'))
    else {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let ver = new this.verify();
        let embed = new MessageEmbed()
            .setTitle('<a:yes:787665605464424468> Verify')
            .setDescription(client.lang.handle(message, 'To verify yourself, enter the code from the picture.', 'Aby się zweryfikować, przepisz kod z obrazka.'))
            .attachFiles(new (require('discord.js')).MessageAttachment(ver.getCanva(), 'code.png'))
            .setImage('attachment://code.png')
            .setColor('#5aff73')
            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed).then(msg => {
            const collector = message.channel.createMessageCollector(msgt => msgt.author.id === message.author.id && !msgt.content.startsWith(client.base.get(message.guild.id, 'prefix')), { time: 60000 })
            let i = 0
            collector.on('collect', async collected => {
                if (collected.content === ver.getCode()) {
                    let embed = new MessageEmbed()
                        .setTitle('<a:yes:787665605464424468> Verify')
                        .setDescription(client.lang.handle(message, 'Success', 'Zostałeś zweryfikowany'))
                        .setColor('#5aff73')
                    message.delete()
                    collected.delete()
                    message.guild.me.lastMessage.delete()
                    message.channel.send(embed).then(msg => msg.delete({ timeout: 5000 }))
                    collector.stop()
                    client.ver.set(`${message.author.id}_on_${message.guild.id}`, true, 'isVerified')
                    await message.member.roles.add(String(client.base.get(message.guild.id, 'verificationRole')).replace('<@&', '').replace('>', ''))
                } else {
                    i++
                    if (i >= 5) {
                        let embed = new MessageEmbed()
                            .setTitle('<a:err:787665605968789544> Verify error')
                            .setDescription(client.lang.handle(message, 'You have used verification attempts', 'Wykorzystałeś próby weryfikacji'))
                            .setColor('#ff4b4b')
                        msg.delete()
                        message.channel.send(embed)
                        collector.stop()
                        await message.guild.me.lastMessage.delete()
                        await message.member.lastMessage.delete()
                        return await message.member.kick(client.lang.handle(message, 'Verification attempts limit', 'Przekroczono próby weryfikacji')).catch(false)
                    }
                    let embed = new MessageEmbed()
                        .setTitle('<a:err:787665605968789544> Verify error')
                        .setDescription(client.lang.handle(message, 'Invalid code', 'Nieprawidłowy kod'))
                        .setColor('#ff4b4b')
                    await message.guild.me.lastMessage.delete()
                    await message.member.lastMessage.delete()
                    message.channel.send(embed).then(async embed2 => {
                        await sleep(5000)
                        let embed = new MessageEmbed()
                            .setTitle('<a:yes:787665605464424468> Verify')
                            .setDescription(client.lang.handle(message, 'To verify yourself, enter the code from the picture.', 'Aby się zweryfikować, przepisz kod z obrazka.'))
                            .attachFiles(new (require('discord.js')).MessageAttachment(ver.getCanva(), 'code.png'))
                            .setImage('attachment://code.png')
                            .setColor('#5aff73')
                            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                        await message.guild.me.lastMessage.delete()
                        message.channel.send(embed)
                    })
                }
            })
        })
    }
}
module.exports.help = {
    name: 'verify',
    descriptionpl: 'Weryfikuje użytkownika',
    descriptionen: 'Verifies user',
    category: 'Weryfikacja',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['ver'],
}
exports.verify = class {
    constructor() {
        require('canvas').createCanvas()
        var char =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var lengthOtp = 6;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            var index = Math.floor(Math.random() * char.length + 1);
            if (captcha.indexOf(char[index]) == -1)
            captcha.push(char[index]);
            else i--;
        }
        var canv = require('canvas').createCanvas(500, 200)
        canv.width = 150;
        canv.height = 100;
        var ctx = canv.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canv.width, canv.height)
        ctx.font = '30px Verdana';
        ctx.fillStyle = '#303030';
        ctx.textAlign = 'center';
        ctx.fillText(captcha.join(''), 75, 50);
        ctx.text
        var code = captcha.join('');

        this.code = code;
        this.canva = canv;
    }
    getCode() {
        return this.code;
    }
    getCanva() {
        return this.canva.toBuffer();
    }
}