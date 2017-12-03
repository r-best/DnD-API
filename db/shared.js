exports.commit = function commit(connection){
    return connection.commit(err => {
        console.log(`COMMIT`)
        if(err){
            Promise.reject({
                location: `COMMIT`,
                err: err
            });
        }
        else Promise.resolve();
    });
};