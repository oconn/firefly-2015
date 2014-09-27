var helpers = require('../helpers/post_helpers'),
    Post = require('../models/post');

module.exports = function(db) {
    var c = {},
        postsCollection = db.collection('posts');
        postsCollection.ensureIndex(
            {title: 1},
            {
                unique: true,
                dropDups: true
            },
            function(err, results) {
            
            }
        );
    
    c.getPosts = function(req, res) {           
        postsCollection.find().toArray(function(err, posts) {
            if (err) {
                res.json({'error': err});
                return;
            } 

            res.json(posts);
            return;
        });    
    };
    
    c.getPost = function(req, res) {
        postsCollection.find({'_id': req.params.id}, function(err, post) {
            if (err) {
                res.json({'error': err});
                return;
            }

            res.json(post);
            return;
        });
    };

    c.createPost = function(req, res) {
        var post = new Post(req.body);
        postsCollection.insert(post, function(err, write) {
            if (err) {
                res.json({'error': err});
                return;
            } 

            res.json(post);
            return;
        });
    };
    
    c.updatePost = function(req, res) {
    
    };
    
    c.deletePost = function(req, res) {
        postsColon    
    };

    return c;
};
