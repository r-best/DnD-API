const express = require('express');
const db = require('./db/db.js');
const config = require(`./config/config.json`);

oracledb.getConnection(config,
    (err, connection) => {
        if(err){
            console.error(err.message);
            return;
        }
        console.log(`Connected to database`);

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
        
        router.get('/campaigns/:campaign/players', (req, res) => {
            db.getPlayersInCampaign(req.params.campaign).then(res2 => {
                res.json(res2);
            });
        });
        
        router.get('/campaigns/:campaign/players/:player', (req, res) => {
            db.getPlayerInCampaign(req.params.campaign, req.params.player).then(res2 => {
                res.json(res2);
            });
        });
        
        const app = express();
        app.use('/api', router);
        app.listen(3000);
        console.log("Server listening...");

        console.log(`Server shutting down`);
        connection.close((err) => {
            if(err)
                console.error(err.message);
        });
    }
);