const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

function validatePlayer(player, res){
    let pattern = new RegExp(`^[A-Za-z0-9-//s]+`);
    if(!(pattern.test(player[`CHARACTER_NAME`]))){
        res.status(402).json({err:`Player name '${player[`CHARACTER_NAME`]}' is not valid`});
        return false;
    }
    let alignments = [
        `Lawful Good`, `Neutral Good`, `Chaotic Good`,
        `Lawful Neutral`, `True Neutral`, `Chaotic Neutral`,
        `Lawful Evil`, `Neutral Evil`, `Chaotic Evil`
    ];
    if(!alignments.includes(player[`ALIGNMENT`])){
        res.status(402).json({err:`'${player[`CHARACTER_NAME`]}' is not a valid alignment`});
        return false;
    }
    if(player[`AC`] < 0){
        res.status(402).json({err:`'${player[`CHARACTER_NAME`]}' is not a valid alignment`});
        return false;
    }
    let scores = [`STR`, `DEX`, `CON`, `INT`, `WIS`, `CHA`];
    for(let score of scores){
        if(player[score] < 0 || player[score] > 20){
            res.status(402).json({err:`'${player[score]}' is not a valid ${score} score`});
            return false;
        }
    }
    return true;
}

exports.initRouter = (connection, router) => {
    // PUT a new player
    router.put('/campaigns/:campaign/players/:player', (req, res) => {
        console.log(req.body)
        if(validate(req.params, res) && validatePlayer(req.body, res))
            connection.execute(`
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
                req.body.CHARACTER_NAME,
                req.params.campaign,
                req.body.RACE_NAME,
                req.body.ALIGNMENT,
                req.body.AC,
                req.body.MAX_HP,
                req.body.SPD,
                req.body.STR,
                req.body.DEX,
                req.body.CON,
                req.body.INT,
                req.body.WIS,
                req.body.CHA
            ])
            .then(res2 => {
                connection.execute(`
                    INSERT INTO characterlevel
                    VALUES (:CHARACTER_NAME, :campaign, :CLASS_NAME, 1)
                `, [req.body.CHARACTER_NAME, req.params.campaign, req.body.CLASS_NAME]).then(res3 => {
                    for(ability of req.body.ABILITIES){
                        connection.execute(`
                            INSERT INTO characterabilities
                            VALUES (:CHARACTER_NAME, :campaign, :ABILITY_NAME)
                        `, [req.body.CHARACTER_NAME, req.params.campaign, ability]).then(res4 => {
    
                        }).catch(err => res.status(500).json({err:err.message}));
                    }
                    for(spell of req.body.SPELLS){
                        connection.execute(`
                            INSERT INTO characterspells
                            VALUES (:CHARACTER_NAME, :campaign, :SPELL_NAME)
                        `, [req.body.CHARACTER_NAME, req.params.campaign, spell]).then(res4 => {
    
                        }).catch(err => res.status(500).json({err:err.message}));
                    }
                })
                res.json(res2)
            })
            .catch(err => res.status(500).json({err:err.message}));
    });
};