const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/campaigns.js`);

exports.initRouter = (connection, router) => {
    // GET all campaigns
    router.get('/campaigns', (req, res) => {
        db.getCampaigns(connection)
        .then(
            (res2) => res.status(res2.status).json(res2.data),
            (err) => error(err.location, err.err, res)
        );
    });
    
    // GET a single campaign by name
    router.get('/campaigns/:campaign', (req, res) => {
        if(validate(req.params, res))
            db.getCampaign(connection, req.params.campaign)
            .then(
                (res2) => res.status(res2.status).json(res2.data),
                (err) => error(err.location, err.err, res)
            );
    });
};