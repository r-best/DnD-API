const express = require('express');
const app = express();
const db = require('./db/db.js');
const waterline = require('./db/waterline.js');

waterline.waterline.initialize(waterline.config, (err, ontology) => {
    global.collections = ontology.collections;

    var router = express.Router();

    router.get('/', (req, res) => {
        res.json({
            message: 'Navigate to a valid route!'
        });
    });

    router.get('/campaigns', (req, res) => {
        db.getCampaigns().then(res2 => {
            res.json(res2);
        });
    });

    router.get('/campaigns/:campaign', (req, res) => {
        db.getCampaign(req.params.campaign).then(res2 => {
            res.json(res2);
        });
    });

    app.use('/api', router);
    app.listen(3000);
    console.log("Server listening...");
});