const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    // GET all spells
    router.get(`/spells`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells natural left join material
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
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells natural left join material
                where school = :school
            `, [req.params.school])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json(err.message));
    });

    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells natural left join material
                WHERE lv = :lv
            `, [req.params.lv])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json(err.message));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells natural left join material
                WHERE spell_name = :spell
            `, [req.params.spell])
            .then(res2 => res.json(format(res2, false)))
            .catch(err => res.status(500).json(err.message));
    });
    
    // GET all classes that can learn a spell
    router.get(`/spells/:spell/classes`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT distinct c.class_name
                FROM classspells cs join classes c
                ON cs.class_name = c.class_name
                WHERE cs.spell_name = :spell
            `, [req.params.spell])
            .then(res2 => res.json(format(res2, true)))
            .catch(err => res.status(500).json(err.message));
    });
};