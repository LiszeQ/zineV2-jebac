class zineMusicPlayer {
    constructor(client, opts) {
        return new (require('discord-music-player')).Player(client, opts)
    }
}
module.exports = zineMusicPlayer;