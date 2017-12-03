const routes = require(`../routes.js`);
const format = routes.format;

exports.getRaces = function getRaces(connection){
    return connection.execute(`
        SELECT *
        FROM races
    `)
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET races`,
            err: err
        })
    );
};

exports.getRace = function getRace(connection, race){
    return connection.execute(`
        SELECT *
        FROM races
        WHERE race_name = :race
    `, [race])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET race`,
                    err: `race '${race}' does not exist!`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET race`,
            err: err
        })
    );
};

exports.getRaceAbilities = function getRaceAbilities(connection, race){
    return connection.execute(`
        SELECT *
        FROM raceabilities
        WHERE race_name = :race
    `, [race])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET race abilities`,
            err: err
        })
    );
};