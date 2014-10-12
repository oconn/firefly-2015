define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form method=\"POST\" action=\"/signup\">\n    <label for=\"signup-name\">Name</label>\n    <input type=\"text\" name=\"name\" id=\"signup-name\" data-field=\"name\"></input>\n\n    <label for=\"signup-email\">Email</label>\n    <input type=\"text\" name=\"email\" id=\"signup-email\" data-field=\"email\"></input>\n\n    <label for=\"signup-password\">Password</label>\n    <input type=\"password\" name=\"password\" id=\"signup-password\" data-field=\"password\"></input>\n\n    <label for=\"signup-confirm\">Password Confirmation</label>\n    <input type=\"password\" name=\"signup-confirm\" id=\"signup-confirm\" data-field=\"signupConfirm\"></input>\n\n    <input type=\"submit\" value=\"Signup\"></input>\n</form>\n";
  })

});