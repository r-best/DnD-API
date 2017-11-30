const routes = require(`../routes.js`);
const format = routes.format;

exports.deletePlayerLevels = function deletePlayerLevels(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterlevel
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player], {autoCommit: false});
};

exports.deletePlayerAbilities = function deletePlayerAbilities(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterabilities
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [req.params.campaign, req.params.player], {autoCommit: false});
};

exports.deletePlayerSpells = function deletePlayerSpells(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characterspells
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [campaign, player], {autoCommit: false});
};

exports.deletePlayerItems = function deletePlayerItems(connection, campaign, player){
    return connection.execute(`
        DELETE FROM items
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [req.params.campaign, req.params.player], {autoCommit: false});
};

exports.deletePlayer = function deletePlayer(connection, campaign, player){
    return connection.execute(`
        DELETE FROM characters
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [req.params.campaign, req.params.player], {autoCommit: false});
};