const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message) => {
    if (!message.guild) return

    // Baza
    
    const guildSettings = {
        lang: 'en',
        prefix: '-',
        announcementChannel: 'Not specified',
        announcementMention: 'Not specified',
        modLogChannel: 'Not specified',
        suggestionsChannel: 'Not specified',
        welcomeModule: 'Off',
        welcomeChannel: 'Not specified',
        welcomeMessage: 'Hello {membermention}!',
        welcomeMessageColor: '#3bff00',
        welcomeEmbedTitle: 'Hello!',
        leaveModule: 'Off',
        leaveChannel: 'Not specified',
        leaveMessage: 'Bye {membertag}!',
        leaveMessageColor: '#ff0000',
        leaveEmbedTitle: 'Bye!',
        totalCases: 0,
        levelSystem: 'Off',
        levelNotifyChannel: 'Not specified',
        levelNotifyMessage: 'Gz {usermention}, you reached level {newlevel}! :tada:',
        requiredXP: 100,
        verificationRole: null,
        verificationChannel: null
    }

    const gbanSettings = {
        status: false,
        moderator: null,
        reason: null,
        date: null
    }

    const defaultBadges = {
        developer: false,
        staff: false,
        bughunter: false,
        zasluzony: false,
        partner: false,
        supporter: false,
        earlyaccess: false
    }

    const levelling = {
        user: `${message.author}`,
        guild: message.guild.id,
        xp: 0,
        level: 0,
    }

    const note = {
        totalNotes: 0,
        notes: []
    }

    const eco = {
        user: `${message.author}`,
        guild: message.guild.id,
        cash: 0,
        bank: 0,
        total: 0
    }

    client.base.ensure(message.guild.id, guildSettings);
    client.gbanManager.ensure(message.author.id, gbanSettings);
    client.badges.ensure(message.author.id, defaultBadges);
    client.infractions.ensure(`${message.author.id}_on_${message.guild.id}`, { history: [] })
    client.levels.ensure(`${message.author.id}_on_${message.guild.id}`, levelling)
    client.note.ensure(message.author.id, note)
    client.ver.ensure(`${message.author.id}_on_${message.guild.id}`, { isVerified: false })

    // EKONOMIA

    client.eco.ensure(`${message.author.id}_on_${message.guild.id}`, eco)
    client.eco.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'cash')) + parseInt(client.eco.get(`${message.author.id}_on_${message.guild.id}`, 'bank'))), 'total')

    // LEVELLING

    if (message.author.bot) return
    client.levels.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(client.levels.get(`${message.author.id}_on_${message.guild.id}`, 'xp') + Math.floor(Math.random() * 12) + 4),'xp')
    let xp = client.levels.get(`${message.author.id}_on_${message.guild.id}`, 'xp')
    let level = client.levels.get(`${message.author.id}_on_${message.guild.id}`, 'level')
    let reqXP = client.base.get(message.guild.id, 'requiredXP')
    if (xp >= reqXP && client.base.get(message.guild.id, 'levelSystem') === true) {
        if (client.base.get(message.guild.id, 'levelNotifyChannel') === 'Not specified' || client.base.get(message.guild.id, 'levelNotifyChannel') === 'Nie podano') return
        client.levels.set(`${message.author.id}_on_${message.guild.id}`, Math.floor(parseInt(level) + 1), 'level')
        client.levels.set(`${message.author.id}_on_${message.guild.id}`, 0, 'xp')
        message.guild.channels.cache.get(String(client.base.get(message.guild.id, 'levelNotifyChannel')).replace('<#', '').replace('>', '')).send(String(client.base.get(message.guild.id, 'levelNotifyMessage'))
            .replace('{newlevel}', Math.floor(parseInt(level) + 1))
            .replace('{usermention}', `${message.author}`)
        )
    }

    const prefix = client.base.get(message.guild.id, 'prefix')
    client.prefix = prefix;
    const mntn = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (mntn.test(message.content)) client.embeds.successWithCustomColor(message, '#7fd2ff', client.lang.handle(message, '<:mention:784387761364140072> Mention detected', '<:mention:784387761364140072> Wykryto wzmiankę'), client.lang.handle(message, `Command prefix: \`${prefix}\`\nTotal number of commands: **${client.commands.size}**\nHelp command: ${prefix}help \nMy **ping** is: ${client.ws.ping}ms.`, `Prefix komend: \`${prefix}\`\nŁączna ilość komend: **${client.commands.size}**\nKomenda pomocy: ${prefix}pomoc\nMój **ping** to: ${client.ws.ping}ms.`))
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    // GBAN

    if (!cmd || !message.content.startsWith(prefix)) return;
    if (client.gbanManager.get(message.author.id, 'status') && !client.config.perms.developer.includes(message.author.id)) {
        let embed = new MessageEmbed()
        .setTitle('<a:err:787665605968789544> Gban')
        .setDescription(client.lang.handle(message, 'You are globally banned. You cannot use __any bot command__.', 'Jesteś globalnie zbanowany. Nie możesz użyć __żadnej komendy bota__.'))
        .setColor('#ff4b4b')
        .addFields(
            {
                name: 'Moderator',
                value: client.gbanManager.get(message.author.id, 'moderator')
            },
            {
                name: client.lang.handle(message, 'Reason', 'Powód'),
                value: `\`${client.gbanManager.get(message.author.id, 'reason')}\``
            },
            {
                name: client.lang.handle(message, 'Date', 'Data'),
                value: client.gbanManager.get(message.author.id, 'date')
            }
        )
        .setFooter(client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
    }

    // OFF

    const cmdSettings = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-isDisabled`)
	const cmdSettings_guild = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`)
	const cmdSettings_chn = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`)
	const cmdSettings_global = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-isDisabled`)
	const allCmdOnGuild = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.guild.id}-isDisabled`)
    const allCmdOnChannel = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.channel.id}-isDisabled`)
    
    if (cmdSettings && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `That command is globally disabled\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-isDisabled-reason`)}\``, `Ta komenda jest globalnie wyłączona\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-isDisabled-reason`)}\``))
    if (cmdSettings_guild && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `That command is disabled on this guild\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled-reason`)}\``, `Ta komenda jest wyłączona na tym serwerze\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled-reason`)}\``))
    if (cmdSettings_chn && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `That command is disabled on this channel\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled-reason`)}\``, `Ta komenda jest wyłączona na tym kanale\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled-reason`)}\``))
    if (cmdSettings_global && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `All commands are globally disabled\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-isDisabled-reason`)}\``, `Wszystkie komendy zostały wyłączone przez właściciela bota\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-isDisabled-reason`)}\``))
    if (allCmdOnGuild && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `All commands on this guild are globally disabled\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.guild.id}-isDisabled-reason`)}\``, `Wszystkie komendy na tym serwerze zostały wyłączone przez administratora\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.guild.id}-isDisabled-reason`)}\``))
    if (allCmdOnChannel && !client.config.perms.developer.includes(message.member.user.id)) return client.embeds.error(message, client.lang.handle(message, `All commands on this channel are globally disabled\nReason: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.channel.id}-isDisabled-reason`)}\``, `Wszystkie komendy na tym kanale zostały wyłączone przez administratora\nPowód: \`${await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.channel.id}-isDisabled-reason`)}\``))
    
    const Discord = require('discord.js')
    if (cmd.conf && cmd.conf.requiredBotPerms) {
        if (!message.guild.member(client.user).hasPermission(cmd.conf.requiredBotPerms)) return client.embeds.error(message, client.lang.handle(message, `I don\'t have required permissions\nRequired permissions: \`${cmd.conf.requiredBotPerms.join(', ')}\``, `Nie posiadam wymaganych uprawnień do wykonania tej komendy\nWymagane uprawnienia: \`${cmd.conf.requiredBotPerms.join(', ')}\``))
    }

    // COOLDOWN

    if (!client.cooldowns.has(cmd.help.name)) {
        client.cooldowns.set(cmd.help.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(cmd.help.name);
    const cooldownAmount = (cmd.conf.cooldown || 4) * 1000;
  
    if (timestamps.has(message.author.id) && !client.config.perms.developer.includes(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        function convert(czas) {
            var pad = function(num, size) { return ('000' + num).slice(size * -1); },
            time = parseFloat(czas).toFixed(3),
            minutes = Math.floor(time / 60) % 60,
            seconds = Math.floor(time - minutes * 60);

           return `\`${pad(minutes, 2)}\` ${client.lang.handle(message, 'minutes and', 'minut i')} \`${pad(seconds, 2)}\` ${client.lang.handle(message, 'seconds.', 'sekund.')}`
        }
        if (now < expirationTime) {
            let t = (expirationTime - now)
            if ((t / 1000).toFixed() > 59) {
                const timeLeft = (expirationTime - now) / 1000;
                return client.embeds.error(message, client.lang.handle(message, `To use this command again you have to wait ${convert(timeLeft)}.`, `Aby użyć tą komendę ponownie musisz poczekać ${convert(timeLeft)}.`))
            } else {
                const timeLeft = (expirationTime - now) / 1000;
                return client.embeds.error(message, client.lang.handle(message, `To use this command again you have to wait \`${timeLeft.toFixed(0)}\` seconds.`, `Aby użyć tą komendę ponownie musisz poczekać \`${timeLeft.toFixed(0)}\` sekund.`))
            }
        }
    }
  
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if (client.functions.resolvePerms(message, cmd.conf.permsLevel || 1)) cmd.run(message, args, client).catch(err => { client.embeds.criticalError(message, err) })
    
    // UNHANDLED I ERRORY 
    client.on('error', (err) => {
        client.embeds.criticalError(message, err)
    })
}
module.exports.help = {
    name: 'message'
}