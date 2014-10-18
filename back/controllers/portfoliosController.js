var ObjectID = require('mongodb').ObjectID,
    PortfolioModel = require('../models/portfolio'),
    _ = require('lodash');

module.exports = function(db) {
    var c = {},
        Portfolio = db.collection('portfolios');
    
    Portfolio.ensureIndex(
        {name: 1},
        {
            unique: true,
            dropDups: true    
        }, 
        function(err, results) {
        
        }
    );

    c.getPortfolios = function(req, res) {
        Portfolio.find({}).toArray(function(err, portfolios) {
            if (err) {
                res.status(500).json({error: err});
                return;
            }

            res.json(portfolios);
            return;
        });
    };

    c.addPortfolio = function(req, res) {
        var portfolio = new PortfolioModel(req.body);    
        Portfolio.insert(portfolio, function(err, write) {
            if (err) {
                res.status(500).json({error: err});
                return;
            }

            res.json(portfolio);
            return;
        }); 
    };

    return c;
}; 
