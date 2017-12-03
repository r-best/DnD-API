const routes = require(`../routes.js`);
const format = routes.format;

exports.deletePlayerLevels = function deletePlayerLevels(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterlevel
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player]).then(res => {
        if(res.rowsAffected === 0)
            return Promise.reject({
                location: `DELETE player level`,
                err: `Failed to delete player levels`
            });
        else
            return Promise.resolve();
    }, err => 
        Promise.reject({
            location: `PUT player level`,
            err: err
        })
    );
};

exports.deletePlayerAbilities = function deletePlayerAbilities(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterabilities
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player]).then(
        (res) => Promise.resolve({
            status: 200,
            data: res
        }),
        (err) => Promise.reject({
            location: `DELETE player abilities`,
            err: err
        })
    );
};

exports.deletePlayerSpells = function deletePlayerSpells(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterspells
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player]).then(
        (res) => Promise.resolve({
            status: 200,
            data: res
        }),
        (err) => Promise.reject({
            location: `DELETE player spells`,
            err: err
        })
    );
};

exports.deletePlayerItems = function deletePlayerItems(connection, campaign, player){
    return connection.execute(`
        DELETE FROM items
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player]).then(
        (res) => Promise.resolve({
            status: 200,
            data: res
        }),
        (err) => Promise.reject({
            location: `DELETE player items`,
            err: err
        })
    );
};

exports.deletePlayer = function deletePlayer(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characters
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player]).then(
        (res) => Promise.resolve({
            status: 200,
            data: res
        }),
        (err) => Promise.reject({
            location: `DELETE player`,
            err: err
        })
    );
};