const oracledb = require('oracledb');
const express = require('express');
const routes = require(`./routes.js`);
const config = require(`./config/config_local.json`);

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
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
            next();
        });
        app.use(require(`body-parser`).json());
        app.use('/api', routes.initRouter(connection));
        app.listen(3000);
        console.log("Server listening...");
    }
);