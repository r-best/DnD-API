const Waterline = require('waterline');

module.exports.spells = Waterline.Collection.extend({
    identity: 'spells',
    attributes: {
        name: 'string'
    },
    connection: 'default',
    migrate: 'safe',
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false
});