const express = require('express');
const app = express();
const db = require('./db.js');

var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Navigate to a valid route!'
    });
});

router.get('/test', (req, res) => {
    res.json(db.test());
});

app.use('/api', router);
app.listen(3000);
console.log("Server listening...");