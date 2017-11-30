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
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players_GET.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist!`});
                        else // Else, proceed to delete stuff
                            db_players_DEL.deletePlayerLevels(connection, req.params.campaign, req.params.player)
                            .then(() => {
                                db_players_DEL.deletePlayerAbilities(connection, req.params.campaign, req.params.player)
                                .then(() => {
                                    db_players_DEL.deletePlayerSpells(connection, req.params.campaign, req.params.player)
                                    .then(() => {
                                        db_players_DEL.deletePlayerItems(connection, req.params.campaign, req.params.player)
                                        .then(() => {
                                            db_players_DEL.deletePlayer(connection, req.params.campaign, req.params.player)
                                            .then(() => {
                                                db_shared.commit(connection)
                                                .then(() => res.json(`Player ${req.params.player} successfully deleted from campaign ${req.params.campaign}`))
                                                .catch(err => error(`commit`, err.message, res));
                                            })
                                            .catch(err => error(`DELETE player`, err.message, res));
                                        })
                                        .catch(err => error(`DELETE player items`, err.message, res));
                                    })
                                    .catch(err => error(`DELETE player spells`, err.message, res));
                                })
                                .catch(err => error(`DELETE player abilities`, err.message, res));
                            })
                            .catch(err => error(`DELETE player levels`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
            
    });
};