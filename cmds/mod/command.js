const db = require('quick.db');
module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    let opcja = args[1]
    let cmd = args[2]
    let reason = [...args].slice(3).join(' ') || client.lang.handle(message, 'Not specified', 'Nie podano')
    if (!akcja || !opcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    else if (akcja === 'enable' || akcja === 'on') {
        if (opcja === 'global') {
            let permsCheck = client.functions.resolvePerms(message, 5)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get(`cmd-all-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already enabled', 'Wszystkie komendy są już włączone'))
                    new db.table('commandsConfig').delete('cmd-all-isDisabled')
                    new db.table('commandsConfig').delete('cmd-all-isDisabled-reason')
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully enabled all commands.', 'Pomyślnie włączono wszystkie komendy.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already enabled', 'Ta komenda jest już włączona'))
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-isDisabled`)
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-isDisabled-reason`)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully enabled \`${cmd.help.name}\` command with reason ${reason}.`, `Pomyślnie włączono komendę \`${cmd.help.name}\` z powodem ${reason}.`))
                }
            }
        } else if (opcja === 'channel') {
            let permsCheck = client.functions.resolvePerms(message, 3)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get(`cmd-all-on-${message.channel.id}-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already enabled on this channel', 'Wszystkie komendy są już włączone na tym kanale'))
                    new db.table('commandsConfig').delete(`cmd-all-on-${message.channel.id}-isDisabled`)
                    new db.table('commandsConfig').delete(`cmd-all-on-${message.channel.id}-isDisabled-reason`)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully disabled all commands on this channel.', 'Pomyślnie włączono wszystkie komendy na tym kanale.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already enabled on this channel', 'Ta komenda jest już włączona na tym kanale'))
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`, true)
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully disabled \`${cmd.help.name}\` command on this channel with reason ${reason}.`, `Pomyślnie włączono komendę \`${cmd.help.name}\` na tym kanale z powodem ${reason}.`))
                }
            }
        } else if (opcja === 'guild') {
            let permsCheck = client.functions.resolvePerms(message, 4)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get(`cmd-all-on-${message.guild.id}-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already enabled on this guild', 'Wszystkie komendy są już włączone na tym serwerze'))
                    new db.table('commandsConfig').delete(`cmd-all-on-${message.guild.id}-isDisabled`)
                    new db.table('commandsConfig').delete(`cmd-all-on-${message.guild.id}-isDisabled-reason`)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully enabled all commands on this guild.', 'Pomyślnie włączono wszystkie komendy na tym serwerze.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`) || false
                    if (!fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already enabled on this guild', 'Ta komenda jest już włączona na tym serwerze'))
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`)
                    new db.table('commandsConfig').delete(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled-reason`)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully enabled \`${cmd.help.name}\` command on this guild with reason ${reason}.`, `Pomyślnie włączono komendę \`${cmd.help.name}\` na tym serwerze z powodem ${reason}.`))
                }
            }
        } else return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    } else if (akcja === 'disable' || akcja === 'off') {
        if (opcja === 'global') {
            let permsCheck = client.functions.resolvePerms(message, 5)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get('cmd-all-isDisabled') || false
                    if (!!fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already disabled', 'Wszystkie komendy są już wyłączone'))
                    new db.table('commandsConfig').set('cmd-all-isDisabled', true)
                    new db.table('commandsConfig').set('cmd-all-isDisabled-reason', reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully disabled all commands.', 'Pomyślnie wyłączono wszystkie komendy.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-isDisabled`) || false
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    if (!!fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already disabled', 'Ta komenda jest już wyłączona'))
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-isDisabled`, true)
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully disabled \`${cmd.help.name}\` command with reason ${reason}.`, `Pomyślnie wyłączono komendę \`${cmd.help.name}\` z powodem ${reason}.`))
                }
            }
        } else if (opcja === 'channel') {
            let permsCheck = client.functions.resolvePerms(message, 3)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get(`cmd-all-on-${message.channel.id}-isDisabled`) || false
                    if (fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already disabled on this channel', 'Wszystkie komendy są już wyłączone na tym kanale'))
                    new db.table('commandsConfig').set(`cmd-all-on-${message.channel.id}-isDisabled`, true)
                    new db.table('commandsConfig').set(`cmd-all-on-${message.channel.id}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully disabled all commands on this channel.', 'Pomyślnie wyłączono wszystkie komendy na tym kanale.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`) || false
                    if (fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already disabled on this channel', 'Ta komenda jest już wyłączona na tym kanale'))
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`, true)
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully disabled \`${cmd.help.name}\` command on this channel with reason ${reason}.`, `Pomyślnie wyłączono komendę \`${cmd.help.name}\` na tym kanale z powodem ${reason}.`))
                }
            }
        } else if (opcja === 'guild') {
            let permsCheck = client.functions.resolvePerms(message, 4)
            if (permsCheck) {
                if (cmd === '--all') {
                    let fnc = new db.table('commandsConfig').get(`cmd-all-on-${message.guild.id}-isDisabled`) || false
                    if (fnc) return client.embeds.error(message, client.lang.handle(message, 'All commands are already disabled on this guild', 'Wszystkie komendy są już wyłączone na tym serwerze'))
                    new db.table('commandsConfig').set(`cmd-all-on-${message.guild.id}-isDisabled`, true)
                    new db.table('commandsConfig').set(`cmd-all-on-${message.guild.id}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully disabled all commands on this guild.', 'Pomyślnie wyłączono wszystkie komendy na tym serwerze.'))
                } else {
                    cmd = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
                    if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
                    let fnc = new db.table('commandsConfig').get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`) || false
                    if (fnc) return client.embeds.error(message, client.lang.handle(message, 'That command are already disabled on this guild', 'Ta komenda jest już wyłączona na tym serwerze'))
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`, true)
                    new db.table('commandsConfig').set(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled-reason`, reason)
                    return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, `Successfully disabled \`${cmd.help.name}\` command on this guild with reason ${reason}.`, `Pomyślnie wyłączono komendę \`${cmd.help.name}\` na tym serwerze z powodem ${reason}.`))
                }
            }
        } else return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl))
    }
}
module.exports.help = {
    name: 'command',
    descriptionpl: 'Zarządzanie komendami',
    descriptionen: 'Manage command',
    usagepl: 'command <enable | disable> <global | channel | guild> <komenda | --all>',
    usageen: 'command <enable | disable> <global | channel | guild> <command | --all>',
    category: 'Moderacja',
}
module.exports.conf = {
    aliases: ['cmds', 'commandhandle', 'disable', 'enable', 'cmdh'],
    flags: {
        pl: ['\`--all\` - Wyłącza / włącza wszystkie komendy'],
        en: ['\`--all\` - Turns off / on all commands']
    }
}