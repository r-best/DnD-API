const format = require(`../routes.js`).format;

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
        connection.execute(`
            SELECT *
            FROM campaigns
            WHERE campaign_name = :campaign
        `, [req.params.campaign])
        .then(res2 => res.json(format(res2, false)))
        .catch(err => res.status(500).json(err.message));
    });
};