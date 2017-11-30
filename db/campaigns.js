const routes = require(`../routes.js`);
const format = routes.format;

exports.getCampaigns = function getCampaigns(connection){
    return connection.execute(`
        SELECT *
        FROM campaigns
    `)
    .then(res => format(res, true));
};

exports.getCampaign = function getCampaign(connection, campaign){
    return connection.execute(`
        SELECT *
        FROM campaigns
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(res => format(res, false));
};

exports.deleteCampaign = function deleteCampaign(connection, campaign){
    return connection.execute(`
        DELETE FROM campaigns
        WHERE campaign_name = :campaign
    `, [campaign]);
};

exports.putCampaign = function putCampaign(connection, campaign){
    return connection.execute(`
        INSERT INTO campaigns
        VALUES (:campaign)
    `, [campaign]);
};