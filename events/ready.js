const Enmap = require('enmap')
module.exports.run = async (client) => {
    console.log(require('chalk').yellow(`${client.user.tag}`) + require('chalk').blue(' gotowy'));
    setTimeout(async () => {
        await client.user.setPresence({
            status: 'idle',
            activity: {
                name: `@Zine | ${client.guilds.cache.size} guilds`,
                type: 'WATCHING',
            }
        })
    }, 1000)
    client.base = new Enmap({
        name: 'mainBase',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.gbanManager = new Enmap({
        name: 'gbany',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.badges = new Enmap({
        name: 'badges',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.infractions = new Enmap({
        name: 'infractions',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.allCases = new Enmap({
        name: 'allCases',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.levels = new Enmap({
        name: 'levelling',
        fetchAll: true,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.note = new Enmap({
        name: 'note',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.eco = new Enmap({
        name: 'economy',
        fetchAll: true,
        autoFetch: true,
        cloneLevel: 'deep'
    })
    client.ver = new Enmap({
        name: 'verification',
        fetchAll: false,
        autoFetch: true,
        cloneLevel: 'deep'
    })
}
module.exports.help = {
    name: 'ready'
}