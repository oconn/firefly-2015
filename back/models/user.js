var bcrypt = require('bcrypt'),
    ObjectID = require('mongodb').ObjectID;


function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);   
}

function validEmail(email) {
    // TODO validate email
    return email;
}

function validPassword(password) {
    // TODO validate password
    return password;  
}

module.exports = function(options) {
    options = options || {};
    
    this._id = options._id || new ObjectID();

    this.email = validEmail(options.email) ? 
        options.email : undefined;

    this.password = validPassword(options.password) ? 
        hashPassword(options.password) : undefined;
};
