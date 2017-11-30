const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players = require(`../db/players_DEL.js`);
const db_shared = require(`../db/shared.js`);

exports.initRouter = (connection, router) => {
    router.delete(`/campaigns/:campaign/players/:player`, (req, res) => {
        if(validate(req.params, res))
            db_players.deletePlayerLevels(connection, req.params.campaign, req.params.player)
            .then(() => {
                db_players.deletePlayerAbilities(connection, req.params.campaign, req.params.player)
                .then(() => {
                    db_players.deletePlayerSpells(connection, req.params.campaign, req.params.player)
                    .then(() => {
                        db_players.deletePlayerItems(connection, req.params.campaign, req.params.player)
                        .then(() => {
                            db_players.deletePlayer(connection, req.params.campaign, req.params.player)
                            .then(() => {
                                db_shared.commit(connection)
                                .then(() => res.json(`Player ${req.params.player} successfully deleted from campaign ${req.params.campaign}`));
                            });
                        });
                    });
                });
            })
            .catch(err => error(`DELETE player`, err.message, res))
    });
};