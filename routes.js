exports.initRouter = function initRouter(connection){
    var router = require(`express`).Router();
    
    // Base route
    router.get('/', (req, res) => {
        res.json({
            message: 'Navigate to a valid route!'
        });
    });

    // 418
    router.get('/teapot', (req, res) => {
        res.sendStatus(418);
    });
    
    // GET all campaigns
    router.get('/campaigns', (req, res) => {
        connection.execute(`
            SELECT *
            FROM campaigns
        `)
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET a single campaign by name
    router.get('/campaigns/:campaign', (req, res) => {
        connection.execute(`
            SELECT *
            FROM campaigns
            WHERE name = :campaign
        `, [req.params.campaign])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET all players in a campaign
    router.get('/campaigns/:campaign/players', (req, res) => {
        connection.execute(`
            SELECT *
            FROM characters
            WHERE campaign_name = :campaign
        `, [req.params.campaign])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET a single player in a campaign by name
    router.get('/campaigns/:campaign/players/:player', (req, res) => {
        connection.execute(`
            SELECT *
            FROM characters
            WHERE name = :player AND campaign_name = :campaign
        `, [req.params.player, req.params.campaign])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET the classes of a character and what levels they are in each
    router.get('/campaigns/:campaign/players/:player', (req, res) => {
        connection.execute(`
            SELECT class_name, level
            FROM characterlevel
            WHERE character_name = :player AND campaign_name = :campaign
        `, [req.params.player, req.params.campaign])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET all spells associated with a player
    router.get('/campaigns/:campaign/players/:player/spells', (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            WHERE name in (
                SELECT spell_name
                FROM characterspells
                WHERE campaign_name = :campaign AND character_name = :player
            )
        `, [req.params.campaign, req.params.player])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET all spells
    router.get(`/spells`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
        `, [])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET all spell schools
    router.get(`/spells/schools`, (req, res) => {
        res.json([
            'abjuration',
            'conjuration',
            'divination',
            'enchantment',
            'evocation',
            'illusion',
            'necromancy',
            'transmutation'
        ]);
    });

    // GET all spells in a school
    router.get(`/spells/schools/:school`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            where school = :school
        `, [req.params.school])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            WHERE lv = :lv
        `, [req.params.lv])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            WHERE name = :spell
        `, [req.params.spell])
        .then(res2 => res.json(format(res2)))
        .catch(err => res.status(500).json(err.message));
    });

    // router.get(`/`, (req, res) => {
    //     connection.execute(`

    //     `, [])
    //     .then(res2 => res.json(format(res2)))
    //     .catch(err => res.status(500).json(err.message));
    // });

    return router;
}

/*
    Takes the response data from a query and reformats it into 
    something that will be easier for the frontend to work with
    becuase I hate how the oracledb package returns data
*/
function format(data){
    let formattedData = [];
    for(let i = 0; i < data.rows.length; i++){
        formattedData[i] = {};
        for(let j = 0; j < data.metaData.length; j++){
            (formattedData[i])[data.metaData[j].name] = data.rows[i][j];
        }
    }
    if(formattedData.length == 1){
        formattedData = formattedData[0];
    }
    return formattedData;
}