var request = require('request'),
    logger = new require('winston-logger');

// Middleware

function isAuthed(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

module.exports = function(app, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController');
        
    
    // *********************************** //
    // *************** API *************** //
    // *********************************** //

    // ********* STATIC PAGES *********** //

    // ************* AUTH *************** //

    app.get('*', staticPagesController.index);
};
