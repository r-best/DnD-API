const routes = require(`../routes.js`);
const format = routes.format;

exports.getPlayers = function getPlayers(connection, campaign){
    return connection.execute(`
        SELECT *
        FROM characters
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(res => format(res, true));
};

exports.getPlayer = function getPlayer(connection, campaign, player){
    return connection.execute(`
        SELECT *
        FROM characters
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(res => format(res, false));
};

exports.getPlayerLevels = function getPlayerLevels(connection, campaign, player){
    return connection.execute(`
        SELECT class_name, lv
        FROM characterlevel
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(res => format(res, true));
};

exports.getPlayerAbilities = function getPlayerAbilities(connection, campaign, player){
    return connection.execute(`
        SELECT a.ability_name, a.descr
        FROM characterabilities c JOIN abilities a
        ON c.ability_name = a.ability_name
        WHERE c.campaign_name = :campaign AND c.character_name = :player
    `, [campaign, player])
    .then(res => format(res, true));
};

exports.getPlayerItems = function getPlayerItems(connection, campaign, player){
    return connection.execute(`
        SELECT item_name, descr, quantity
        FROM items
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(res => format(res, true));
};

exports.getPlayerItem = function getPlayerItem(connection, campaign, player, item){
    return connection.execute(`
        SELECT item_name, descr
        FROM items
        WHERE campaign_name = :campaign
        AND character_name = :player
        AND item_name = :item
    `, [campaign, player, item])
    .then(res => format(res, false));
};

exports.getPlayerAttacks = function getPlayerAttacks(connection, campaign, player){
    return connection.execute(`
        SELECT attack_name, descr, atk_bonus, damage, dmg_type
        FROM attacks
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(res => format(res, true));
};

exports.getPlayerAttack = function getPlayerAttack(connection, campaign, player, attack){
    return connection.execute(`
        SELECT attack_name, descr, atk_bonus, damage, dmg_type
        FROM attacks
        WHERE campaign_name = :campaign
        AND character_name = :player
        AND attack_name = :atack
    `, [campaign, player, attack])
    .then(res => format(res, false));
};

exports.getPlayerSpells = function getPlayerSpells(connection, campaign, player){
    return connection.execute(`
        SELECT *
        FROM spells
        WHERE spell_name in (
            SELECT spell_name
            FROM characterspells
            WHERE campaign_name = :campaign AND character_name = :player
        )
    `, [campaign, player])
    .then(res => format(res, true));
};