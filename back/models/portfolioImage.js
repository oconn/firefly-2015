var ObjectID = require('mongodb').ObjectID;

module.exports = function(options) {
    options = options || {};
    options._id = options._id ? new ObjectID(options._id) : undefined;

    this._id = options._id || new ObjectID();
    this.portfolio_id = options.portfolio_id || undefined;
    this.name = options.name || undefined;
};

