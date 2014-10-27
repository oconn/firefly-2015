var ObjectID = require('mongodb').ObjectID;

function isAdmin(req) {
    return req.user ? req.user.admin : false;
}

module.exports = function(io, db, passport) {
    var portfolioController = require('./controllers/io/portfolioImagesController')(db);
    

    // Serialize User on all requests
    io.use(function(socket, next) {
        var users = db.collection('users'),
            id = null;

        if (socket.request.session &&
            socket.request.session.passport) {
            id = new ObjectID(socket.request.session.passport.user);    
        }

        if (id) {
            users.findOne({'_id': id}, function(err, user) {
                if (err) {
                
                }
                socket.request.user = user;
                next();
            });
        } else {
            next();
        }
    });

    io.on('connection', function(socket) {
        if (!isAdmin(socket.request)) {
            socket.disconnect();
            return;
        }
        portfolioController.uploadImage(socket);
    });
};
