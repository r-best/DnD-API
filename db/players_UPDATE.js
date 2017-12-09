exports.updatePlayer = function updatePlayer(connection, campaign, playerName, playerObj){
    console.log(`playercha`, playerObj[`CHA`])
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
        playerObj[`ALIGNMENT`],
        playerObj[`AC`],
        playerObj[`MAX_HP`],
        playerObj[`SPD`],
        playerObj[`INSP`],
        playerObj[`STR`],
        playerObj[`DEX`],
        playerObj[`CON`],
        playerObj[`INT`],
        playerObj[`WIS`],
        playerObj[`CHA`],
        campaign,
        playerName
    ])
    .then(
        (res) => {
            console.log(res);
            Promise.resolve()},
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