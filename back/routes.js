var request = require('request');

function isLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).redirect('/');
    }

    return next();
}

function isAdmin(req, res, next) {
    if (!req.isAuthenticated() || !req.user.admin) {
        return res.status(401).send();
    } 

    return next();
}

module.exports = function(app, db, passport) {
    var staticPagesController = require('./controllers/staticPagesController'),
        postsController = require('./controllers/postsController')(db),
        usersController = require('./controllers/usersController')(db),
        portfoliosController = require('./controllers/portfoliosController')(db),        
        commentsController = require('./controllers/commentsController')(db);
    
    // *********************************** //
    // *************** API *************** //
    // *********************************** //
    
    // *********************************** //
    // ************* USERS *************** //
    // *********************************** //

    app.get('/api/current_user', usersController.getCurrentUser);
    app.get('/api/users', isAdmin, usersController.getUsers);

    // *********** PORTFOLIOS ************ //

    app.get('/api/portfolios', portfoliosController.getPortfolios);
    app.post('/api/portfolios', isAdmin, portfoliosController.addPortfolio);
    // ************* POSTS *************** //

    app.get('/api/posts', postsController.getPosts);
    app.get('/api/posts/slug', postsController.getPostBySlug);
    app.get('/api/posts/:id', postsController.getPost);
    app.post('/api/posts', isAdmin, postsController.createPost);
    app.put('/api/posts/:id', isAdmin, postsController.updatePost);
    app.del('/api/posts/:id', isAdmin, postsController.deletePost);
    
    // ************ COMMENTS ************* //
    app.get('/api/comments/:post_id', commentsController.getComments);
    app.post('/api/comments/:post_id', isLoggedIn, commentsController.createComment);

   
    // ************ SESSIONS ************* //
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/posts',
        failureRedirect: '/signup',
        failureFlash: true   
    }));    

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/posts',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // ********* STATIC PAGES ************ //
    
    app.get('/admin', isAdmin, staticPagesController.index); 
    app.get('*', staticPagesController.index);
};

