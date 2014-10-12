define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1 id=\"brand\" data-link=\"home\">MJODEV</h1>\n\n<ul>\n    <li data-link=\"admin\"><a data-link=\"admin\">Admin</a></li>\n    <li data-link=\"about\"><a data-link=\"about\">About</a></li>\n    <li data-link=\"posts\"><a data-link=\"posts\">Posts</a></li>\n    <li><a href=\"logout\">Logout</a></li>\n</ul>\n";
  })

});