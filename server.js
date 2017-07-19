const express = require('express');
const app = express();

var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use('/api', router);

app.listen(3000);
console.log("listening...");