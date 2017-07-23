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
        campaign: 'integer',
        name: 'text',
        race: 'text',
        class: 'text',
        level: 'integer',
        alignment: 'text',
        background: 'text',
        //experience: 'integer',
        hpmax: 'integer',
        speed: 'integer',
        ac: 'integer',
        insp: 'integer',
        str: 'integer',
        dex: 'integer',
        con: 'integer',
        int: 'integer',
        wis: 'integer',
        cha: 'integer',
        
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