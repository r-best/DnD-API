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
        .catch(err => res.status(500).json(err.message));
    });
    
    // GET a single campaign by name
    router.get('/campaigns/:campaign', (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                SELECT *
                FROM campaigns
                WHERE campaign_name = :campaign
            `, [req.params.campaign])
            .then(res2 => res.json(format(res2, false)))
            .catch(err => res.status(500).json(err.message));
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
                    return res.status(400).json(`Campaign '${req.params.campaign}' already exists!`);
                else
                    return res.status(500).json(err.message);
            });
    });

    router.delete(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                DELETE FROM campaigns
                WHERE campaign_name = :campaign
            `, [req.params.campaign])
            .then(res2 => res.json(res2))
            .catch(err => res.status(500).json(err.message));
    });
};