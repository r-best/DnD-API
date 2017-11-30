const routes = require(`../routes.js`);
const validate = routes.validate;
const error = routes.error;

exports.initRouter = (connection, router) => {
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
                    return error(err.message, res);
            });
    });
}