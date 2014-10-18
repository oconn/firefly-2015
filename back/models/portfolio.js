var ObjectID = require('mongodb').ObjectID;

module.exports = function(options) {
    options = options || {};

    options._id = options._id ? new ObjectID(options._id) : undefined;

    this._id = options._id || new ObjectID();
    this.name = options.name || undefined;
    this.images = options.images || [];
    this.created_at = options.created_at || new Date();
    this.updated_at = new Date();
};
