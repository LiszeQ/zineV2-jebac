const libclient = require('./base/client');
const client = new libclient({ config: './data/config.json' });
const embedGenerator = require('./lib/embeds');
const langManager = require('./lib/langManager');
const functionsManager = require('./lib/functions');
const musicPlayer = require('./lib/musicPlayer');
const giveawaysManager = require('./lib/giveawaysManager')

// Ładowanie komend i eventów
client.initCmds(client);
client.initEvents(client);

// Client
client.embeds = new embedGenerator();
client.lang = new langManager();
client.musicPlayer = new musicPlayer(client, { leaveOnEnd: true, leaveOnEmpty: true, quality: 'high' })
client.functions = new functionsManager();
client.giveaways = new giveawaysManager(client, { storage: false, updateCountdownEvery: 10000, botsCanWin: false })
.getManager()
client.cooldowns = new (require('discord.js')).Collection()

// Login
client._login(client.config.privateVars.token)

