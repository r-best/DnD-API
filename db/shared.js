exports.commit = function commit(connection){
    return connection.execute(`commit`);
};