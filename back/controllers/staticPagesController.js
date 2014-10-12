module.exports = {
    index: function(req, res) {
      
        var locals = {
            message: req.flash('message')
        };

        if (locals.message.length === 0) {
            delete locals.message;
        }

        res.render('index', locals, function(err, html) {
            if (err) {
                res.send(500);
                return;
            }

            res.set('Content-Type', 'text/html');
            res.send(200, new Buffer(html));
            return;
        });
    }
};
