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

module.exports.getPlayersInCampaign = function getPlayersInCampaign(campaign){
    var db = global.collections;
    return db.campaigns.findOne({
        name: campaign
    }).then(res => {
        return db.players.find({
            campaign: res.id
        }).then(res2 => {
            return res2;
        });
    });
}

module.exports.getPlayerInCampaign = function getPlayerInCampaign(campaign, name){
    var db = global.collections;
    return db.campaigns.findOne({
        name: campaign
    }).then(res => {
        return db.players.findOne({
            name: name,
            campaign: res.id
        }).then(res2 => {
            return res2;
        });
    });
}

module.exports.getSpells = function getSpells(){
    var db = global.collections;
    return db.spells.find().then(res => {
        return res;
    });
}