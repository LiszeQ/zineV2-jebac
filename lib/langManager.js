class langManager {
    handle(message, enmsg, plmsg) {
        if (!message || !enmsg || !plmsg) throw new Error('LangManagerError: Please provide required args')
        let lang = message.client.base.get(message.guild.id, 'lang')
        const guildSettings = {
            lang: 'en',
            prefix: '-',
            announcementChannel: lang === 'en' ? 'Not specified' : 'Nie podano',
            announcementMention: lang === 'en' ? 'Not specified' : 'Nie podano',
            modLogChannel: lang === 'en' ? 'Not specified' : 'Nie podano',
            suggestionsChannel: lang === 'en' ? 'Not specified' : 'Nie podano',
            welcomeModule: lang === 'en' ? 'Off' : 'Wyłączone',
            welcomeChannel: lang === 'en' ? 'Not specified' : 'Nie podano',
            welcomeMessage: 'Hello {membermention}!',
            leaveModule: lang === 'en' ? 'Off' : 'Wyłączone',
            leaveChannel: lang === 'en' ? 'Not specified' : 'Nie podano',
            leaveMessage: 'Bye {membertag}!',
        }
        
        message.client.base.ensure(message.guild.id, guildSettings);
        if (lang === 'en') return enmsg
        else return plmsg
    }
}
module.exports = langManager;