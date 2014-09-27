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
    var staticPagesController = require('./controllers/staticPagesController'),
        postsController = require('./controllers/postsController')(db);
        
    
    // *********************************** //
    // *************** API *************** //
    // *********************************** //
   
    // ************* POSTS *************** //
    app.get('/api/posts', postsController.getPosts);
    app.get('/api/posts/:id', postsController.getPost);
    app.post('/api/posts', postsController.createPost);
    app.put('/api/posts/:id', postsController.updatePost);
    app.del('/api/posts/:id', postsController.deletePost);

    // *********************************** //
    // ************ ADMIN API ************ //
    // *********************************** //
   


    // ********* STATIC PAGES ************ //

    app.get('*', staticPagesController.index);
};
