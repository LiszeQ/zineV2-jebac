class giveawaysManager {
    constructor(client, opts) {
        this.client = client;
        this.opts = opts;
        this.storage = !opts.storage ? false : opts.storage
        this.updateCountdownEvery = opts.updateCountdownEvery ? opts.updateCountdownEvery : 10000;
        this.botsCanWin = opts.botsCanWin ? true : false
        this.embedColor = opts.embedColor ? opts.embedColor : '#FFC961'
        this.embedColorEnd = opts.embedColorEnd ? opts.embedColorEnd : '#FF0000'
        this.reaction = opts.reaction ? opts.reaction : '🎉'
        
        if (!new (require('quick.db')).table('giveawaye').get('all')) new (require('quick.db')).table('giveawaye').set('all', [])
        const manager = class extends (require('discord-giveaways')).GiveawaysManager {
            async getAllGiveaways() {
                return new (require('quick.db')).table('giveawaye').get('all')
            }
            async saveGiveaway(msgID, data) {
                new (require('quick.db')).table('giveawaye').push('all', data)
                return true
            }
            async editGiveaway(msgID, data) {
                const allgv = new (require('quick.db')).table('giveawaye').get('all')
                const newGvA = allgv.filter((gv) => gv.messageID !== msgID)
                newGvA.push(data)
                new (require('quick.db')).table('giveawaye').set('all', newGvA)
                return true
                }
            async deleteGiveaway(msgID) {
                const newGvA = new (require('quick.db')).table('giveawaye').get('all').filter((gv) => gv.messageID !== msgID);
                new (require('quick.db')).table('giveawaye').set('all', newGvA);
                return true
            }
        }
        this.manager = manager;
    }
    getManager() {
        return new this.manager(this.client, {
            storage: this.storage,
            updateCountdownEvery: this.updateCountdownEvery,
            default: {
                botsCanWin: this.botsCanWin,
                embedColor: this.embedColor,
                embedColorEnd: this.embedColorEnd,
                reaction: this.reaction
            }
        })
    }
}
module.exports = giveawaysManager;