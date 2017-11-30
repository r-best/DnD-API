const routes = require(`../routes.js`);
const format = routes.format;

exports.getClasses = function getClasses(connection){
    return connection.execute(`
        SELECT *
        FROM classes
    `, [])
    .then(res => format(res, true));
};

exports.getClass = function getClass(connection, className){
    return connection.execute(`
        SELECT *
        FROM classes
        WHERE class_name = :class
    `, [className])
    .then(res => format(res, false));
};

exports.getClassSpells = function getClassSpells(connection, className){
    return connection.execute(`
        SELECT *
        FROM classspells natural join spells
        WHERE class_name = :class
    `, [className])
    .then(res => format(res, true));
};

exports.getClassAbilities = function getClassAbilities(connection , className){
    return connection.execute(`
        SELECT *
        FROM classabilities
        WHERE class_name = :class
    `, [className])
    .then(res => format(res, true));
};