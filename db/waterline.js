const Waterline = require('waterline');
const sails = require('sails-postgresql');
const config = require('../config/config.json');
const Model = require('../config/models.js');

module.exports.config = {
    adapters: {
        postgresql: sails
    },
    connections: {
        default: config.defaultConnection
    }
};

var waterline = new Waterline();
waterline.loadCollection(Model.campaigns);
waterline.loadCollection(Model.players);
waterline.loadCollection(Model.spells);

module.exports.waterline = waterline;