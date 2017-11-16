const format = require(`../routes.js`).format;

exports.initRouter = (connection, router) => {
    // GET all classes
    router.get(`/classes`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM classes
        `, [])
        .then(res2 => res.json(format(res2, true)))
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET a single class by name
    router.get(`/class/:class`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM classes
            WHERE class_name = :class
        `, [req.params.spell])
        .then(res2 => res.json(format(res2, false)))
        .catch(err => res.status(500).json(err.message));
    });
};