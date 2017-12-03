const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db_campaigns = require(`../db/campaigns.js`);
const db_players_GET = require(`../db/players_GET.js`);
const db_players_PUT = require(`../db/players_PUT.js`);
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
                Promise.reject({
                    location: `check player doesn't exist`,
                    err: `Player '${player}' already exists in campaign ${campaign}!`
                });
            else Promise.resolve();
        },
        (err) => Promise.reject({
            location: `check player doesn't exist`,
            err: err
        })
    );
}

exports.initRouter = (connection, router) => {
    // PUT a new player
    router.put('/campaigns/:campaign/players/:player', (req, res) => {
        if(validate(req.params, res) && validatePlayer(req.body, res)){
            let queries = [
                () => db_campaigns.getCampaign(connection, req.params.campaign),
                () => checkPlayerDoesntExist(connection, req.params.campaign, req.params.player),
                () => db_players_PUT.putPlayer(connection, req.params.campaign, req.body),
                () => db_players_PUT.putPlayerLevel(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.CLASS_NAME),
                () => db_players_PUT.putPlayerAbilities(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.ABILITIES),
                () => db_players_PUT.putPlayerSpells(connection, req.params.campaign, req.body.CHARACTER_NAME, req.body.SPELLS),
                () => db_shared.commit(connection)
            ];
            queries.reduce(
                (p, fn) => p.then(
                    () => fn(),
                    (err) => {connection.rollback();error(err.location, err.err, res)}
                ).catch((err) => {connection.rollback();error(err.location, err.err, res)}),
                Promise.resolve()
            ).then(res2 => res.json(`Successfully added player!`));
        }
    });
};