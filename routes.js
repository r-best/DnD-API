const fs = require(`fs`);

exports.initRouter = connection => {
    var router = require(`express`).Router();
    
    // Base route
    router.get('/', (req, res) => {
        res.json({
            message: 'Navigate to a valid route!'
        });
    });

    // 418
    router.get('/teapot', (req, res) => {
        res.sendStatus(418);
    });

    // Go through all the files in the /routes
    // directory to set up their routes
    fs.readdir(`./routes/`, (err, files) => {
        if(err)
            console.error(err);
        files.forEach((file, index) => {
            let routeFile = require(`./routes/${file}`)
            routeFile.initRouter(connection, router);
        });
    });

    return router;
};

/*
    Takes the response data from a query and reformats it into 
    something that will be easier for the frontend to work with
    becuase I hate how the oracledb package returns data

    expectList is a boolean that tells whether or not we expect
    this data to possibly be a list of things, if true it will
    always return an array, if false it can still return an 
    array but will truncate to just an object if there's only one
    thing in the array (which there should be if we're not expecting
    a list)
*/
exports.format = function format(data, expectList){
    let formattedData = [];
    for(let i = 0; i < data.rows.length; i++){
        formattedData[i] = {};
        for(let j = 0; j < data.metaData.length; j++){
            (formattedData[i])[data.metaData[j].name] = data.rows[i][j];
        }
    }
    if(!expectList && formattedData.length == 1){
        formattedData = formattedData[0];
    }
    return formattedData;
}