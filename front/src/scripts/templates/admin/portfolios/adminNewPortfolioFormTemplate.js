define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h2>New Portfolio</h2>\n\n<form id=\"newPortfolioForm\" method=\"POST\" action=\"/api/portfolios\">\n    \n    <label for=\"portfolio-name\">Portfolio Name</label> \n    <input type=\"text\" name=\"name\" id=\"portfolio-name\" data-field=\"name\"></input>  \n\n    <input type=\"submit\" value=\"Add Portfolio\"></input>  \n</form>\n\n\n";
  })

});