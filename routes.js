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
};

/*
    Every route that takes parameters calls this method at the start.
    It checks the parameters and returns a 402 if it doesn't like them
*/
exports.validate = function validate(params, res){
    let valid = new RegExp(`^[A-Za-z0-9-\\s]+$`); // Only allow letters, numbers, hyphens, and spaces
    for(let param of Object.keys(params)){
        if(!valid.test(params[param])){
            res.status(402).json(`'${params[param]}' is not a acceptable parameter. Please use only letters, numbers, hyphens, and spaces.`)
            return false;
        }
    }
    return true;
};

/*
    Last resort error catcher to stop Oracle error messages from
    getting sent to the client (logs them to this program's console instead)
*/
exports.error = function error(err, res){
    console.error(`Error on /campaigns:\n${err}`);
    res.status(500).json(
        `Sorry I can't provide you with a better error message, I'm too scared you'll glean some secret information from it and use it to break my program`
    );
};