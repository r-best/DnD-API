module.exports.getCampaigns = function getCampaigns(){
    var db = global.collections;
    return db.campaigns.find().then(res => {
        return res;
    });
}

module.exports.getCampaign = function getCampaign(name){
    var db = global.collections;
    return db.campaigns.findOne({
        name: name
    }).then(res => {
        return res;
    });
}

module.exports.getPlayers = function getPlayers(){
    var db = global.collections;
    return db.players.find().then(res => {
        return res;
    });
}

module.exports.getSpells = function getSpells(){
    var db = global.collections;
    return db.spells.find().then(res => {
        return res;
    });
}