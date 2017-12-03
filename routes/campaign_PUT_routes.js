const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/campaigns.js`);
const db_shared = require(`../db/shared.js`);

function checkCampaignDoesntExist(connection, campaign){
    return connection.execute(`
        SELECT *
        FROM campaigns
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(
        (res) => {
            if(res.rows.length !== 0)
                return Promise.reject({
                    location: `check campaign doesn't exist`,
                    err: `Campaign '${campaign}' already exists!`
                });
            else return Promise.resolve({
                status: 200,
                data: format(res, false)
            });
        }, (err) => Promise.reject({
            location: `check campaign doesn't exist`,
            err: err
        })
    );
}

exports.initRouter = (connection, router) => {
    router.put(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => checkCampaignDoesntExist(connection, req.params.campaign),
                () => db.putCampaign(connection, req.params.campaign),
                () => db_shared.commit(connection)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.json(`Successfully added campaign!`));
        }
    });
};