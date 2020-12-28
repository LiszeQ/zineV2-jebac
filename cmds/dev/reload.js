const { readdirSync } = require('fs')
module.exports.run = async (message, args, client) => {
    let akcja = args[0]
    if (!akcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl));
    else if (akcja === '%') {
        message.channel.send('Reloading')
        require('child_process').exec('pm2 restart 0')
    } else if (akcja === '&') {
        readdirSync((require('path')).join(__dirname + '/../../cmds')).forEach(dir => {
            const cmds = readdirSync((require('path')).join(__dirname + `/../../cmds/${dir}`)).filter(f => f.endsWith('.js'))
            for (const file of cmds) {
                client.commands.forEach(x => {
                    delete require.cache[require.resolve(`../${dir}/${file}`)];
                })
                const pull = require(`../${dir}/${file}`);
                client.commands.set(pull.help.name, pull);
            }
        })
        return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully reloaded all commands!', 'Pomyślnie przeładowano wszystkie komendy!'))
    } else try {
        if (!akcja) return client.embeds.argsError(message, client.lang.handle(message, this.help.usageen, this.help.usagepl));
        delete require.cache[require.resolve(`../${akcja}.js`)]
        client.commands.set(require(`../${akcja}.js`).help.name, require(`../${akcja}.js`))
        return client.embeds.successWithTick(message, client.lang.handle(message, 'Success', 'Sukces'), client.lang.handle(message, 'Successfully reloaded that command', 'Pomyślnie przeładowano tą komende'))
    } catch { return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy')) }
}
module.exports.help = {
    name: 'restart',
    descriptionpl: 'Restartuje bota albo komendę',
    descriptionen: 'Reloads bot or command',
    usagepl: 'restart <% / & / komenda>',
    usageen: 'restart <% / & / command>',
    category: 'Developerskie',
}
module.exports.conf = {
    aliases: ['rl'],
    permsLevel: 5,
}