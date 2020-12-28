const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');

class NewClient extends Client {
    constructor(opcje) {
        super(opcje.clientOptions || {});
        this.commands = new Collection();
        this.aliases = new Collection();
        this.config = opcje.config ? require(`../${opcje.config}`) : {};
        this.token = '[ ZineSecurity: Hidden var ]';
    }
    _login(token) {
        super.login(token);
    }
    initCmds(client) {
        readdirSync((require('path')).join(__dirname + '/../cmds')).forEach(dir => {
            const cmds = readdirSync((require('path')).join(__dirname + `/../cmds/${dir}`)).filter(f => f.endsWith('.js'))
            for (const file of cmds) {
                const command = require((require('path')).join(__dirname + `/../cmds/${dir}/${file}`));
                client.commands.set(command.help.name, command);
                if (command.conf && command.conf.aliases) command.conf.aliases.forEach(a => client.aliases.set(a, command.help.name));
                console.log(`${require('chalk').red('➔')} ${require('chalk').white(' Załadowano komendę')} ${require('chalk').yellowBright(require('chalk').bold(command.help.name))} ${require('chalk').white(`(aliasy: ${require('chalk').cyan(command.conf && command.conf.aliases ? command.conf.aliases.join(', ') : 'Brak')})`)}`)
            }

            return this.commands;
        })
    }
    initEvents() {
        const plk = readdirSync(__dirname + '/../events').filter(f => f.split('.')[0] !== 'error' && f.endsWith('.js'))
        for (const file of plk) {
            const event = require(__dirname + `/../events/${file}`);
            super.on('error', () => { return })
            super.on(file.split('.')[0], (...args) => event.run(this, ...args))
            console.log(`${require('chalk').green('➔')} ${require('chalk').white(' Załadowano event')} ${require('chalk').yellowBright(require('chalk').bold(event.help.name))}`)
        }

        return this;
    }
}

module.exports = NewClient;