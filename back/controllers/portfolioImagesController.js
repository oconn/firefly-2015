var ImageModel = require('../models/portfolioImage'),
    ObjectID = require('mongodb').ObjectID,
    _ = require('lodash'),
    formidable = require('formidable'),
    fs = require('fs'),
    s3 = require('../config/master').s3,
    gm = require('gm');

function parseForm(request, cb) {
    var form = new formidable.IncomingForm();
    form.uploadDir = __base + '/tmp';
    form.maxFieldsSize = 1 * 1024 * 1024 * 1024;
    form.parse(request, function(err, fields, files) {
        cb(err, fields, files); 
    });    
}

function supportedType(type) {
    var types = [
        'image/jpeg',
        'image/png',
        'image/jpg'
    ];
    return types.indexOf(type) !== -1;
}

function removeFile(path) {
    fs.unlink(path, function() {});
}

function uploadToS3(files, id,  cb) {
    var completed = [];
    _.each(files, function(file) {
        fs.readFile(file, function(err, data) {
            if (err) {
                return;
            }
            
            var fileName = file.split('/');
            fileName = fileName[fileName.length - 1];
            
            s3.putObject({
                'Bucket': '2015-firefly',
                'Key': 'portfolios/' + id + '/' + fileName,
                'Body': data
            }, function(err, result) {
                if (err) {
                    completed.push('fail');    
                } else {
                    completed.push('success');
                }
                if(completed.length === files.length) {
                    cb(completed);
                }
            });
        }); 
    });
}

function createImages(file) {
    var sizes = [
        '1000',
        '600',
        '100'
    ]; 

    
    return _.map(sizes, function(size) {
        var path = __base + '/images/' + size + '_' + file.name;
        gm(file.path)
            .resize(1000, 1000)
            .write(path, function(err) {
                if (err) {

                }
                // TODO 
            });
        return path; 
    });
}

module.exports = function(db) {
    var c = {},
        imageCollection = db.collection('portfolio_images');
    
    c.addImages = function(req, res) {
        parseForm(req, function(err, fields, files) {
            if (err) {
                res.status(500).json({error: err});
                return;
            }
            _.each(files, function(file) {
                if (!supportedType(file.type)) { 
                    removeFile(file.path);
                    res.status(400).json({error: 'File type not supported'});
                    return; 
                }
                
                var image = new ImageModel({
                    portfolio_id: new ObjectID(fields.portfolioId),
                    name: file.name 
                }); 

                imageCollection.insert(image, function(err, result) {
                    if (err) {
                        // TODO 
                        removeFile(file.path);
                        return;
                    }   

                    var images = createImages(file);
                    uploadToS3(images, image.portfolio_id, function(results) {
                        _.each(images, function(i) {
                            removeFile(i);
                        });
                        removeFile(file.path);
                        res.json(results);
                    });
                });
            });    
        }); 
    };

    c.getImages = function(req, res) {
    
    };

    return c;
};
