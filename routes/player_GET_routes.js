const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players = require(`../db/players_GET.js`);

exports.initRouter = (connection, router) => {
    // GET all players in a campaign
    router.get('/campaigns/:campaign/players', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayers(connection, req.params.campaign)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
    
    // GET a single player in a campaign by name
    router.get('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });

    // GET the classes of a character and what levels they are in each
    router.get('/campaigns/:campaign/players/:player/level', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerLevels(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
    
    // GET all the abilities of a character
    router.get('/campaigns/:campaign/players/:player/abilities', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerAbilities(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
    
    // GET all items a player has
    router.get('/campaigns/:campaign/players/:player/items', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerItems(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });

    // GET a specific item owned by a player
    router.get('/campaigns/:campaign/players/:player/items/:item', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerItem(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
    
    // GET all attacks a player knows
    router.get('/campaigns/:campaign/players/:player/attacks', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerAttacks(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });

    // GET a specific attack known by a player
    router.get('/campaigns/:campaign/players/:player/attacks/:attack', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerAbilities(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });

    // GET all spells a player knows
    router.get('/campaigns/:campaign/players/:player/spells', (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => db_players.getPlayer(connection, req.params.campaign, req.params.player),
                () => db_players.getPlayerSpells(connection, req.params.campaign, req.params.player)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
};