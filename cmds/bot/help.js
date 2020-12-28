const { MessageEmbed } = require('discord.js');
module.exports.run = async (message, args, client) => {
    if (!args[0]) {
        let embed1 = new MessageEmbed()
        .setTitle('<:question:784395868254109697> Help')
        .setDescription(client.lang.handle(message, `Welcome to the interactive help menu!\nYou will find the necessary information about all bot commands here.\n\n**Info:**\n\nBot prefix:\`${client.prefix}\`\nNumber of commands: **${client.commands.size}**\nInformation about a specific command:\`${client.prefix}help [command] \`\nTo move between the different pages of commands, use reactions.\n\nDisabled commands are ~~strikethrough~~.`, `Witaj w interaktywnym menu pomocy!\nZnajdziesz tu niezbędne informacje na temat wszystkich komend bota.\n\n**Informacje:**\n\nPrefix bota: \`${client.prefix}\`\nIlość komend: **${client.commands.size}**\nInformacje o konkretnej komendzie: \`${client.prefix}pomoc [cmd]\`\nAby poruszać się pomiędzy poszczególnymi stronami komend użyj reakcji.\n\nWyłączone komendy są ~~przekreślone~~.`))
		.setColor('#7fd2ff')
		.setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))

		function isDisabled(command) {
			const cmdSettings = (new (require('quick.db')).table('commandsConfig')).get(`cmd-${command}-isDisabled`)
			const cmdSettings_guild = (new (require('quick.db')).table('commandsConfig')).get(`cmd-${command}-on-${message.guild.id}-isDisabled`)
			const cmdSettings_chn = (new (require('quick.db')).table('commandsConfig')).get(`cmd-${command}-on-${message.channel.id}-isDisabled`)
			const cmdSettings_global = (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-isDisabled`)
			const allCmdOnGuild = (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.guild.id}-isDisabled`)
			const allCmdOnChannel = (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.channel.id}-isDisabled`)
			if (
				cmdSettings ||
				cmdSettings_guild ||
				cmdSettings_chn ||
				cmdSettings_global ||
				allCmdOnChannel ||
				allCmdOnGuild
			) return true
			else return false
		}

        let embed2 = new MessageEmbed()
        .setTitle('<:question:784395868254109697> Help')
        .addFields(
            {
                name: client.lang.handle(message, '<:dev:784398720749142076> Developers', '<:dev:784398720749142076> Developerskie'),
                value: client.commands.filter(cmd => cmd.help.category === 'Developerskie').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
            },
            {
                name: '<:bot:784400326211928094> Bot',
                value: client.commands.filter(cmd => cmd.help.category === 'Bot').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
			{
                name: client.lang.handle(message, '<:fun:784715708528328736> Fun', '<:fun:784715708528328736> Zabawa'),
                value: client.commands.filter(cmd => cmd.help.category === 'Zabawa').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
			{
                name: client.lang.handle(message, ':notes: Music', ':notes: Muzyka'),
                value: client.commands.filter(cmd => cmd.help.category === 'Muzyka').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
			{
                name: client.lang.handle(message, '<:dev:785829525653028884> Moderation', '<:dev:785829525653028884> Moderacja'),
                value: client.commands.filter(cmd => cmd.help.category === 'Moderacja').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
			{
                name: client.lang.handle(message, '<:information:786946316181045298> Information', '<:information:786946316181045298> Informacyjne'),
                value: client.commands.filter(cmd => cmd.help.category === 'Informacyjne').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
			{
                name: client.lang.handle(message, '<:top:788691060054163456> Levelling', '<:top:788691060054163456> Levelling'),
                value: client.commands.filter(cmd => cmd.help.category === 'Levelling').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
			},
        )
		.setColor('#7fd2ff')
		.setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))

		let embed3 = new MessageEmbed()
			.setTitle('<:question:784395868254109697> Help')
			.addFields(
				{
					name: client.lang.handle(message, '<:money:789101191194738688> Economy', '<:money:789101191194738688> Ekonomia'),
					value: client.commands.filter(cmd => cmd.help.category === 'Ekonomia').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
				},
				{
					name: '<a:gv:789767201351663647> Giveaway',
					value: client.commands.filter(cmd => cmd.help.category === 'Giveaway').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
				},
				{
					name: '<:tick:784352956400402482> Verification',
					value: client.commands.filter(cmd => cmd.help.category === 'Weryfikacja').map(cmd => isDisabled(cmd.help.name) ? `~~\`${cmd.help.name}\`~~` : `\`${cmd.help.name}\``).join(', ') || client.lang.handle(message, 'None', 'Brak')
				}
			)
			.setColor('#7fd2ff')
			.setFooter(message.client.lang.handle(message, `Invoked on request ${message.author.tag} (${message.author.id})`, `Wywołano na życzenie ${message.author.tag} (${message.author.id})`), message.author.displayAvatarURL({ dynamic: true }))

        new (require('discord.js-reaction-menu')).menu({
            channel: message.channel,
            userID: message.author.id,
            pages: [
                embed1,
                embed2,
				embed3
            ],
            time: 120000,
        })
    } else {
        const cmd = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
        if (!cmd) return client.embeds.error(message, client.lang.handle(message, 'Could not find that command', 'Nie znaleziono takiej komendy'))
        const cmdSettings = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-isDisabled`)
		const cmdSettings_guild = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.guild.id}-isDisabled`)
		const cmdSettings_chn = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-${cmd.help.name}-on-${message.channel.id}-isDisabled`)
		const cmdSettings_global = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-isDisabled`)
		const allCmdOnGuild = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.guild.id}-isDisabled`)
		const allCmdOnChannel = await (new (require('quick.db')).table('commandsConfig')).get(`cmd-all-on-${message.channel.id}-isDisabled`)
		let disabled = false
		if (
			cmdSettings || 
			cmdSettings_guild || 
			cmdSettings_chn || 
			cmdSettings_global || 
			allCmdOnChannel || 
			allCmdOnGuild
		) disabled = true

		const aliasy = cmd.conf.aliases
		let embed = new MessageEmbed()
		.setColor('#5aff73')
		.setTitle(`<a:yes:787665605464424468> ${client.lang.handle(message, 'Detailed informations about command', 'Szczegółowe informacje o komendzie')}`)
		.setDescription(client.lang.handle(message, '<> - required argument\n[] - optional argument\n| - single choice argument', '<> - argument obowiązkowy\n[] - argument opcjonalny\n| - argument jednokrotnego wyboru'))
		.addField(client.lang.handle(message, 'Name', 'Nazwa'), cmd.help.name)
		.addField(client.lang.handle(message, 'Description', 'Opis'), client.lang.handle(message, cmd.help.descriptionen, cmd.help.descriptionpl) || client.lang.handle(message, 'None', 'Brak'))
		.addField(client.lang.handle(message, 'Category', 'Kategoria'), client.lang.handle(
			message, 
			`${cmd.help.category}`
				.replace('Moderacja', 'Moderation')
				.replace('Przydatne', 'Utils')
				.replace('Zabawa', 'Fun')
				.replace('Informacyjne', 'Information')
				.replace('Ekonomia', 'Economy')
				.replace('Weryfikacja', 'Verification')
				.replace('Developerskie', 'Developers')
				.replace('Muzyka', 'Music'), 
			cmd.help.category
		)
		|| client.lang.handle(message, 'Other', 'Inna'))
		.addField('Cooldown', cmd.conf.cooldown ? `${require('better-ms').humanize(Math.floor(cmd.conf.cooldown * 1000), { verbose: true })}`
			.replace('seconds', client.lang.handle(message, 'seconds', 'sekund / -y'))
			.replace('minutes', client.lang.handle(message, 'minutes', 'minut / -y'))
			.replace('hours', client.lang.handle(message, 'hours', 'godzin / -y'))
			.replace('days', client.lang.handle(message, 'days', 'dni'))
		: client.lang.handle(message, '4 seconds', '4 sekund'))
		.addField(client.lang.handle(message, 'Is disabled?', 'Wyłączona?'), `${disabled ? client.lang.handle(message, 'Yes', 'Tak') : client.lang.handle(message, 'No', 'Nie')}`)
		.addField(client.lang.handle(message, 'Aliases', 'Aliasy'), aliasy ? `\`${aliasy.join(', ')}\`` : aliasy || client.lang.handle(message, 'None', 'Brak'))
        .addField(client.lang.handle(message, 'Command usage', 'Użycie komendy'), client.lang.handle(message, `\`${cmd.help.usageen || client.lang.handle(message, 'None', 'Brak')}\``, `\`${cmd.help.usagepl || client.lang.handle(message, 'None', 'Brak')}\``) || client.lang.handle(message, 'None', 'Brak'))
        .addField(client.lang.handle(message, 'Required bot permissions', 'Wymagane uprawnienia bota'), cmd.conf.requiredBotPerms ? '```' + cmd.conf.requiredBotPerms.join(', ') + '```' : '```\nEMBED_LINKS```')
		if (cmd.conf.flags && cmd.conf.flags.en && cmd.conf.flags.pl) embed.addField(client.lang.handle(message, 'Command flags', 'Flagi komendy'), client.lang.handle(message, cmd.conf.flags.en.join('\n'), cmd.conf.flags.pl.join('\n')))
		return message.channel.send(embed);
    }
}
module.exports.help = {
    name: 'help',
    descriptionpl: 'Komenda pomocy.',
    descriptionen: 'List of all commands.',
    usagepl: 'help [cmd]',
    usageen: 'help [command]',
    category: 'Bot',
    permsLevel: 1,
}
module.exports.conf = {
    aliases: ['pomoc', 'cmds', 'cmd', 'listakomend', 'cmdslist', 'h'],
    requiredBotPerms: ['ADD_REACTIONS', 'MANAGE_MESSAGES'],
    cooldown: 5,
}