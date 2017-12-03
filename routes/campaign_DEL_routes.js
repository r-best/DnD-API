const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players = require(`../db/players_GET.js`);
const db_shared = require(`../db/shared.js`);

exports.initRouter = (connection, router) => {
    // DELETE a campaign
    router.delete(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_campaigns.deleteCampaign(connection, req.params.campaign),
                () => db_shared.commit(connection)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err, res)}
                ).catch((err) => {connection.rollback();error(err, res)}),
                Promise.resolve()
            ).then(res2 => res.json(`Successfully deleted campaign!`));
        }
    });
}