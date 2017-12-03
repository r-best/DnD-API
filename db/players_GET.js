const routes = require(`../routes.js`);
const format = routes.format;

exports.getPlayers = function getPlayers(connection, campaign){
    return connection.execute(`
        SELECT *
        FROM characters
        WHERE campaign_name = :campaign
    `, [campaign])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET players`,
            err: err
        })
    );
};

exports.getPlayer = function getPlayer(connection, campaign, player){
    return connection.execute(`
        SELECT *
        FROM characters
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET player`,
                    err: `Player '${player}' does not exist in campaign '${campaign}'`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET player`,
            err: err
        })
    );
};

exports.getPlayerLevels = function getPlayerLevels(connection, campaign, player){
    return connection.execute(`
        SELECT class_name, lv
        FROM characterlevel
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.resolve({
                    status: 400,
                    data: `Something's very wrong, player '${player}' doesn't seem to have any levels in any classes. What did you do.`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res)
                });
        },
        (err) => Promise.reject({
            location: `GET player levels`,
            err: err
        })
    );
};

exports.getPlayerAbilities = function getPlayerAbilities(connection, campaign, player){
    return connection.execute(`
        SELECT a.ability_name, a.descr
        FROM characterabilities c JOIN abilities a
        ON c.ability_name = a.ability_name
        WHERE c.campaign_name = :campaign AND c.character_name = :player
    `, [campaign, player])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET player abilities`,
            err: err
        })
    );
};

exports.getPlayerItems = function getPlayerItems(connection, campaign, player){
    return connection.execute(`
        SELECT item_name, descr, quantity
        FROM items
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET player items`,
            err: err
        })
    );
};

exports.getPlayerItem = function getPlayerItem(connection, campaign, player, item){
    return connection.execute(`
        SELECT item_name, descr
        FROM items
        WHERE campaign_name = :campaign
        AND character_name = :player
        AND item_name = :item
    `, [campaign, player, item])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET player`,
                    err: `Player ${player} in campaign ${campaign} does not own an item called ${item}`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET player`,
            err: err
        })
    );
};

exports.getPlayerAttacks = function getPlayerAttacks(connection, campaign, player){
    return connection.execute(`
        SELECT attack_name, descr, atk_bonus, damage, dmg_type
        FROM attacks
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET player attacks`,
            err: err
        })
    );
};

exports.getPlayerAttack = function getPlayerAttack(connection, campaign, player, attack){
    return connection.execute(`
        SELECT attack_name, descr, atk_bonus, damage, dmg_type
        FROM attacks
        WHERE campaign_name = :campaign
        AND character_name = :player
        AND attack_name = :atack
    `, [campaign, player, attack])
    .then(
        (res) => {
            if(res.rows.length === 0)
                return Promise.reject({
                    location: `GET player`,
                    err: `Player ${player} in campaign ${campaign} does not know an attack called ${attack}`
                });
            else
                return Promise.resolve({
                    status: 200,
                    data: format(res, false)
                });
        }, (err) => Promise.reject({
            location: `GET player`,
            err: err
        })
    );
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
    .then(
        (res) => Promise.resolve({
            status: 200,
            data: format(res)
        }),
        (err) => Promise.reject({
            location: `GET player spells`,
            err: err
        })
    );
};