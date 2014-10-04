var Comment = require('../models/comment'),
    ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
    
    var c = {},
        commentCollection = db.collection('comments');
    
    c.getComments = function(req, res) {
        commentCollection.find(
            {'post_id': new ObjectID(req.params.post_id)}
        ).toArray(function(err, comments) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }

            res.json(comments);
            return;
        });      
    };

    c.createComment = function(req, res) {
        req.body.post_id = req.params.post_id;
        var comment = new Comment(req.body);
        commentCollection.insert(comment, function(err, write) {
            if (err) {
                res.status(400).json({error: err});
                return;
            }

            res.json(comment);
            return;
        });    
    };

    return c;
};
