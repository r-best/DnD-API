const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players = require(`../db/players_GET.js`);

exports.initRouter = (connection, router) => {
    // GET all players in a campaign
    router.get('/campaigns/:campaign/players', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, get the players in it
                    db_players.getPlayers(connection, req.params.campaign)
                    .then(res3 => res.json(res3))
                    .catch(err => error(`GET players`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
    
    // GET a single player in a campaign by name
    router.get('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, get the player
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0)
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else
                            res.json(res3);
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });

    // GET the classes of a character and what levels they are in each
    router.get('/campaigns/:campaign/players/:player/level', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, proceed
                    db_players.getPlayerLevels(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0)
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else
                            res.json(res3);
                    })
                    .catch(err => error(`GET player levels`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
    
    // GET all the abilities of a character
    router.get('/campaigns/:campaign/players/:player/abilities', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerAbilities(connection, req.params.campaign, req.params.player)
                            .then(res4 => res.json(res4))
                            .catch(err => error(`GET player abilities`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
    
    // GET all items a player has
    router.get('/campaigns/:campaign/players/:player/items', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerItems(connection, req.params.campaign, req.params.player)
                            .then(res4 => res.json(res4))
                            .catch(err => error(`GET player items`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });

    // GET a specific item owned by a player
    router.get('/campaigns/:campaign/players/:player/items/:item', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerItem(connection, req.params.campaign, req.params.player, req.params.item)
                            .then(res4 => {
                                if(res4.length === 0)
                                    res.status(400).json({err:`Player ${req.params.player} in campaign ${req.params.campaign} does not own an item called ${req.params.item}`});
                                else
                                    res.json(res4);
                            })
                            .catch(err => error(`GET player item`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
    
    // GET all attacks a player knows
    router.get('/campaigns/:campaign/players/:player/attacks', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerAttacks(connection, req.params.campaign, req.params.player)
                            .then(res4 => res.json(res4))
                            .catch(err => error(`GET player attacks`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });

    // GET a specific attack known by a player
    router.get('/campaigns/:campaign/players/:player/attacks/:attack', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerAttack(connection, req.params.campaign, req.params.player, req.params.attack)
                            .then(res4 => {
                                if(res4.length === 0)
                                    res.status(400).json({err:`Player ${req.params.player} in campaign ${req.params.campaign} does not know an attack called ${req.params.attack}`});
                                else
                                    res.json(res4);
                            })
                            .catch(err => error(`GET player attack`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });

    // GET all spells a player knows
    router.get('/campaigns/:campaign/players/:player/spells', (req, res) => {
        if(validate(req.params, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check if player exists
                    db_players.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3.length === 0) // If not, fail
                            res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                        else // Else, proceed
                            db_players.getPlayerSpells(connection, req.params.campaign, req.params.player)
                            .then(res4 => res.json(res4))
                            .catch(err => error(`GET player spells`, err.message, res));
                    })
                    .catch(err => error(`GET player`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
};