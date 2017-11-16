const format = require(`../routes.js`).format;

exports.initRouter = (connection, router) => {
    // GET all spells
    router.get(`/spells`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
        `, [])
        .then(res2 => res.json(format(res2, true)))
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
        .then(res2 => res.json(format(res2, true)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            WHERE lv = :lv
        `, [req.params.lv])
        .then(res2 => res.json(format(res2, true)))
        .catch(err => res.status(500).json(err.message));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells
            WHERE spell_name = :spell
        `, [req.params.spell])
        .then(res2 => res.json(format(res2, false)))
        .catch(err => res.status(500).json(err.message));
    });
};