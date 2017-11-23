const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    // GET all races
    router.get('/races', (req, res) => {
        connection.execute(`
            SELECT *
            FROM races
        `)
        .then(res2 => res.json(format(res2, true)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET a single race by name
    router.get('/races/:race', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM races
                WHERE race_name = :race
            `, [req.params.race])
            .then(res2 => res.json(format(res2, false)))
            .catch(err => res.status(500).json(err.message));
    });

    // GET all abilities associated with a race
    router.get(`/races/:race/abilities`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM raceabilities
                WHERE race_name = :race
            `, [req.params.race])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json(err.message));
    });
};