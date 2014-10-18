define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1 id=\"brand\" data-link=\"home\">Firefly Photography</h1>\n\n<ul>\n    <li><a data-link=\"about\">About</a></li>\n    <li><a data-link=\"gallery\">Gallery</a></li>\n    <li><a data-link=\"posts\">Posts</a></li>\n    <li><a data-link=\"login\">Login</a></li>\n</ul>\n";
  })

});