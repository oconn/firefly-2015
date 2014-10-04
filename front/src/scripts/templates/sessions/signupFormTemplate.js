define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"signupForm\" method=\"POST\" action=\"/api/session/signup\">\n    \n    <label for=\"email\">Email</label>\n    <input type=\"text\" name=\"email\" id=\"signup-email\" data-field=\"email\"></input>\n\n    <label for=\"password\">Password</label>\n    <input type=\"password\" name=\"password\" id=\"signup-password\" data-field=\"password\"></input>\n\n    <input type=\"submit\" value=\"Sign Up!\"></input>\n</form>\n";
  })

});