exports.commit = function commit(connection){
    // return connection.execute(`commit`);
    return new Promise((resolve, reject) => {
        return connection.commit(err => {
            if(err){
                error(`COMMIT player`, err, res);
                reject();
            }
            else resolve();
        });
    });
};