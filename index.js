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
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
        app.use('/api', routes.initRouter(connection));
        app.listen(3000);
        console.log("Server listening...");
    }
);