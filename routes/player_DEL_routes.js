const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players_GET = require(`../db/players_GET.js`);
const db_players_DEL = require(`../db/players_DEL.js`);
const db_shared = require(`../db/shared.js`);

exports.initRouter = (connection, router) => {
    router.delete(`/campaigns/:campaign/players/:player`, (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players_GET.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players_DEL.deletePlayerLevels(connection, req.params.campaign, req.params.player),
                () => db_players_DEL.deletePlayerAbilities(connection, req.params.campaign, req.params.player),
                () => db_players_DEL.deletePlayerSpells(connection, req.params.campaign, req.params.player),
                () => db_players_DEL.deletePlayerItems(connection, req.params.campaign, req.params.player),
                () => db_players_DEL.deletePlayer(connection, req.params.campaign, req.params.player),
                () => db_shared.commit(connection)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.json(`Successfully deleted player '${req.params.player}'`));
        }   
    });
};