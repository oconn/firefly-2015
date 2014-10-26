define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"portfolio-images-form\" method=\"\" action=\"\">\n    <input type=\"file\" name=\"files[]\" class=\"fileupload\" multiple></input>\n    <div class=\"uploading-files\"></div>\n</form>\n\n<div class=\"portfolio-images-collection\"></div>\n";
  })

});