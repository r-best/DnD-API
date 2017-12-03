const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/campaigns.js`);

exports.initRouter = (connection, router) => {
    // DELETE a campaign
    router.delete(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res))
            db.deleteCampaign(connection, req.params.campaign)
            .then(
                (res2) => res.status(res2.status).json(res2.data),
                (err) => error(err.location, err.err, res)
            );
    });
}