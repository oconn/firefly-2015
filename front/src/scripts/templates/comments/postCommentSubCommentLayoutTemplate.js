define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p class=\"add-comment-btn\">Add Comment</p>\n<form class=\"post-subcomment-form hidden\" method=\"\" action=\"\">\n    <label for=\"comment\">Comment</label>\n    <textarea name=\"comment\" class=\"sub-post-comment\" data-field=\"text\"></textarea> \n\n    <input type=\"submit\" value=\"Comment\"></input>\n</form>\n";
  })

});