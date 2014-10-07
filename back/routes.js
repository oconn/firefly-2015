var request = require('request');

// Middleware

function isAuthed(req, res, next) {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/login');
}

module.exports = function(app, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController'),
        postsController = require('./controllers/postsController')(db),
        sessionsController = require('./controllers/sessionsController')(db),
        commentsController = require('./controllers/commentsController')(db);
    
    // *********************************** //
    // *************** API *************** //
    // *********************************** //
   
    // ************* POSTS *************** //

    app.get('/api/posts', postsController.getPosts);
    app.get('/api/posts/slug', postsController.getPostBySlug);
    app.get('/api/posts/:id', postsController.getPost);
    app.post('/api/posts', postsController.createPost);
    app.put('/api/posts/:id', postsController.updatePost);
    app.del('/api/posts/:id', postsController.deletePost);
    
    // ************ COMMENTS ************* //
    app.get('/api/comments/:post_id', commentsController.getComments);
    app.post('/api/comments/:post_id', commentsController.createComment);

    // *********************************** //
    // ************ ADMIN API ************ //
    // *********************************** //
   
    // ************ SESSIONS ************* //
        
    app.post('/api/sessions/signup', sessionsController.signup);

    // ********* STATIC PAGES ************ //
    
    app.get('*', staticPagesController.index);
};
