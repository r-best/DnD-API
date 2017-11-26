const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    // DELETE a campaign
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
}