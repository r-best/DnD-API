const routes = require(`../routes.js`);
const format = routes.format;

exports.getSpells = function getSpells(connection){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
    `)
    .then(res => format(res, true));
};

exports.getSchools = function getSchools(){
    return [
        'abjuration',
        'conjuration',
        'divination',
        'enchantment',
        'evocation',
        'illusion',
        'necromancy',
        'transmutation'
    ];
};

exports.getSchoolSpells = function getSchoolSpells(connection, school){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        where school = :school
    `, [school])
    .then(res => format(res, true));
};

exports.getSpellsInLevel = function getSpellsInLevel(connection, level){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        WHERE lv = :lv
    `, [level])
    .then(res => format(res, true));
};

exports.getSpell = function getSpell(connection, spell){
    return connection.execute(`
        SELECT *
        FROM spells natural left join material
        WHERE spell_name = :spell
    `, [spell])
    .then(res => format(res, false));
};

exports.getSpellClasses = function getSpellClasses(connection, spell){
    return connection.execute(`
        SELECT distinct c.class_name
        FROM classspells cs join classes c
        ON cs.class_name = c.class_name
        WHERE cs.spell_name = :spell
    `, [spell])
    .then(res => format(res, true));
};