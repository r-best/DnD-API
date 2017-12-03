const routes = require(`../routes.js`);
const format = routes.format;

exports.getSpells = function getSpells(connection){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
    `)
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET spells`,
            err: err
        })
    );
};

exports.getSchools = function getSchools(){
    return Promise.resolve([
        'abjuration',
        'conjuration',
        'divination',
        'enchantment',
        'evocation',
        'illusion',
        'necromancy',
        'transmutation'
    ]);
};

exports.getSchoolSpells = function getSchoolSpells(connection, school){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        where school = :school
    `, [school])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.resolve({
                    status: 400,
                    data: `Spell school '${school}' somehow contains no spells. What did you do.`
                })
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res)
                })
        },
        (err) => Promise.reject({
            location: `GET school spells`,
            err: err
        })
    );
};

exports.getSpellsInLevel = function getSpellsInLevel(connection, level){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        WHERE lv = :lv
    `, [level])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.resolve({
                    status: 400,
                    data: `No spells of level ${lv}' exist`
                })
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res)
                })
        },
        (err) => Promise.reject({
            location: `GET school spells`,
            err: err
        })
    );
};

exports.getSpell = function getSpell(connection, spell){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        WHERE spell_name = :spell
    `, [spell])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET spell`,
                    err: `Spell '${spell}' does not exist!`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET spell`,
            err: err
        })
    );
};

exports.getSpellClasses = function getSpellClasses(connection, spell){
    return connection.execute(`
        SELECT distinct c.class_name
        FROM classspells cs join classes c
        ON cs.class_name = c.class_name
        WHERE cs.spell_name = :spell
    `, [spell])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.resolve({
                    status: 400,
                    data: `Spell '${spell}' cannot be learned by any classes, but that should be impossible unless you modified parts of my database you shouldn't have access to. What did you do.`
                })
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res)
                })
        },
        (err) => Promise.reject({
            location: `GET school spells`,
            err: err
        })
    );
};