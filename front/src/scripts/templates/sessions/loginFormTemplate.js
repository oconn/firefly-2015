define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form method=\"GET\" action=\"/api/sessions/login\">\n    <label for=\"email\">Email</label>\n    <input type=\"text\" name=\"input\" id=\"login-input\" data-field=\"email\"></input>\n\n    <label for=\"password\">Password</label>\n    <input type=\"password\" name=\"password\" id=\"login-password\" data-field=\"password\"></input>\n\n    <input type=\"submit\" value=\"Login\"></input>\n</form>\n";
  })

});