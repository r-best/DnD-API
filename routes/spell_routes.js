const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/spells.js`);

exports.initRouter = (connection, router) => {
    // GET all spells
    router.get(`/spells`, (req, res) => {
        db.getSpells(connection)
        .then(res2 => res.status(res2.status).json(res2.data))
        .catch(err => error(err, res));
    });

    // GET all spell schools
    router.get(`/spells/schools`, (req, res) => {
        res.json(db.getSchools());
    });

    // GET all spells in a school
    router.get(`/spells/schools/:school`, (req, res) => {
        if(validate(req.params, res) && db.getSchools().includes(req.params.school))
            db.getSchoolSpells(connection, req.params.school)
            .then(res2 => res.status(res2.status).json(res2.data))
            .catch(err => error(err, res));
    });

    // GET all spells of a certain level
    router.get(`/spells/level/:lv`, (req, res) => {
        if(validate(req.params, res))
            db.getSpellsInLevel(connection, req.params.lv)
            .then(res2 => res.status(res2.status).json(res2.data))
            .catch(err => error(err, res));
    });

    // GET a single spell by name
    router.get(`/spells/:spell`, (req, res) => {
        if(validate(req.params, res))
            db.getSpell(connection, req.params.spell)
            .then(res2 => res.status(res2.status).json(res2.data))
            .catch(err => error(err, res));
    });
    
    // GET all classes that can learn a spell
    router.get(`/spells/:spell/classes`, (req, res) => {
        if(validate(req.params, res)){
            let queries = [
                () => db.getSpell(connection, req.params.spell),
                () => db.getSpellClasses(connection, req.params.spell)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err, res)}
                ).catch((err) => {connection.rollback();error(err, res)}),
                Promise.resolve()
            ).then(res2 => res.status(res2.status).json(res2.data));
        }
    });
};