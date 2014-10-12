var ObjectID = require('mongodb').ObjectID,
    User = require('../models/user');

module.exports = function(db) {
    var c = {},
        User = db.collection('users');
    
    c.getCurrentUser = function(req, res) {
        if (!req.isAuthenticated()) {
            res.json({});
            return;
        }

        User.findOne({_id: new ObjectID(req.user._id)}, function(err, user) {
            if (err) {
                res.status(500).json({error: err});
                return;
            }

            var safeUser = {
                name: user.name,
                email: user.email,
                admin: user.admin
            };

            res.json(safeUser);
            return;
        });
    };

    return c;
};
