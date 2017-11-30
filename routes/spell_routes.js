const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

exports.initRouter = (connection, router) => {
    // GET all spells
    router.get(`/spells`, (req, res) => {
        connection.execute(`
            SELECT *
            FROM spells natural left join material
        `, [])
        .then(res2 => res.json(format(res2, true)))
        .catch(err => error(err.message, res));
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
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Spell school '${req.params.school}' does not exist`});
                else
                    res.json(format(res2, true));
            })
            .catch(err => error(err.message, res));
    });

    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells natural left join material
                WHERE lv = :lv
            `, [req.params.lv])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`No spells of level ${req.params.lv}' exist`});
                else
                    res.json(format(res2, true));
            })
            .catch(err => error(err.message, res));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM spells natural left join material
                WHERE spell_name = :spell
            `, [req.params.spell])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Spell '${req.params.spell}' does not exist`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => error(err.message, res));
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
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Spell '${req.params.spell}' does not exist (or it just has no classes that can learn it, but that should be impossible unless you modified parts of my database you shouldn't have access to, so I'm opting for the former)`});
                else
                    res.json(format(res2, true));
            })
            .catch(err => error(err.message, res));
    });
};