var cookieParser = require('cookie-parser'),
    fs = require('fs'),
    sessionSecret = process.env.SESSION_COOKIE_SECRET || 'session secret shh...',
    expressSid = 'connect.sid',
    ObjectID = require('mongodb').ObjectID;

function isAdmin(req) {
    return req.user ? req.user.admin : false;
}

function supportedType(type) {
    var types = [
        'image/jpeg',
        'image/png'
    ];
    return types.indexOf(type) !== -1;
}

function validSize(size) {
    return size < 1048576 * 1024 * 2; // 2GB
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

        socket.on('headers', function(data) {

            if (!supportedType(data.type)) {
                socket.emit('uploader-error', {error: 'File type not supported'});
                socket.disconnect();
                return;
            } 
            
            if (!validSize(data.size)) {
                console.log('is valid');
                socket.emit('uploader-error', {error: 'File is too large'});
                socket.disconnect();
                return;
            }
            
            socket.emit('send-buffer');

            // var wstream = fs.createWriteStream(__base + '/' + data.name);
            // wstream.on('finish', function() {
            //     console.log('finished');
            // });
            // wstream.write(data.buffer);
            // wstream.end();
        });

        socket.on('process-buffer', function(data) {
            console.log(data);
        });
    });
    
    // var portUp = io.of('/portfolios/upload');
    // portUp.on('connection', function(socket) {
    //     if (!isAdmin(socket.request)) {
    //         socket.disconnect();
    //     }
    //     console.log('listen')
    //     socket.on('test', function(data) {
    //         console.log(data);
    //     });
    // });
};
