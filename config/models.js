const Waterline = require('waterline');

module.exports.campaigns = Waterline.Collection.extend({
    identity: 'campaigns',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true
        },
        name: 'text',
        descr: 'text',
        players: {
            collection: 'players',
            via: 'campaign'
        }
    },
    connection: 'default',
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
});

module.exports.players = Waterline.Collection.extend({
    identity: 'players',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true
        },
        campaignID: 'integer',
        campaign: {
            model: 'campaigns'
        },
        name: 'text',
        race: 'text',
        class: 'text',
        level: 'integer',
        alignment: 'text',
        background: 'text',
        experience: 'integer',
        hp_max: 'integer',
        speed: 'integer',
        ac: 'integer',
        inspiration: 'integer',
        str: 'integer',
        dex: 'integer',
        con: 'integer',
        int: 'integer',
        wis: 'integer',
        cha: 'integer',
        proficiencies: 'text',
        
    },
    connection: 'default',
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
});

module.exports.spells = Waterline.Collection.extend({
    identity: 'spells',
    attributes: {
        name: 'text',
        descr: 'text'
    },
    connection: 'default',
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
});