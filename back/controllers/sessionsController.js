var User = require('../models/user'); 

module.exports = function(db) {
    var c = {},
        users = db.collection('users');
                   
    c.signup = function(req, res) {
        
        users.findOne(
            {'email': req.body.email}, 
            function(err, user) {
                if (err) {
                    res.status(500).json({error: 'Something went wrong. Try again later'});
                    return;
                }

                if (user) {
                    res.status(400).json({error: 'Email is taken'});
                    return;
                }
                
                var u = new User(req.body);
                if (u.email && u.password) {
                    users.insert(new User(req.body), function(err, write) {
                        if (err) {
                            res.status(500).json({error: 'Something went wrong saving your user. Try again later'});
                        }
                        res.status(201).json({success: u.email + ' has been created'});
                    });
                }
            }
        );
    };

    return c;
};
