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
};