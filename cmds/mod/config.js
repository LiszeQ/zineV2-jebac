const { MessageEmbed } = require('discord.js')
module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    let opcja = args[1]
    let nowaWartosc = [...args].slice(2).join(' ')
    if (!akcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (akcja === 'show') {
        if (String(opcja).includes('--vars', 0)) {
            let embed = new MessageEmbed()
            .setTitle('<a:yes2:787665605758156840> Config')
            .setDescription(
                '**Welcome and leave module:**\n\n\`{membermention}\` - ' + client.lang.handle(message, 'member mention', 'wzmianka użytkownika') + '\n' +
                '\`{memberid}\` - ' + client.lang.handle(message, 'member ID', 'ID użytkownika') + '\n' +
                '\`{membertag}\` - ' + client.lang.handle(message, 'member tag', 'Tag użytkownika') + '\n' +
                '\`{membercreationdate}\` - ' + client.lang.handle(message, 'member account creation date', 'Data założenia konta użytkownika') + '\n' +
                '\`{guildname}\` - ' + client.lang.handle(message, 'member guild name', 'Nazwa serwera, na który dołączył użytkownik') + '\n' +
                '\`{guildid}\` - ' + client.lang.handle(message, 'member guild ID', 'ID serwera, na który dołączył użytkownik') + '\n' +
                '\`{guildmembers}\` - ' + client.lang.handle(message, 'member guild members', 'Liczba użytkowników serwera, na który dołączył użytkownik' + '\n\n' +
                '**New level message:**\n\n\`{usermention}\` - ' + client.lang.handle(message, 'mention a user with a new level', 'Wzmianka użytkownika, który zdobył nowy poziom') + '\n' +
                '\`{newlevel}\` - ' + client.lang.handle(message, 'new user level', 'nowy poziom użytkownika'))
            )
            .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
            .setColor('#7289da')
            return message.channel.send(embed)
        }
        let embed = new MessageEmbed()
        .setTitle('<a:yes2:787665605758156840> Config')
        .setDescription(client.lang.handle(message, `In this window, you can see guild configuration.\nTo change a specific setting use \`${client.prefix}config set <setting name> <new value>\`.\nVars: \`${client.prefix}config show --vars\`.`, `W tym oknie możesz zobaczyć konfigurację serwera.\nAby zmienić określone ustawienie, użyj \`${client.prefix}config set <nazwa ustawienia> <nowa wartość> \`.\nZmienne:\`${client.prefix}config show --vars \`.`))
        .addFields(
            {
                name: client.lang.handle(message, 'Language (\`lang\`)', 'Język (\`lang\`)'),
                value: String(client.base.get(message.guild.id, 'lang')).replace('pl', 'Polski').replace('en', 'English') || 'English',
                inline: true
            },
            {
                name: 'Prefix (\`prefix\`)',
                value: client.base.get(message.guild.id, 'prefix'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Announcement channel (\`announcementChannel\`)', 'Kanał ogłoszeń (\`announcementChannel\`)'),
                value: client.base.get(message.guild.id, 'announcementChannel'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Announcement mention (\`announcementMention\`)', 'Wzmianka ogłoszeń (\`announcementMention\`)'),
                value: client.base.get(message.guild.id, 'announcementMention'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Modlog channel (\`modLogChannel\`)', 'Kanał logów moderacyjnych (\`modLogChannel\`)'),
                value: client.base.get(message.guild.id, 'modLogChannel'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Suggestions channel (\`suggestionsChannel\`)', 'Kanał propozycji (\`suggestionsChannel\`)'),
                value: client.base.get(message.guild.id, 'suggestionsChannel'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Welcomer (\`welcomeModule\`)', 'Powitania (\`welcomeModule\`)'),
                value: String(client.base.get(message.guild.id, 'welcomeModule')).replace(true, client.lang.handle(message, 'Enabled', 'Włączone')).replace(false || null, client.lang.handle(message, 'Disabled', 'Wyłączone')),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Welcome channel (\`welcomeChannel\`)', 'Kanał powitań (\`welcomeChannel\`)'),
                value: client.base.get(message.guild.id, 'welcomeChannel') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Welcome message (\`welcomeMessage\`) [Vars enabled]', 'Wiadomość powitalna (\`welcomeMessage\`) [Zmienne dozwolone]'),
                value: client.base.get(message.guild.id, 'welcomeMessage') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
            {
                name: client.lang.handle(message, 'Welcome message color (\`welcomeMessageColor\`)', 'Kolor wiadomości powitalnej (\`welcomeMessageColor\`)'),
                value: client.base.get(message.guild.id, 'welcomeMessageColor') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Welcome message embed title (\`welcomeEmbedTitle\`)', 'Tytuł wiadomości powitalnej (\`welcomeEmbedTitle\`)'),
                value: client.base.get(message.guild.id, 'welcomeEmbedTitle') || 'Hello!',
                inline: true
            },
            {
                name: client.lang.handle(message, 'Leaver (\`leaveModule\`)', 'Pożegnania (\`leaveModule\`)'),
                value: String(client.base.get(message.guild.id, 'leaveModule')).replace(true, client.lang.handle(message, 'Enabled', 'Włączone')).replace(false || null, client.lang.handle(message, 'Disabled', 'Wyłączone')),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Leave channel (\`welcomeChannel\`)', 'Kanał pożegnań (\`welcomeChannel\`)'),
                value: client.base.get(message.guild.id, 'leaveChannel') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Leave message (\`leaveMessage\`) [Vars enabled]', 'Wiadomość pożegnalna (\`leaveMessage\`) [Zmienne dozwolone]'),
                value: client.base.get(message.guild.id, 'leaveMessage') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
            {
                name: client.lang.handle(message, 'Leave message color (\`leaveMessageColor\`)', 'Kolor wiadomości pożegnalnej (\`leaveMessageColor\`)'),
                value: client.base.get(message.guild.id, 'leaveMessageColor') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
            {
                name: client.lang.handle(message, 'Leave message embed title (\`leaveEmbedTitle\`)', 'Tytuł wiadomości pożegnalnej (\`leaveEmbedTitle\`)'),
                value: client.base.get(message.guild.id, 'leaveEmbedTitle') || 'Hello!',
                inline: true
            },
            {
                name: client.lang.handle(message, 'Levelling (\`levelSystem\`)', 'Level system (\`levelSystem\`)'),
                value: String(client.base.get(message.guild.id, 'levelSystem')).replace(true, client.lang.handle(message, 'Enabled', 'Włączone')).replace(false || null, client.lang.handle(message, 'Disabled', 'Wyłączone')),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Required XP (\`requiredXP\`)', 'Wymagane XP (\`requiredXP\`)'),
                value: client.base.get(message.guild.id, 'requiredXP'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Level notify channel (\`levelNotifyChannel\`)', 'Kanał powiadomień o nowym poziomie (\`levelNotifyChannel\`)'),
                value: client.base.get(message.guild.id, 'levelNotifyChannel') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: true
            },
            {
                name: client.lang.handle(message, 'Level notify message (\`levelNotifyMessage\`) [Vars enabled]', 'Wiadomość wysyłana po zdobyciu nowego poziomu (\`levelNotifyMessage\`) [Zmienne dozwolone]'),
                value: client.base.get(message.guild.id, 'levelNotifyMessage') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
            {
                name: client.lang.handle(message, 'Verification role (\`verificationRole\`)', 'Rola nadawana po weryfikacji (\`verificationRole\`)'),
                value: client.base.get(message.guild.id, 'verificationRole') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
            {
                name: client.lang.handle(message, 'Verification channel (\`verificationChannel\`)', 'Kanał weryfikacji (\`verificationChannel\`)'),
                value: client.base.get(message.guild.id, 'verificationChannel') || client.lang.handle(message, 'Not setup', 'Nie ustawiono'),
                inline: false
            },
        )
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#7289da')
        return message.channel.send(embed)
    } else if (akcja === 'set') {
        if (!nowaWartosc) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
        switch(opcja) {
            case 'lang':
                if (nowaWartosc === 'pl') {
                    client.base.set(message.guild.id, 'pl', 'lang')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated language.', 'Pomyślnie zmieniono język bota.'))
                } else if (nowaWartosc === 'en') {
                    client.base.set(message.guild.id, 'en', 'lang')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated language.', 'Pomyślnie zmieniono język bota.'))
                } else return client.embeds.error(message, client.lang.handle(message, 'You can only enter one of the following options: \`en\`/\`pl\`', 'Możesz podać tylko jedną opcję z podanych: \`en\`/\`pl\`'))
                break
            case 'prefix':
                if (String(nowaWartosc).length > 3) return client.embeds.error(message, client.lang.handle(message, 'Prefix cannot contains more than 3 characters', 'Prefix nie może zawierać więcej niż 3 znaki'))
                else {
                    client.base.set(message.guild.id, nowaWartosc, 'prefix')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated guild prefix.', 'Pomyślnie zmieniono prefix bota na tym serwerze.'))
                }
                break
            case 'announcementChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'suggestionsChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted announcement channel.', 'Pomyślnie usunięto kanał ogłoszeń.'))
                }
                nowaWartosc = message.mentions.channels.first() || message.guild.channels.cache.get(nowaWartosc)
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'announcementChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated announcement channel.', 'Pomyślnie ustawiono kanał ogłoszeń.'))
                }
                break
            case 'announcementMention':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'announcementMention')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted announcement mention.', 'Pomyślnie usunięto wzmiankę ogłoszeń.'))
                }
                nowaWartosc = message.guild.roles.cache.get(String(nowaWartosc).replace('<@&', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that role on this guild', 'Nie znaleziono takiej roli na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'announcementMention')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated announcement mention.', 'Pomyślnie ustawiono wzmiankę ogłoszeń.'))
                }
                break
            case 'modLogChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'modLogChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted modlog channel.', 'Pomyślnie usunięto kanał logów moderacyjnych.'))
                }
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'modLogChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated modlog channel.', 'Pomyślnie ustawiono kanał logów moderacyjnych.'))
                }
                break
            case 'suggestionsChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'suggestionsChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted suggestions channel.', 'Pomyślnie usunięto kanał propozycji.'))
                }
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'suggestionsChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated suggestions channel.', 'Pomyślnie ustawiono kanał propozycji.'))
                }
                break
            case 'welcomeModule':
                if (nowaWartosc === 'yes' || nowaWartosc === 'tak') {
                    client.base.set(message.guild.id, true, 'welcomeModule')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully enabled welcome module.', 'Pomyślnie włączono moduł powitań.'))
                } else if (nowaWartosc === 'no' || nowaWartosc === 'nie') {
                    client.base.set(message.guild.id, false, 'welcomeModule')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully disabled welcome module', 'Pomyślnie wyłączono moduł powitań.'))
                } else return client.embeds.error(message, client.lang.handle(message, 'You can only enter one of the following options: \`yes\`/\`no\`', 'Możesz podać tylko jedną opcję z podanych: \`tak\`/\`nie\`'))
                break
            case 'welcomeChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'welcomeChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted welcome channel.', 'Pomyślnie usunięto kanał powitań.'))
                }
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'welcomeChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated welcome channel.', 'Pomyślnie ustawiono kanał powitań.'))
                }
                break
            case 'welcomeMessage':
                nowaWartosc = require('discord.js').Util.escapeMarkdown(require('discord.js').Util.cleanCodeBlockContent(require('discord.js').Util.removeMentions(nowaWartosc)))
                if (String(nowaWartosc).length > 100) return client.embeds.error(message, client.lang.handle(message, 'Welcome message cannot contains more than 100 characters', 'Wiadomość powitalna nie może zawierać więcej niż 100 znaków'))
                client.base.set(message.guild.id, nowaWartosc, 'welcomeMessage')
                client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated welcome message to ' + `\`${nowaWartosc}\`.`, 'Pomyślnie ustawiono wiadomość powitalną na ' + `\`${nowaWartosc}\`.`))
                
                // PRZYKŁAD

                client.embeds.successWithTick(message, client.lang.handle(message, 'Example', 'Przykład'), String(nowaWartosc)
                    .replace('{membermention}', `${message.author}`)
                    .replace('{memberid}', `${message.author.id}`)
                    .replace('{membertag}', `${message.author.tag}`)
                    .replace('{membercreationdate}', `${require('moment')(message.member.user.createdAt).format('YYYY-MM-DD HH:ss')}`)
                    .replace('{guildname}', `${message.guild.name}`)
                    .replace('{guildid}', `${message.guild.id}`)
                    .replace('{guildmembers}', `${message.guild.members.cache.filter(m => !m.user.bot).size}`)
                )
                break
            case 'welcomeEmbedTitle':
                nowaWartosc = require('discord.js').Util.escapeMarkdown(require('discord.js').Util.cleanCodeBlockContent(require('discord.js').Util.removeMentions(nowaWartosc)))
                if (String(nowaWartosc).length > 100) if (String(nowaWartosc).length > 100) return client.embeds.error(message, client.lang.handle(message, 'Welcome message title cannot contains more than 100 characters', 'Tytuł wiadomości powitalnej nie może zawierać więcej niż 100 znaków'))
                client.base.set(message.guild.id, nowaWartosc, 'welcomeEmbedTitle')
                client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated welcome message embed title.', 'Pomyślnie ustawiono tytuł wiadomości powitalnej.'))
                break
            case 'welcomeMessageColor':
                let reg = /^#[0-9A-F]{6}$/i
                if (!reg.test(nowaWartosc)) return client.embeds.error(message, client.lang.handle(message, 'Please type valid HEX color', 'Podaj właściwy kolor HEX'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'welcomeMessageColor')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated welcome message embed color.', 'Pomyślnie ustawiono kolor wiadomości powitalnej.'))
                }
                break
            case 'leaveModule':
                if (nowaWartosc === 'yes' || nowaWartosc === 'tak') {
                    client.base.set(message.guild.id, true, 'leaveModule')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully enabled leave module.', 'Pomyślnie włączono moduł pożegnań.'))
                } else if (nowaWartosc === 'no' || nowaWartosc === 'nie') {
                    client.base.set(message.guild.id, false, 'leaveModule')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully disabled leave module.', 'Pomyślnie wyłączono moduł pożegnań.'))
                } else return client.embeds.error(message, client.lang.handle(message, 'You can only enter one of the following options: \`yes\`/\`no\`', 'Możesz podać tylko jedną opcję z podanych: \`tak\`/\`nie\`'))
                break
            case 'leaveChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'leaveChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted leave channel.', 'Pomyślnie usunięto kanał pożegnań.'))
                }
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'leaveChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated leave channel.', 'Pomyślnie ustawiono kanał pożegnań.'))
                }
                break
            case 'leaveMessage':
                nowaWartosc = require('discord.js').Util.escapeMarkdown(require('discord.js').Util.cleanCodeBlockContent(require('discord.js').Util.removeMentions(nowaWartosc)))
                if (String(nowaWartosc).length > 100) return client.embeds.error(message, client.lang.handle(message, 'Leave message cannot contains more than 100 characters', 'Wiadomość pożegnalna nie może zawierać więcej niż 100 znaków'))
                client.base.set(message.guild.id, `${nowaWartosc}`, 'leaveMessage')
                client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated leave message to ' + `\`${nowaWartosc}\`.`, 'Pomyślnie ustawiono wiadomość pożegnalną na ' + `\`${nowaWartosc}\`.`))
                
                // PRZYKŁAD

                client.embeds.successWithTick(message, client.lang.handle(message, 'Example', 'Przykład'), String(nowaWartosc)
                    .replace('{membermention}', `${message.author}`)
                    .replace('{memberid}', `${message.author.id}`)
                    .replace('{membertag}', `${message.author.tag}`)
                    .replace('{membercreationdate}', `${require('moment')(message.member.user.createdAt).format('YYYY-MM-DD HH:ss')}`)
                    .replace('{guildname}', `${message.guild.name}`)
                    .replace('{guildid}', `${message.guild.id}`)
                    .replace('{guildmembers}', `${message.guild.members.cache.filter(m => !m.user.bot).size}`)
                )
                break
            case 'leaveEmbedTitle':
                nowaWartosc = require('discord.js').Util.escapeMarkdown(require('discord.js').Util.cleanCodeBlockContent(require('discord.js').Util.removeMentions(nowaWartosc)))
                if (String(nowaWartosc).length > 100) if (String(nowaWartosc).length > 100) return client.embeds.error(message, client.lang.handle(message, 'Leave message title cannot contains more than 100 characters', 'Tytuł wiadomości pożegnalnej nie może zawierać więcej niż 100 znaków'))
                client.base.set(message.guild.id, nowaWartosc, 'leaveEmbedTitle')
                client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated leave message embed title.', 'Pomyślnie ustawiono tytuł wiadomości pożegnalnej.'))
                break
            case 'leaveMessageColor':
                let reg2 = /^#[0-9A-F]{6}$/i
                if (!reg2.test(nowaWartosc)) return client.embeds.error(message, client.lang.handle(message, 'Please type valid HEX color', 'Podaj właściwy kolor HEX'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'leaveMessageColor')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated leave message embed color.', 'Pomyślnie ustawiono kolor wiadomości pożegnalnej.'))
                }
                break
            case 'levelSystem':
                if (nowaWartosc === 'yes' || nowaWartosc === 'tak') {
                    client.base.set(message.guild.id, true, 'levelSystem')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully enabled levelling.', 'Pomyślnie włączono moduł poziomów.'))
                } else if (nowaWartosc === 'no' || nowaWartosc === 'nie') {
                    client.base.set(message.guild.id, false, 'levelSystem')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully disabled levelling.', 'Pomyślnie wyłączono moduł poziomów.'))
                } else return client.embeds.error(message, client.lang.handle(message, 'You can only enter one of the following options: \`yes\`/\`no\`', 'Możesz podać tylko jedną opcję z podanych: \`tak\`/\`nie\`'))
                break
            case 'requiredXP':
                function checkN(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
                if (!checkN(nowaWartosc) || nowaWartosc <= 0 || nowaWartosc > 2000) return client.embeds.error(message, client.lang.handle(message, 'Please type correct XP number smaller than 2000', 'Podaj prawidłową liczbę XP mniejszą niż 2000'))
                else {
                    client.base.set(message.guild.id, parseInt(nowaWartosc), 'requiredXP')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated required XP.', 'Pomyślnie zmieniono liczbę wymaganego XP.'))
                }
                break
            case 'levelNotifyChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, client.lang.handle(message, 'Not specified', 'Nie podano'), 'levelNotifyChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted level notify channel.', 'Pomyślnie usunięto kanał powiadomień o zdobyciu nowego poziomu.'))
                }
                nowaWartosc = message.mentions.channels.first() || message.guild.channels.cache.get(nowaWartosc)
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'levelNotifyChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated level notify channel.', 'Pomyślnie ustawiono kanał powiadomień o zdobyciu nowego poziomu.'))
                }
                break
            case 'levelNotifyMessage':
                nowaWartosc = require('discord.js').Util.removeMentions(nowaWartosc)
                if (String(nowaWartosc).length > 100) return client.embeds.error(message, client.lang.handle(message, 'Level notify message cannot contains more than 100 characters', 'Wiadomość wysyłana przy zdobyciu nowego poziomu nie może zawierać więcej niż 100 znaków'))
                client.base.set(message.guild.id, `${nowaWartosc}`, 'levelNotifyMessage')
                client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated level notify message to ' + `\`${nowaWartosc}\`.`, 'Pomyślnie ustawiono wiadomość wysyłaną przy zdobyciu nowego poziomu na ' + `\`${nowaWartosc}\`.`))
                
                // PRZYKŁAD

                client.embeds.successWithTick(message, client.lang.handle(message, 'Example', 'Przykład'), String(nowaWartosc)
                    .replace('{usermention}', `${message.author}`)
                    .replace('{newlevel}', client.levels.get(`${message.author.id}_on_${message.guild.id}`, 'level'))
                )
                break
            case 'verificationRole':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, null, 'verificationRole')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted verification role.', 'Pomyślnie usunięto rolę nadawaną po weryfikacji.'))
                }
                nowaWartosc = message.guild.roles.cache.get(String(nowaWartosc).replace('<@&', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that role on this guild', 'Nie znaleziono takiej roli na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'verificationRole')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated verification role.', 'Pomyślnie ustawiono rolę nadawaną po weryfikacji.'))
                }
                break
            case 'verificationChannel':
                if (nowaWartosc === 'off' || nowaWartosc === 'default') {
                    client.base.set(message.guild.id, null, 'verificationChannel')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully deleted verification channel.', 'Pomyślnie usunięto kanał weryfikacji.'))
                }
                nowaWartosc = message.mentions.channels.first() || message.guild.channels.cache.get(nowaWartosc)
                nowaWartosc = message.guild.channels.cache.get(String(nowaWartosc).replace('<#', '').replace('>', ''))
                if (!nowaWartosc) return client.embeds.error(message, client.lang.handle(message, 'Could not find that channel on this guild', 'Nie znaleziono takiego kanału na tym serwerze'))
                else {
                    client.base.set(message.guild.id, `${nowaWartosc}`, 'verificationChannel')
                    client.embeds.successWithTick(message, client.lang.handle(message, 'Config', 'Konfiguracja'), client.lang.handle(message, 'Successfully updated verification channel.', 'Pomyślnie ustawiono kanał weryfikacji.'))
                }
                break
            default:
                client.embeds.error(message, client.lang.handle(message, 'You entered invalid option', 'Podałeś niewłaściwą opcję'))
                break
        }
    }
}
module.exports.help = {
    name: 'config',
    descriptionpl: 'Konfiguracja serwera',
    descriptionen: 'Guild configuration',
    usagepl: 'config <show | set> <ustawienie> <nowa wartość>',
    usageen: 'config <show | set> <settings> <new setting>',
    category: 'Moderacja',
}
module.exports.conf = {
    aliases: ['conf', 'c'],
    requiredBotPerms: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
}