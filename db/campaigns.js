const routes = require(`../routes.js`);
const format = routes.format;

exports.getCampaigns = function getCampaigns(connection){
    return connection.execute(`
        SELECT *
        FROM campaigns
    `)
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET campaigns`,
            err: err
        })
    );
};

exports.getCampaign = function getCampaign(connection, campaign){
    return connection.execute(`
        SELECT *
        FROM campaigns
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET campaign`,
                    err: `Campaign '${campaign}' does not exist!`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET campaign`,
            err: err
        })
    );
};

exports.deleteCampaign = function deleteCampaign(connection, campaign){
    return connection.execute(`
        DELETE FROM campaigns
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(
        (res) => {
            if(res2.rowsAffected == 0)
                return Promise.resolve({
                    status: 400,
                    data: `Campaign '${campaign}' does not exist`
                });
            else if(res2.rowsAffected == 1)
                return Promise.resolve({
                    status: 200,
                    data: `Campaign '${campaign}' successfully deleted`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: `I don't know how, but you somehow deleted more than one campaign with that request. Thanks for breaking my api, you get a 200 response because TECHNICALLY you deleted the campaign(s) you wanted to.`
                });
        },
        (err) => {
            if(err.toString().includes(`ORA-02292`))
                return Promise.reject({
                    location: `DELETE campaign`,
                    err: `Please delete all players in this campaign first`
                });
            else
                return Promise.reject({
                    location: `DELETE campaign`,
                    err: err
                });
        }
    );
};

exports.putCampaign = function putCampaign(connection, campaign){
    return connection.execute(`
        INSERT INTO campaigns
        VALUES (:campaign)
    `, [campaign])
    .then(
        (res) => {
            if(res.rowsAffected === 0)  // If player was failed to insert without giving an error, give up.
                return Promise.reject({
                    location: `PUT campaign`,
                    err: `Campaign was not inserted and I don't know why, the code shouldn't be able to reach this point`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: `Successfully added campaign ${campaign}`
                });
        },
        (err) => Promise.reject({
            location: `PUT campaign`,
            err: err
        })
    );
};