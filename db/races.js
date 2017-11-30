const routes = require(`../routes.js`);
const format = routes.format;

exports.getRaces = function getRaces(connection){
    return connection.execute(`
        SELECT *
        FROM races
    `)
    .then(res => format(res, true));
};

exports.getRace = function getRace(connection, race){
    return connection.execute(`
        SELECT *
        FROM races
        WHERE race_name = :race
    `, [race])
    .then(res => format(res, false));
};

exports.getRaceAbilities = function getRaceAbilities(connection, race){
    return connection.execute(`
        SELECT *
        FROM raceabilities
        WHERE race_name = :race
    `, [race])
    .then(res => format(res, true));
};