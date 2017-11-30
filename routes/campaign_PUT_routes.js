const routes = require(`../routes.js`);
const validate = routes.validate;
const error = routes.error;

const db = require(`../db/campaigns.js`);

exports.initRouter = (connection, router) => {
    router.put(`/campaigns/:campaign`, (req, res) => {
        if(validate(req.params, res))
            // Need to check if the campaign exists already
            db.getCampaign(connection, req.params.campaign)
            .then(res2 => {
                if(res2.length !== 0) // If the campaign already exists, fail
                    return res.status(400).json({err:`Campaign '${req.params.campaign}' already exists!`});
                else // Else go ahead and put it
                    db.putCampaign(connection, req.params.campaign)
                    .then(res2 => res.json(res2))
                    .catch(err => error(`PUT campaign`, err.message, res));
            })
            .catch(err => error(`GET campaign`, err.message, res));
    });
}