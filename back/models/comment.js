var ObjectID = require('mongodb').ObjectID;

module.exports = function(options) {
    options = options || {};
    options._id = options._id ? new ObjectID(options._id) : undefined;
    options.post_id = options.post_id ? new ObjectID(options.post_id) : undefined;

    this._id = options.id || new ObjectID();
    this.post_id = options.post_id || undefined;
    this.parent_id = options.parent_id || undefined;
    this.slug = options.slug || undefined;
    this.full_slug = options.full_slug || undefined;
    this.text = options.text || undefined;
    this.user = options.user || undefined;
    this.depth = options.depth || 0;
    this.created_at = new Date();
};
