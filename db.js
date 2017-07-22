const db = require('./server.js');

module.exports.getSpells = function getSpells(){
    return db.spells.find().then(res => {
        return res;
    });
}