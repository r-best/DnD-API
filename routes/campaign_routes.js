const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    // GET all campaigns
    router.get('/campaigns', (req, res) => {
        connection.execute(`
            SELECT *
            FROM campaigns
        `)
        .then(res2 => res.json(format(res2, true)))
        .catch(err => res.status(500).json({err:err.message}));
    });
    
    // GET a single campaign by name
    router.get('/campaigns/:campaign', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM campaigns
                WHERE campaign_name = :campaign
            `, [req.params.campaign])
            .then(res2 => {
                if(res2.rows.length === 0)
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist`});
                else
                    res.json(format(res2, false));
            })
            .catch(err => res.status(500).json({err:err.message}));
    });

    router.put(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                INSERT INTO campaigns
                VALUES (:campaign)
            `, [req.params.campaign])
            .then(res2 => res.json(res2))
            .catch(err => {
                let code = err.message.split(` `)[0];
                code = code.substr(0, code.length-1);
                if(code == `ORA-00001`)
                    return res.status(400).json({err:`Campaign '${req.params.campaign}' already exists!`});
                else
                    return res.status(500).json({err:err.message});
            });
    });

    router.delete(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                DELETE FROM campaigns
                WHERE campaign_name = :campaign
            `, [req.params.campaign])
            .then(res2 => {
                if(res2.rowsAffected == 0)
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist`});
                else if(res2.rowsAffected == 1)
                    res.json(`Campaign '${req.params.campaign}' successfully deleted`);
                else
                    res.json({err:`I don't know how, but you somehow deleted more than one campaign with that request. Thanks for breaking my api, you get a 200 response because TECHNICALLY you deleted the campaign(s) you wanted to.`});
            })
            .catch(err => res.status(500).json({err:err.message}));
    });
};