define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav id=\"navbar\">\n    <h1 id=\"brand\">MJODEV</h1>\n\n    <ul>\n        <li data-link=\"admin\">Admin</li>\n        <li data-link=\"about\">About</li>\n        <li data-link=\"posts\">Posts</li>\n    </ul>\n</nav>\n";
  })

});