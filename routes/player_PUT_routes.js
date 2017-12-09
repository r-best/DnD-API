const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players_GET = require(`../db/players_GET.js`);
const db_players_PUT = require(`../db/players_PUT.js`);
const db_players_UPDATE = require(`../db/players_UPDATE.js`);
const db_shared = require(`../db/shared.js`);

function validatePlayer(player, res){
    let pattern = new RegExp(`^[A-Za-z0-9-//s]+`);
    if(!(pattern.test(player[`CHARACTER_NAME`]))){
        res.status(400).json({err:`Player name '${player[`CHARACTER_NAME`]}' is not valid`});
        return false;
    }
    let alignments = [
        `Lawful Good`, `Neutral Good`, `Chaotic Good`,
        `Lawful Neutral`, `True Neutral`, `Chaotic Neutral`,
        `Lawful Evil`, `Neutral Evil`, `Chaotic Evil`
    ];
    if(!alignments.includes(player[`ALIGNMENT`])){
        res.status(400).json({err:`'${player[`CHARACTER_NAME`]}' is not a valid alignment`});
        return false;
    }
    if(player[`AC`] < 0){
        res.status(400).json({err:`'${player[`CHARACTER_NAME`]}' is not a valid alignment`});
        return false;
    }
    let scores = [`STR`, `DEX`, `CON`, `INT`, `WIS`, `CHA`];
    for(let score of scores){
        if(player[score] < 0 || player[score] > 20){
            res.status(400).json({err:`'${player[score]}' is not a valid ${score} score`});
            return false;
        }
    }
    return true;
}

function checkPlayerDoesntExist(connection, campaign, player){
    return connection.execute(`
        SELECT *
        FROM characters
        WHERE campaign_name = :campaign AND character_name = :player
    `, [campaign, player])
    .then(
        (res) => {
            if(res.rows.length !== 0)
                Promise.resolve(false); // Player exists
            else
                Promise.resolve(true); // Player doesn't exist
        },
        (err) => Promise.reject({
            location: `check player doesn't exist`,
            err: err
        })
    );
}

exports.initRouter = (connection, router) => {
    //PUT new items
    router.put(`/campaigns/:campaign/players/:player/items/:item`, (req, res) => {
        if(validate(req.params, res))
            db_players_PUT.putPlayerItem(connection, req.params.campaign, req.params.player, req.body)
            .then(
                (res) => {
                    db_shared.commit(connection)
                    .then(
                        (res2) => res.json(`Successfully added item ${req.params.item}`),
                        (err) => error(err, res)
                    ).catch(err => error(err, res));
                },
                (err) => error(err, res)
            ).catch(err => error(err, res));
    });

    // PUT a new player
    router.put('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res) && validatePlayer(req.body, res)){
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(
                (res2) => {
                    db_players_GET.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(
                        (res3) => { // Player already exists, so update it
                            db_players_GET.getPlayerAbilities(connection, req.params.campaign, req.params.player)
                            .then(
                                (res4) => {
                                    console.log(req.body.CHA)
                                    res4 = res4.data;
                                    for(let i = 0; i < res4.length; i++)
                                        res4[i] = res4[i][`ABILITY_NAME`];
                                    // Go through new ability list and remove any that existed in the old one
                                    for(let i = 0; i < req.body.ABILITIES.length; i++){
                                        if(res4.includes(req.body.ABILITIES[i])){
                                            req.body.ABILITIES.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    console.log(req.body.ABILITIES)
                                    db_players_GET.getPlayerSpells(connection, req.params.campaign, req.params.player)
                                    .then(
                                        (res5) => {
                                            res5 = res5.data;
                                            for(let i = 0; i < res5.length; i++)
                                                res5[i] = res5[i][`SPELL_NAME`];
                                            // Go through new spell list and remove any that existed in the old one
                                            for(let i = 0; i < req.body.SPELLS.length; i++){
                                                if(res5.includes(req.body.SPELLS[i])){
                                                    req.body.SPELLS.splice(i, 1);
                                                    i--;
                                                }
                                            }
                                            let queries = [
                                                () => db_players_UPDATE.updatePlayer(connection, req.params.campaign, req.params.player, req.body),
                                                () => db_players_UPDATE.updatePlayerLevel(connection, req.params.campaign, req.params.player, req.body.CLASS),
                                                () => db_players_PUT.putPlayerAbilities(connection, req.params.campaign, req.params.player, req.body.ABILITIES),
                                                () => db_players_PUT.putPlayerSpells(connection, req.params.campaign, req.params.player, req.body.SPELLS),
                                                () => db_shared.commit(connection)
                                            ];
                                            queries.reduce(
                                                (p, fn) => p.then(
                                                    () => fn(),
                                                    (err) => {connection.rollback();error(err, res)}
                                                ).catch((err) => {connection.rollback();error(err, res)}),
                                                Promise.resolve()
                                            ).then(res2 => res.json(`Successfully updated player!`));
                                        },
                                        (err) => error(err, res)
                                    ).catch((err) => error(err, res));
                                },
                                (err) => error(err, res)
                            ).catch((err) => error(err, res));
                        },
                        (err) => {
                            if(err.err === `Player '${req.params.player}' does not exist in campaign '${req.params.campaign}'`){
                                // If this is the error message, then the player doesn't exist, so add it
                                let queries = [
                                    () => db_players_PUT.putPlayer(connection, req.params.campaign, req.body),
                                    () => db_players_PUT.putPlayerLevel(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.CLASS_NAME),
                                    () => db_players_PUT.putPlayerAbilities(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.ABILITIES),
                                    () => db_players_PUT.putPlayerSpells(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.SPELLS),
                                    () => db_shared.commit(connection)
                                ];
                                queries.reduce(
                                    (p, fn) => p.then(
                                        () => fn(),
                                        (err) => {connection.rollback();error(err, res)}
                                    ).catch((err) => {connection.rollback();error(err, res)}),
                                    Promise.resolve()
                                ).then(res2 => res.json(`Successfully added player!`));
                            }
                            else // Any other error message was an actual error message, so throw an error
                                error(err, res);
                        }
                    ).catch((err) => error(err, res));
                },
                (err) => error(err, res)
            ).catch((err) => error(err, res));
        }
    });
};