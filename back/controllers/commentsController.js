var Comment = require('../models/comment'),
    ObjectID = require('mongodb').ObjectID,
    _ = require('lodash');

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

            // Hide Commenter ID from client
            comments = _.map(comments, function(comment) {
                if (comment.user && comment.user._id) {
                    delete comment.user._id;
                }
                return comment;
            });

            res.json(comments);
            return;
        });      
    };

    c.createComment = function(req, res) {
        req.body.post_id = req.params.post_id;
        var comment = new Comment(req.body);

        // Add Commenter ID to saved documnet
        comment.user._id = req.user._id;

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
