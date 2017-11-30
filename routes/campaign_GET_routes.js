const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/campaigns.js`);

exports.initRouter = (connection, router) => {
    // GET all campaigns
    router.get('/campaigns', (req, res) => {
        db.getCampaigns(connection)
        .then(res2 => res.json(res2))
        .catch(err => error(`GET campaigns`, err.message, res));
    });
    
    // GET a single campaign by name
    router.get('/campaigns/:campaign', (req, res) => {
        if(validate(req.params, res))
            db.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length === 0)
                    res.status(400).json({err:`Campaign '${req.params.campaign}' does not exist`});
                else
                    res.json(res2);
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
};