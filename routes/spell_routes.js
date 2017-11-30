const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/spells.js`);

exports.initRouter = (connection, router) => {
    // GET all spells
    router.get(`/spells`, (req, res) => {
        db.getSpells(connection)
        .then(res2 => res.json(res2))
        .catch(err => error(`GET spells`, err.message, res));
    });

    // GET all spell schools
    router.get(`/spells/schools`, (req, res) => {
        res.json(db.getSchools());
    });

    // GET all spells in a school
    router.get(`/spells/schools/:school`, (req, res) => {
        if(validate(req.params, res) && db.getSchools().includes(req.params.school))
            db.getSchoolSpells(connection, req.params.school)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`Spell school '${req.params.school}' somehow contains no spells. What did you do.`});
                else
                    res.json(res2);
            })
            .catch(err => error(`GET school spells`, err.message, res));
    });

    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        if(validate(req.params, res))
            db.getSpellsInLevel(connection, req.params.lv)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`No spells of level ${req.params.lv}' exist`});
                else
                    res.json(res2);
            })
            .catch(err => error(`GET level spells`, err.message, res));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        if(validate(req.params, res))
            db.getSpell(connection, req.params.spell)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`Spell '${req.params.spell}' does not exist`});
                else
                    res.json(res2);
            })
            .catch(err => error(`GET spell`, err.message, res));
    });
    
    // GET all classes that can learn a spell
    router.get(`/spells/:spell/classes`, (req, res) => {
        if(validate(req.params, res))
            db.getSpellClasses(connection, req.params.spell)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`Spell '${req.params.spell}' does not exist (or it just has no classes that can learn it, but that should be impossible unless you modified parts of my database you shouldn't have access to, so I'm opting for the former)`});
                else
                    res.json(res2);
            })
            .catch(err => error(`GET spell classes`, err.message, res));
    });
};