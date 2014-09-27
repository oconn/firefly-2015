var ObjectID = require('mongodb').ObjectID;

module.exports = function(params) {
    this._id = new ObjectID();
    this.title = params.title;
    this.description = params.description;
    this.body = params.body;
    this.updatedAt = new Date();
};
