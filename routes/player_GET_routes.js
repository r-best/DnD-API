const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    // GET all players in a campaign
    router.get('/campaigns/:campaign/players', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM characters
                WHERE campaign_name = :campaign
            `, [req.params.campaign])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Campaign '${req.params.campaign}' either does not exist or has no players!`});
                else
                    res.json(format(res2, true));
            })
            .catch(err => res.status(500).json({err:err.message}));
    });
    
    // GET a single player in a campaign by name
    router.get('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM characters
                WHERE character_name = :player AND campaign_name = :campaign
            `, [req.params.player, req.params.campaign])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => res.status(500).json({err:err.message}));
    });

    // GET the classes of a character and what levels they are in each
    router.get('/campaigns/:campaign/players/:player/level', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT class_name, lv
                FROM characterlevel
                WHERE character_name = :player AND campaign_name = :campaign
            `, [req.params.player, req.params.campaign])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`});
                else
                    res.json(format(res2, true));
            })
            .catch(err => res.status(500).json({err:err.message}));
    });
    
    // GET all the abilities of a character
    router.get('/campaigns/:campaign/players/:player/abilities', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT a.ability_name, a.descr
                FROM characterabilities c JOIN abilities a
                ON c.ability_name = a.ability_name
                WHERE c.character_name = :player AND c.campaign_name = :campaign
            `, [req.params.player, req.params.campaign])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json({err:err.message}));
    });
    
    // GET all items a player has
    router.get('/campaigns/:campaign/players/:player/items', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT item_name, descr, quantity
                FROM items
                WHERE campaign_name = :campaign AND character_name = :player
            `, [req.params.campaign, req.params.player])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json({err:err.message}));
    });

    // GET a specific item owned by a player
    router.get('/campaigns/:campaign/players/:player/items/:item', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT item_name, descr
                FROM items
                WHERE campaign_name = :campaign
                AND character_name = :player
                AND item_name = :item
            `, [req.params.campaign, req.params.player, req.params.item])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`There are several possibilities here and I'm on a time limit. Either campaign '${req.params.campaign}' doesn't exist, player '${req.params.player}' does not exist in it, or the player doesn't have item '${req.params.item}'`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => res.status(500).json({err:err.message}));
    });
    
    // GET all attacks a player knows
    router.get('/campaigns/:campaign/players/:player/attacks', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT attack_name, descr, atk_bonus, damage, dmg_type
                FROM attacks
                WHERE campaign_name = :campaign AND character_name = :player
            `, [req.params.campaign, req.params.player])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json({err:err.message}));
    });

    // GET a specific attack known by a player
    router.get('/campaigns/:campaign/players/:player/attacks/:attack', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT attack_name, descr, atk_bonus, damage, dmg_type
                FROM attacks
                WHERE campaign_name = :campaign
                AND character_name = :player
                AND attack_name = :atack
            `, [req.params.campaign, req.params.player, req.params.attack])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`There are several possibilities here and I'm on a time limit. Either campaign '${req.params.campaign}' doesn't exist, player '${req.params.player}' does not exist in it, or the player doesn't have attack '${req.params.attack}'`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => res.status(500).json(err.message));
    });

    // GET all spells a player knows
    router.get('/campaigns/:campaign/players/:player/spells', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells
                WHERE spell_name in (
                    SELECT spell_name
                    FROM characterspells
                    WHERE campaign_name = :campaign AND character_name = :player
                )
            `, [req.params.campaign, req.params.player])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json(err.message));
    });
};