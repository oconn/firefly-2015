var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    csurf = require('csurf'),
    session = require('express-session'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    routes = require('./routes'),
    MongoStore = require('connect-mongo')(session);
    
var staticPath = __env === 'production' ? 
        __base + '/front/public' : 
        __base + '/front/src';

module.exports = function(db, passport) {
    
    var app = express();
    
    // Set up the view engine
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    
    // Middleware
    app.use('/', express['static'](staticPath));
    if (__env !== 'production') {
        app.use(morgan('dev'));
    }
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: process.env.SESSION_COOKIE_SECRET || 'session secret shh...',
        saveUninitialized: true,
        resave: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 Days
        },
        store: new MongoStore({
            db: db,
            collection: 'sessions'
        })
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
   
    routes(app, db, passport);

    return app;
};
