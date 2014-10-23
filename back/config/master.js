var dbName = 'firefly2015',
    AWS = require('aws-sdk');

var aws = {
    accessKeyId: process.env.FIREFLY2015_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.FIREFLY2015_AWS_SECRET_ACCESS_KEY
};

AWS.config.update(aws);

var s3 = new AWS.S3();

var mongodbServers = [
    // {
    //     ip: '127.0.0.1',
    //     port: 27017
    // }
];

var database = {
    dbPort: 27017,
    dbName: dbName,
    dbServers: mongodbServers,
    dbUserName: process.env[dbName.toUpperCase() + '_MONGODB_USERNAME'],
    dbPassword: process.env[dbName.toUpperCase() + '_MONGODB_PASSWORD']
};

var uploader = {
};

module.exports = {
    database: database,
    uploader: uploader,
    s3 : s3    
};

/* **** ENVIRONMENT VARIABLES **** /
 *
 *  MONGODB
 *      - password:  'DBNAME' + _MONGODB_PASSWORD
 *      - username:  'DBNAME' + _MONGODB_USERNAME
 *
 *  NODE
 *      - env:  NODE_ENV  
 *          default: development
 *          options: 
 *              local_development
 *              development
 *              production
 *  
 *      - port: NODE_PORT
 *          default: 8000
 *      
 * ****************************** */

