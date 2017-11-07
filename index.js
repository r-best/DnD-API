const oracledb = require('oracledb');
const express = require('express');
const routes = require(`./routes.js`);
const config = require(`./config/config.json`);

oracledb.getConnection(config,
    (err, connection) => {
        if(err){
            console.error(err.message);
            return;
        }
        console.log(`Connected to database`);
        
        const app = express();
        app.use('/api', routes.initRouter(connection));
        app.listen(3000);
        console.log("Server listening...");
    }
);