const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players = require(`../db/players_PUT.js`);
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
// DONT FORGET need to check that player doesn't already exist
exports.initRouter = (connection, router) => {
    // PUT a new player
    router.put('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res) && validatePlayer(req.body, res))
            // Test if campaign exists
            db_campaigns.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0) // If not, fail
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist!`});
                else // Else, check that player doesn't already exist
                    db_players_GET.getPlayer(connection, req.params.campaign, req.params.player)
                    .then(res3 => {
                        if(res3 !== []) // If it does, fail
                            res.status(400).json({err:`Player '${req.params.player}' already exists in campaign ${req.params.campaign}!`});
                        else // Else, attempt to put player
                            db_players.putPlayer(connection, req.params.campaign, req.body)
                            .then(res3 => {
                                if(res3.rowsAffected === 0) // If player was failed to insert without giving an error, give up.
                                    res.status(500).json({err:`1Player was not inserted and I don't know why, the code shouldn't be able to reach this point`});
                                else // Else, attempt to put character level
                                    db_players.putPlayerLevel(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.CLASS_NAME)
                                    .then(res4 => {
                                        if(res4.rowsAffected === 0) // If player level failed to insert without giving an error, die.
                                            res.status(500).json({err:`2Player was not inserted and I don't know why, the code shouldn't be able to reach this point`});
                                        else // Else attempt to insert abilities
                                            db_players.putPlayerAbilities(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.ABILITIES)
                                            .then(res5 => {
                                                let flag = true;
                                                // If any of the ability inserts failed, fail
                                                for(let i = 0; i < res5.length; i++){
                                                    if(res5[i] !== true){
                                                        flag = false;
                                                        res.status(500).json({err:res5[i]});
                                                        break;
                                                    }
                                                }
                                                // Else attempt to insert spells
                                                if(flag){
                                                    console.log('aaaaaa')
                                                    db_players.putPlayerSpells(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.SPELLS)
                                                    .then(res6 => {
                                                        // If any of the spell inserts failed, fail
                                                        for(let i = 0; i < res6.length; i++){
                                                            if(res6[i] !== true){
                                                                flag = false;
                                                                res.status(500).json({err:res6[i]});
                                                                break;
                                                            }
                                                        }
                                                        // Else, we're finally done, commit
                                                        if(flag){
                                                            db_shared.commit(connection)
                                                            .then(res7 => {console.log(`Player Added!`);res.json(`Player successfully added`)})
                                                            .catch(err => error(`commit player`, err, res));
                                                        }
                                                    })
                                                    .catch(err => error(`PUT player spells`, err, res));
                                                }
                                            })
                                            .catch(err => error(`PUT player abilities`, err, res));
                                    })
                                    .catch(err => error(`PUT player level`, err, res));
                            })
                            .catch(err => error(`PUT player`, err, res));
                    })
                    .catch(err => error(`GET player`, err, res));
            })
            .catch(err => error(`GET campaign`, err, res));
    });
};