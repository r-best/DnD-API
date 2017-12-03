const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/races.js`);

exports.initRouter = (connection, router) => {
    // GET all races
    router.get('/races', (req, res) => {
        db.getRaces(connection)
        .then(
            (res2) => res.status(res2.status).json(res2.data),
            (err) => error(err, res)
        );
    });
    
    // GET a single race by name
    router.get('/races/:race', (req, res) => {
        if(validate(req.params, res))
            db.getRace(connection, req.params.race)
            .then(
                (res2) => res.status(res2.status).json(res2.data),
                (err) => error(err, res)
            );
    });

    // GET all abilities associated with a race
    router.get(`/races/:race/abilities`, (req, res) => {
        if(validate(req.params, res))
            db.getRaceAbilities(connection, req.params.race)
            .then(
                (res2) => res.status(res2.status).json(res2.data),
                (err) => error(err, res)
            );
    });
};