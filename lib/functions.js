class functionsManager {
    resolvePerms(message, requiredPermsLevel) {
        if (!message || !requiredPermsLevel) throw new TypeError('Please type required arguments')
        let userPerms = 1
        let perms = message.client.lang.handle(message, '1 | User', '1 | Użytkownik');
        if (message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('MANAGE_MESSAGES')) userPerms = 2;
        if (message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('MANAGE_MESSAGES')) perms = '2 | Moderator';
        if (message.member.hasPermission('ADMINISTRATOR')) userPerms = 3;
        if (message.member.hasPermission('ADMINISTRATOR')) perms = '3 | Administrator';
        if (message.author.id === message.guild.ownerID)  {
            userPerms = 4;
            perms = message.client.lang.handle(message, '4 | Server owner', '4 | Właściciel serwera');
        }
        if (message.client.config.perms.developer.includes(message.author.id)) userPerms = 5;
        if (message.client.config.perms.developer.includes(message.author.id)) perms = message.client.lang.handle(message, '5 | Developer', '5 | Programista');

        if (userPerms < 2 && requiredPermsLevel === 2) return message.client.embeds.error(message, message.client.lang.handle(message, `You don\'t have required permissions\n\nYour permissions: \`${perms}\`\nRequired permissions: \`2 | Moderator\``, `Nie posiadasz wymaganych uprawnień\n\nPosiadane uprawnienia: \`${perms}\`\nWymagane uprawnienia: \`2 | Moderator\``))
        if (userPerms < 3 && requiredPermsLevel === 3) return message.client.embeds.error(message, message.client.lang.handle(message, `You don\'t have required permissions\n\nYour permissions: \`${perms}\`\nRequired permissions: \`3 | Administrator\``, `Nie posiadasz wymaganych uprawnień\n\nPosiadane uprawnienia: \`${perms}\`\nWymagane uprawnienia: \`3 | Administrator\``))
        if (userPerms < 4 && requiredPermsLevel === 4) return message.client.embeds.error(message, message.client.lang.handle(message, `You don\'t have required permissions\n\nYour permissions: \`${perms}\`\nRequired permissions: \`4 | Guild owner\``, `Nie posiadasz wymaganych uprawnień\n\nPosiadane uprawnienia: \`${perms}\`\nWymagane uprawnienia: \`4 | Właściciel serwera\``))
        if (userPerms < 5 && requiredPermsLevel === 5) return message.client.embeds.error(message, message.client.lang.handle(message, `You don\'t have required permissions\n\nYour permissions: \`${perms}\`\nRequired permissions: \`5 | Developer\``, `Nie posiadasz wymaganych uprawnień\n\nPosiadane uprawnienia: \`${perms}\`\nWymagane uprawnienia: \`5 | Programista\``))
        else return true
    }
    pushBadges(message, user) {
        if (!message || !user) throw new TypeError('Please type required arguments')
        let badges = [];
        if (message.client.badges.get(user.id, 'developer')) badges.push('<:dev:784398720749142076>');
        if (message.client.badges.get(user.id, 'staff')) badges.push('<:dev:785829525653028884>');
        if (message.client.badges.get(user.id, 'bughunter')) badges.push('<:bughunter:786941682083037204>');
        if (message.client.badges.get(user.id, 'zasluzony')) badges.push('<:deserver:786942091883708486>');
        if (message.client.badges.get(user.id, 'partner')) badges.push('<:partner:786942330133413918>');
        if (message.client.badges.get(user.id, 'supporter')) badges.push('<:supporter:786942612807614504>');
        if (message.client.badges.get(user.id, 'earlyaccess')) badges.push(':test_tube:');
        return badges
    }
    getPermsText(message, user) {
        if (!message || !user) throw new TypeError('Please type required arguments')
        if (!message.guild.member(user)) return message.client.lang.handle(message, '1 | User', '1 | Użytkownik')
        else {
            user = message.guild.member(user)
            let perms = message.client.lang.handle(message, '1 | User', '1 | Użytkownik');
            if (user.hasPermission('KICK_MEMBERS') || user.hasPermission('BAN_MEMBERS') || user.hasPermission('MANAGE_MESSAGES')) perms = '2 | Moderator';
            if (user.hasPermission('ADMINISTRATOR')) perms = '3 | Administrator';
            if (user.id === message.guild.ownerID)  {
                perms = message.client.lang.handle(message, '4 | Server owner', '4 | Właściciel serwera');
            }
            if (message.client.config.perms.developer.includes(user.id)) perms = message.client.lang.handle(message, '5 | Developer', '5 | Programista');
            return perms
        }
    }
    convertBool(message, bool) {
        if (!message || !bool) throw new TypeError('Please type required arguments')
        let lang = message.client.base.get(message.guild.id, 'lang') || 'en'
        if (!lang) return 'Could not find lang - ERROR!'
        else {
            if (lang === 'en' && bool === 'yes') return 'Yes'
            if (lang === 'en' && bool === 'no') return 'No'
            if (lang === 'pl' && bool === 'yes') return 'Tak'
            if (lang === 'pl' && bool === 'no') return 'Nie'
            else throw new TypeError('Invalid bool argument. Supported: \'yes\'/\'no\'')
        }
    }
}
module.exports = functionsManager;