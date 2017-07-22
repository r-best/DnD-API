const express = require('express');
const app = express();
const db = require('./db.js');
const waterline = require('./waterline/waterline.js');

global.__base = `{$__dirname}/`;

waterline.waterline.initialize(waterline.config, (err, ontology) => {
    if (err){
        return console.err(err);
    }
    // console.log(ontology.collections)
    module.exports.spells = ontology.collections.spells;
    
    var router = express.Router();

    router.get('/', (req, res) => {
        res.json({
            message: 'Navigate to a valid route!'
        });
    });

    router.get('/test', (req, res) => {
        db.getSpells().then(res2 => {
            res.json(res2);
        });
    });
    
    app.use('/api', router);
    app.listen(3000);
    console.log("Server listening...");
});