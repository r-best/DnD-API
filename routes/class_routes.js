const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

exports.initRouter = (connection, router) => {
    // GET all classes
    router.get(`/classes`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM classes
        `, [])
        .then(res2 => res.json(format(res2, true)))
        .catch(err => error(err.message, res));
    });
    
    // GET a single class by name
    router.get(`/classes/:class`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM classes
                WHERE class_name = :class
            `, [req.params.class])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Class '${req.params.class}' does not exist`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => error(err.message, res));
    });

    // GET all spells a class can learn
    router.get(`/classes/:class/spells`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM classspells natural join spells
                WHERE class_name = :class
            `, [req.params.class])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => error(err.message, res));
    });

    // GET all abilities associated with a class
    router.get(`/classes/:class/abilities`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM classabilities
                WHERE class_name = :class
            `, [req.params.class])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => error(err.message, res));
    });
};