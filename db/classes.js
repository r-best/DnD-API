const routes = require(`../routes.js`);
const format = routes.format;

exports.getClasses = function getClasses(connection){
    return connection.execute(`
        SELECT *
        FROM classes
    `, [])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET classes`,
            err: err
        })
    );
};

exports.getClass = function getClass(connection, className){
    return connection.execute(`
        SELECT *
        FROM classes
        WHERE class_name = :class
    `, [className])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET class`,
                    err: `Class '${className}' does not exist`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        },
        (err) => Promise.reject({
            location: `GET class`,
            err: err
        })
    );
};

exports.getClassSpells = function getClassSpells(connection, className){
    return connection.execute(`
        SELECT *
        FROM classspells natural join spells
        WHERE class_name = :class
    `, [className])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET class spells`,
            err: err
        })
    );
};

exports.getClassAbilities = function getClassAbilities(connection , className){
    return connection.execute(`
        SELECT *
        FROM classabilities
        WHERE class_name = :class
    `, [className])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET class abilities`,
            err: err
        })
    );
};