exports.updatePlayer = function updatePlayer(connection, campaign, player){
    return connection.execute(`
        UPDATE characters
        SET alignment = :alignment,
            ac = :ac,
            max_hp = :max_hp,
            spd = :spd,
            insp =  :insp,
            str = :str,
            dex = :dex,
            con = :con,
            int = :int,
            wis = :wis,
            cha = :cha
        WHERE campaign_name = :campaign
        AND character_name = :player
    `, [
        player[`ALIGNMENT`],
        player[`AC`],
        player[`MAX_HP`],
        player[`SPD`],
        player[`INSP`],
        player[`STR`],
        player[`DEX`],
        player[`CON`],
        player[`INT`],
        player[`WIS`],
        player[`CHA`],
        campaign,
        player[`CHARACTER_NAME`]
    ])
    .then(
        (res2) => Promise.resolve(),
        (err) => Promise.reject({
            location: `UPDATE player`,
            err: err
        })
    );
};

exports.updatePlayerLevel = function updatePlayerLevel(connection, campaign, player, classObj){
    return connection.execute(`
        UPDATE characterlevel
        SET lv = :lv
        WHERE campaign_name = :campaign
        AND character_name = :player
        AND class_name = :class
    `, [
        classObj[`LV`],
        campaign,
        player,
        classObj[`CLASS_NAME`]
    ])
    .then(
        (res2) => Promise.resolve(),
        (err) => Promise.reject({
            location: `UPDATE player levels`,
            err: err
        })
    );
};