exports.commit = function commit(connection){
    return connection.commit(err => {
        if(err){
            Promise.reject({
                location: `COMMIT`,
                err: err
            });
        }
        else Promise.resolve();
    });
};