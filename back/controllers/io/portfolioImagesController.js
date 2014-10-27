var ObjectID = require('mongodb').ObjectID,
    _ = require('lodash'),
    fs = require('fs'),
    gm = require('gm'),
    s3 = require('../../config/master').s3;

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

function removeFile(path) {
    fs.unlink(path, function() {});
}

module.exports = function(db) {
    var c = {};
    
    c.uploadImage = function(socket) {
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
        });

        socket.on('process-buffer', function(data) {
            console.log(data);
            var path = __base + '/tmp/' + data.name;
            var wstream = fs.createWriteStream(path);
            wstream.on('finish', function() {
                socket.emit('upload-progress', {progress: 10});
            });
            wstream.write(data.buffer);
            wstream.end();

        });
    };

    return c;
};
