const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let emb = new MessageEmbed()
    let title
    let desc 
    let thumbnail
    let image
    let color
    let footer
    let chn

    // TITLE
    
    let embed = new MessageEmbed()
    .setTitle('<:information:786946316181045298> Embed generator')
    .setDescription(client.lang.handle(message, 'What title do you want embed? Write it here. You have a minute to do so.', 'Jaki chcesz tytuł embeda? Napisz go tutaj. Masz na to minutę.'))
    .setColor('#40c1e8')
    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
    message.channel.send(embed).then((m1) => {
        message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
            .then(async coll => {
                if (String(coll.first().content).length > 50) {
                    message.author.lastMessage.delete()
                    let embed = new MessageEmbed()
                    .setTitle('<a:err:787665605968789544> Error')
                    .setDescription(client.lang.handle(message, 'The title can be up to 50 characters long', 'Tytuł może zawierać maksymalnie 50 znaków'))
                    .setColor('#ff4b4b')
                    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                    return await m1.edit(embed)
                }
                message.author.lastMessage.delete()
                title = coll.first().content;
                let embed1 = new MessageEmbed()
                .setTitle('<:information:786946316181045298> Embed generator')
                .setDescription(client.lang.handle(message, 'What description do you want in embed? Write it here. You have a 5 minutes to do so.', 'Jaki chcesz opis embeda? Napisz go tutaj. Masz na to 5 minut.'))
                .setColor('#40c1e8')
                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                await m1.edit(embed1).then((m2) => {
                    message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 300000, errors: ['time'] })
                        .then(async coll => {
                            if (String(coll.first().content).length > 200) {
                                message.author.lastMessage.delete()
                                let embed = new MessageEmbed()
                                .setTitle('<a:err:787665605968789544> Error')
                                .setDescription(client.lang.handle(message, 'The description can be up to 200 characters long', 'Opis może zawierać maksymalnie 200 znaków'))
                                .setColor('#ff4b4b')
                                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                return await m2.edit(embed)
                            }
                            message.author.lastMessage.delete()
                            desc = require('discord.js').Util.escapeMarkdown(String(coll.first().content))
                            desc = require('discord.js').Util.removeMentions(String(coll.first().content))
                            let embed2 = new MessageEmbed()
                            .setTitle('<:information:786946316181045298> Embed generator')
                            .setDescription(client.lang.handle(message, 'What thumbnail do you want embed? Write it here. If none type \`none\`. You have a minute to do so.', 'Jaki chcesz thumbnail embeda? Napisz go tutaj. Jeśli nie chcesz aby w embedzie był thumbnail napisz \`none\`. Masz na to minutę.'))
                            .setColor('#40c1e8')
                            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                            await m2.edit(embed2).then((m3) => {
                                message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                                    .then(async coll => {
                                        if (String(coll.first().content).toLowerCase() === 'none') thumbnail = null
                                        else thumbnail = coll.first().content
                                        var reg = new RegExp('^(https?:\\/\\/)?'+
                                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                                        '((\\d{1,3}\\.){3}\\d{1,3}))'+
                                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                                        '(\\?[;&a-z\\d%_.~+=-]*)?'+
                                        '(\\#[-a-z\\d_]*)?$','i');
                                        if (!reg.test(coll.first().content) && thumbnail !== null) {
                                            message.author.lastMessage.delete()
                                            let embed = new MessageEmbed()
                                            .setTitle('<a:err:787665605968789544> Error')
                                            .setDescription(client.lang.handle(message, 'You didn\'t enter valid thumbnail URL', 'Podałeś niewłaściwy link do thumbnail'))
                                            .setColor('#ff4b4b')
                                            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                            return await m3.edit(embed)
                                        }
                                        message.author.lastMessage.delete()
                                        let embed3 = new MessageEmbed()
                                        .setTitle('<:information:786946316181045298> Embed generator')
                                        .setDescription(client.lang.handle(message, 'What image do you want embed? Write it here. If none type \`none\`. You have a minute to do so.', 'Jaki chcesz image embeda? Napisz go tutaj. Jeżeli nie chcesz image w embedzie wpisz \`none\`. Masz na to minutę.'))
                                        .setColor('#40c1e8')
                                        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                        await m3.edit(embed3).then((m4) => {
                                            message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                                                .then(async coll => {
                                                    if (String(coll.first().content).toLowerCase() === 'none') image = null
                                                    else image = coll.first().content
                                                    var reg = new RegExp('^(https?:\\/\\/)?'+
                                                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                                                    '((\\d{1,3}\\.){3}\\d{1,3}))'+
                                                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                                                    '(\\?[;&a-z\\d%_.~+=-]*)?'+
                                                    '(\\#[-a-z\\d_]*)?$','i');
                                                    if (!reg.test(coll.first().content) && image !== null) {
                                                        message.author.lastMessage.delete()
                                                        let embed = new MessageEmbed()
                                                        .setTitle('<a:err:787665605968789544> Error')
                                                        .setDescription(client.lang.handle(message, 'You didn\'t enter valid image URL', 'Podałeś niewłaściwy link do image'))
                                                        .setColor('#ff4b4b')
                                                        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                        return await m4.edit(embed)
                                                    }
                                                    message.author.lastMessage.delete()
                                                    let embed4 = new MessageEmbed()
                                                    .setTitle('<:information:786946316181045298> Embed generator')
                                                    .setDescription(client.lang.handle(message, 'What color do you want embed? Write it here. You have a minute to do so.', 'Jaki chcesz kolor embeda? Napisz go tutaj. Masz na to minutę.'))
                                                    .setColor('#40c1e8')
                                                    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                    await m4.edit(embed4).then((m5) => {
                                                        message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                                                            .then(async coll => {
                                                                let reg = /^#[0-9A-F]{6}$/i
                                                                if (!reg.test(coll.first().content)) {
                                                                    message.author.lastMessage.delete()
                                                                    let embed = new MessageEmbed()
                                                                    .setTitle('<a:err:787665605968789544> Error')
                                                                    .setDescription(client.lang.handle(message, 'You didn\'t enter valid hex color', 'Podałeś niewłaściwy kolor HEX'))
                                                                    .setColor('#ff4b4b')
                                                                    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                    return await m5.edit(embed)
                                                                }
                                                                color = coll.first().content
                                                                message.author.lastMessage.delete()
                                                                let embed5 = new MessageEmbed()
                                                                .setTitle('<:information:786946316181045298> Embed generator')
                                                                .setDescription(client.lang.handle(message, 'What footer do you want embed? Write it here. You have a minute to do so.', 'Jaki chcesz footer embeda? Napisz go tutaj. Masz na to minutę.'))
                                                                .setColor('#40c1e8')
                                                                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                await m5.edit(embed5).then((m6) => {
                                                                    message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                                                                    .then(async coll => {
                                                                        if (String(coll.first().content).toLowerCase() === 'none') footer = null
                                                                        else footer = coll.first().content
                                                                        if (String(coll.first().content).length > 100) {
                                                                            message.author.lastMessage.delete()
                                                                            let embed = new MessageEmbed()
                                                                            .setTitle('<a:err:787665605968789544> Error')
                                                                            .setDescription(client.lang.handle(message, 'The footer can be up to 100 characters long', 'Footer może zawierać maksymalnie 100 znaków'))
                                                                            .setColor('#ff4b4b')
                                                                            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                            return await m6.edit(embed)
                                                                        }
                                                                        message.author.lastMessage.delete()
                                                                        let embed6 = new MessageEmbed()
                                                                        .setTitle('<:information:786946316181045298> Embed generator')
                                                                        .setDescription(client.lang.handle(message, 'Enter the channel to which the embed is to be sent. **THIS MUST BE A CHANNEL MENTION!** You have a minute to do so.', 'Podaj kanał, na który ma być wysłany embed. **MUSI BYĆ TO WZMIANKA KANAŁU!** Masz na to minutę.'))
                                                                        .setColor('#40c1e8')
                                                                        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                        await m6.edit(embed6).then((m7) => {
                                                                            message.channel.awaitMessages(res => res.author.id === message.author.id, { max: 1, time: 60000, errors: ['time'] })
                                                                            .then(async coll => {
                                                                                if (!coll.first().mentions.channels.first() || coll.first().mentions.channels.first().guild.id != message.guild.id) {
                                                                                    message.author.lastMessage.delete()
                                                                                    let embed = new MessageEmbed()
                                                                                    .setTitle('<a:err:787665605968789544> Error')
                                                                                    .setDescription(client.lang.handle(message, 'Please type valid channel mention', 'Podaj prawidłową wzmiankę kanału'))
                                                                                    .setColor('#ff4b4b')
                                                                                    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                                    return await m7.edit(embed)
                                                                                }
                                                                                message.delete()
                                                                                message.guild.me.lastMessage.delete()
                                                                                chn = coll.first().mentions.channels.first().id
                                                                                message.author.lastMessage.delete()
                                                                                emb.setTitle(title)
                                                                                emb.setDescription(desc)
                                                                                if (footer) emb.setFooter(footer)
                                                                                if (thumbnail) emb.setThumbnail(thumbnail)
                                                                                if (image) emb.setImage(image)
                                                                                emb.setColor(`0x${String(color).replace('#', '').replace(/\s/g, '')}`)
                                                                                message.guild.channels.cache.get(chn).send(emb)
                                                                            })
                                                                            .catch(async err => {
                                                                                let embed = new MessageEmbed()
                                                                                .setTitle('<a:err:787665605968789544> Error')
                                                                                .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                                                                                .setColor('#ff4b4b')
                                                                                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                                return await m5.edit(embed)
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                            .catch(async err => {
                                                                let embed = new MessageEmbed()
                                                                .setTitle('<a:err:787665605968789544> Error')
                                                                .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                                                                .setColor('#ff4b4b')
                                                                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                                return await m5.edit(embed)
                                                            })
                                                    })
                                                })
                                                .catch(async err => {
                                                    let embed = new MessageEmbed()
                                                    .setTitle('<a:err:787665605968789544> Error')
                                                    .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                                                    .setColor('#ff4b4b')
                                                    .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                                    return await m4.edit(embed)
                                                })
                                        })
                                    })  
                                    .catch(async err => {
                                        let embed = new MessageEmbed()
                                        .setTitle('<a:err:787665605968789544> Error')
                                        .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                                        .setColor('#ff4b4b')
                                        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                                        return await m3.edit(embed)
                                    })
                            })
                        })
                        .catch(async err => {
                            let embed = new MessageEmbed()
                            .setTitle('<a:err:787665605968789544> Error')
                            .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                            .setColor('#ff4b4b')
                            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                            return await m2.edit(embed)
                        })
                })
            })
            .catch(async err => {
                let embedtime = new MessageEmbed()
                .setTitle('<a:err:787665605968789544> Error')
                .setDescription(client.lang.handle(message, 'The time limit has expired', 'Upłynął limit czasu'))
                .setColor('#ff4b4b')
                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                await m1.edit(embedtime)
            })
    })
}
module.exports.help = {
    name: 'embed',
    descriptionpl: 'Tworzy embed',
    descriptionen: 'Creates embed',
    category: 'Moderacja',
    permsLevel: 3,
}
module.exports.conf = {
    requiredBotPerms: ['MANAGE_MESSAGES'],
}