// const connection = require('../index');

module.exports.getCampaigns = function getCampaigns(connection){
    return connection.execute('SELECT * FROM employees').then((res) => {
        return format(res);
    });
}

module.exports.getCampaign = function getCampaign(name){
    
}

module.exports.getPlayersInCampaign = function getPlayersInCampaign(campaign){
    
}

module.exports.getPlayerInCampaign = function getPlayerInCampaign(campaign, name){
    
}

module.exports.getSpells = function getSpells(){
    
}

/*
    Takes the response data from a query to the database and reformats it 
    into something that will be easier for the frontend to work with
*/
function format(data){
    let formattedData = [];
    for(let i = 0; i < data.rows.length; i++){
        formattedData[i] = {};
        for(let j = 0; j < data.metaData.length; j++){
            (formattedData[i])[data.metaData[j].name] = data.rows[i][j];
            console.log(data.rows[i]);
        }
    }
    return formattedData;
}