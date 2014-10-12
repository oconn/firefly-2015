define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form method=\"POST\" action=\"/login\">\n    <label for=\"login-email\">Email</label>\n    <input type=\"text\" name=\"email\" id=\"login-email\" data-field=\"email\"></input>\n\n    <label for=\"login-password\">Password</label>\n    <input type=\"password\" name=\"password\" id=\"login-password\" data-field=\"password\"></input>\n\n    <input type=\"submit\" value=\"Login\"></input>\n</form>\n";
  })

});