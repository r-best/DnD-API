const routes = require(`../routes.js`);
const format = routes.format;
const validate = routes.validate;

exports.initRouter = (connection, router) => {
    router.delete(`/campaigns/:campaign/players/:player`, (req, res) => {
        if(validate(req.params, res))
            connection.execute(`
                DELETE FROM characterlevel
                WHERE campaign_name = :campaign
                AND character_name = :player
            `, [req.params.campaign, req.params.player])
            .then(res => {
                connection.execute(`
                    DELETE FROM characterabilities
                    WHERE campaign_name = :campaign
                    AND character_name = :player
                `, [req.params.campaign, req.params.player])
                .then(res => {
                    connection.execute(`
                        DELETE FROM characterspells
                        WHERE campaign_name = :campaign
                        AND character_name = :player
                    `, [req.params.campaign, req.params.player])
                    .then(res => {
                        connection.execute(`
                            DELETE FROM items
                            WHERE campaign_name = :campaign
                            AND character_name = :player
                        `, [req.params.campaign, req.params.player])
                        .then(res => {
                            connection.execute(`
                                DELETE FROM characters
                                WHERE campaign_name = :campaign
                                AND character_name = :player
                            `, [req.params.campaign, req.params.player])
                            .then(res => {
                                res.json(`Player ${req.params.player} successfully deleted from campaign ${req.params.campaign}`);
                            });
                        });
                    });
                });
            })
            .catch(err => res.status(500).json({err:err.message}))
    });
};