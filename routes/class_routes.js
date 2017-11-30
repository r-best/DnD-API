const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/classes.js`);

exports.initRouter = (connection, router) => {
    // GET all classes
    router.get(`/classes`, (req, res) => {
        db.getClasses(connection)
        .then(res2 => res.json(res2))
        .catch(err => error(err.message, res));
    });
    
    // GET a single class by name
    router.get(`/classes/:class`, (req, res) => {
        if(validate(req.params, res))
            db.getClass(connection, req.params.class)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`Class '${req.params.class}' does not exist`});
                else
                    res.json(res2);
            })
            .catch(err => error(err.message, res));
    });

    // GET all spells a class can learn
    router.get(`/classes/:class/spells`, (req, res) => {
        if(validate(req.params, res))
            db.getClassSpells(connection, req.params.class)
            .then(res2 => res.json(res2))
            .catch(err => error(err.message, res));
    });

    // GET all abilities associated with a class
    router.get(`/classes/:class/abilities`, (req, res) => {
        if(validate(req.params, res))
            db.getClassAbilities(connection, req.params.class)
            .then(res2 => res.json(res2))
            .catch(err => error(err.message, res));
    });
};