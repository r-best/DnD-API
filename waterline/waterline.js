const Waterline = require('waterline');
const sails = require('sails-postgresql');
const Model = require('./models.js');

module.exports.config = {
    adapters: {
        postgresql: sails
    },
    connections: {
        default: {
            adapter: 'postgresql',
            host: 'localhost',
            port: '5432',
            database: 'dndb',
            user: 'postgres',
            password: 'mememachine'
        }
    }
};

var waterline = new Waterline();
waterline.loadCollection(Model.spells);

module.exports.waterline = waterline;