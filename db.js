var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
});

var db = new AWS.DynamoDB();

module.exports.test = function test(){
    return {
        message: "yeehaw"
    };
}