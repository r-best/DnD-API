// const connection = require('../index');

module.exports.getCampaigns = function getCampaigns(connection){
    return connection.execute('SELECT * FROM employees WHERE employee_id = 100');
}

module.exports.getCampaign = function getCampaign(name){
    
}

module.exports.getPlayersInCampaign = function getPlayersInCampaign(campaign){
    
}

module.exports.getPlayerInCampaign = function getPlayerInCampaign(campaign, name){
    
}

module.exports.getSpells = function getSpells(){
    
}