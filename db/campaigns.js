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
    return new Promise((resolve, reject) => {
        return connection.execute(`
            SELECT *
            FROM campaigns
            WHERE campaign_name = :campaign
        `, [campaign])
        .then(
            (res) => {
                if(res.length === 0)
                    reject({
                        location: `GET campaign`,
                        err: `Campaign '${req.params.campaign}' does not exist!`
                    });
                else resolve(format(res, false));
            }, (err) => reject({
                location: `GET campaign`,
                err: err
            })
        );
    });
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