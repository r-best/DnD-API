const routes = require(`../routes.js`);
const format = routes.format;

exports.putPlayer = function putPlayer(connection, campaign, player){
    return new Promise((resolve, reject) =>{
        return connection.execute(`
            INSERT INTO characters
            VALUES (
                :CHARACTER_NAME,
                :campaign,
                :RACE_NAME,
                :ALIGNMENT,
                :AC,
                :MAX_HP,
                :SPD,
                0,
                :STR,
                :DEX,
                :CON,
                :INT,
                :WIS,
                :CHA
            )
        `,
        [
            player.CHARACTER_NAME,
            campaign,
            player.RACE_NAME,
            player.ALIGNMENT,
            player.AC,
            player.MAX_HP,
            player.SPD,
            player.STR,
            player.DEX,
            player.CON,
            player.INT,
            player.WIS,
            player.CHA
        ])
        .then(res => {
            if(res.rowsAffected === 0)  // If player was failed to insert without giving an error, give up.
                reject({
                    location: `PUT player`,
                    err: `1Player was not inserted and I don't know why, the code shouldn't be able to reach this point`
                });
            else resolve();
        }, err => 
            reject({
                location: `PUT player`,
                err: err
            })
        )
    });
};

exports.putPlayerLevel = function putPlayerLevel(connection, campaign, player, className){
    return new Promise((resolve, reject) => {
        return connection.execute(`
            INSERT INTO characterlevel
            VALUES (:CHARACTER_NAME, :campaign, :CLASS_NAME, 1)
        `, [player, campaign, className])
        .then(res => {
            if(res.rowsAffected === 0) // If player level failed to insert without giving an error, die.
                reject({
                    location: `PUT player level`,
                    err:`2Player was not inserted and I don't know why, the code shouldn't be able to reach this point`
                });
            else resolve();
        }, err => 
            reject({
                location: `PUT player level`,
                err: err
            })
        )
    });
};

exports.putPlayerAbilities = function putPlayerAbilities(connection, campaign, player, abilities){
    let queries = [];
    for(let i = 0; i < abilities.length; i++){
        queries[i] = new Promise((resolve, reject) => 
            connection.execute(`
                INSERT INTO characterabilities
                VALUES (:CHARACTER_NAME, :campaign, :ABILITY_NAME)
            `, [player, campaign, abilities[i]])
            .then(res => {
                if(res.rowsAffected === 0)
                    reject({
                        location:`PUT player ability`,
                        err:`3Player was not inserted and I don't know why, the code shouldn't be able to reach this point`
                    });
                else resolve();
            }, err => 
                reject({
                    location: `PUT player ability`,
                    err: err
                })
            )
        );
    }
    return Promise.all(queries)
};

exports.putPlayerSpells = function putPlayerSpells(connection, campaign, player, spells){
    let queries = [];
    for(let i = 0; i < spells.length; i++){
        queries[i] = new Promise((resolve, reject) => 
            connection.execute(`
                INSERT INTO characterspells
                VALUES (:CHARACTER_NAME, :campaign, :SPELL_NAME)
            `, [player, campaign, spells[i]])
            .then(res => {
                if(res.rowsAffected === 0)
                    reject({
                        location:`PUT player spell`,
                        err:`4Player was not inserted and I don't know why, the code shouldn't be able to reach this point`
                    });
                else resolve();
            }, err => 
                reject({
                    location: `PUT player spell`,
                    err: err
                })
            )
        );
    }
    return Promise.all(queries)
};