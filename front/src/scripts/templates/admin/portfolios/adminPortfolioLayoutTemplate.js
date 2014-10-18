define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Portfolios</h1>\n\n<button id=\"add-new-portfolio\">Add a new portfolio</button>\n\n<div id=\"new-portfolio\"></div>\n<div id=\"portfolio-collection\"></div>\n\n";
  })

});