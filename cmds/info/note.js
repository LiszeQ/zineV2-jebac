const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    let content = [...args].slice(1).join(' ')
    if (!akcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (akcja === 'add' || akcja === 'dodaj') {
        if (!content) return client.embeds.argsError(message,  client.lang.handle(message, 'note add <content>', 'note add <treść>'))
        if (String(content).length > 100) return client.embeds.error(message, client.lang.handle(message, 'The content of the note cannot contain more than 100 characters', 'Treść notatki nie może zawierać więcej niż 100 znaków'))
        else {
            const sch = {
                content: content,
                date: require('moment')(new Date()).format('YYYY-MM-DD HH:mm'),
                number: Math.floor(client.note.get(message.author.id, 'totalNotes') + 1)
            }
            client.note.push(message.author.id, sch, 'notes')
            client.note.set(message.author.id, Math.floor(client.note.get(message.author.id, 'totalNotes') + 1), 'totalNotes')
            client.note.set(`${Math.floor(client.note.get(message.author.id, 'totalNotes') + 1)}_for_${message.author.id}`, { deleted: false })
            client.embeds.successWithTick(message, 'Note', client.lang.handle(message, 'Successfully added new note.', 'Pomyślnie dodano nową notatkę.'))
        }
    } else if (akcja === 'delete' || akcja === 'remove') {
        if (!content) return client.embeds.argsError(message, client.lang.handle(message, 'note remove <note ID>', 'note remove <ID>'))
        if (!client.note.get(`${content}_for_${message.author.id}`) === true) return client.embeds.error(message, client.lang.handle(message, 'Could not find that note', 'Nie znaleziono takiej notatki'))
        else if (client.note.get(`${content}_for_${message.author.id}`, 'deleted')) return client.embeds.error(message, client.lang.handle(message, 'Could not find that note', 'Nie znaleziono takiej notatki'))
        else {
            client.note.set(`${content}_for_${message.author.id}`, true, 'deleted')
            client.embeds.successWithTick(message, 'Note', client.lang.handle(message, 'Successfully removed that note.', 'Pomyślnie usunięto tą notatkę.'))
        }
    } else if (akcja === 'show' || akcja === 'list') {
        let embeds = []
        let notes = client.note.get(message.author.id, 'notes')
        notes.forEach(note => {
            if (client.note.get(`${note.number}_for_${message.author.id}`) && client.note.get(`${note.number}_for_${message.author.id}`, 'deleted')) {} else {
                let embed = new MessageEmbed()
                .setTitle('<a:yes:787665605464424468> Note')
                .addFields(
                    {
                        name: client.lang.handle(message, 'Content', 'Treść'),
                        value: note.content || 'Not defined'
                    },
                    {
                        name: client.lang.handle(message, 'Date', 'Data'),
                        value: note.date || 'Not defined'
                    },
                    {
                        name: client.lang.handle(message, 'Note ID', 'ID notatki'),
                        value: String(`**${note.number || 'Not defined'}**`)
                    },
                )
                .setColor('#5aff73')
                .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
                embeds.push(embed)
            }
        })
        if (embeds.length === 0) return client.embeds.error(message, client.lang.handle(message, 'You have no notes', 'Nie posiadasz notatek'))
        new (require('discord.js-reaction-menu')).menu({
            channel: message.channel,
            userID: message.author.id,
            pages: embeds,
            time: 120000,
        })
    }
}
module.exports.help = {
    name: 'note', 
    descriptionpl: 'Notatki użytkownika',
    descriptionen: 'User notes',
    usagepl: 'note <add | remove | show>',
    usageen: 'note <add | remove | show>',
    category: 'Informacyjne'
}
module.exports.conf = {
    aliases: ['notatki', 'notatka', 'notes'],
}