define(['handlebars'], function(Handlebars) {

return Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"new-post-form\" method=\"POST\" action=\"/api/admin/posts\">\n\n    <label for=\"post-title\">Post Title</label>\n    <input \n        type=\"text\" \n        name=\"post-title\" \n        id=\"post-title\" \n        placeholder=\"Post Title\"\n        data-field='title'\n    ></input>\n\n    <label for=\"post-description\">Description</label>\n    <textarea \n        name=\"post-description\" \n        id=\"post-description\"\n        data-field=\"description\"\n    ></textarea>\n\n    <label for=\"post-body\">Body</label>\n    <textarea \n        name=\"post-body\" \n        id=\"post-body\"\n        data-field=\"body\"\n    ></textarea>\n\n    <input type=\"submit\" value=\"";
  if (helper = helpers.submitValue) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.submitValue); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></input>\n</form>\n\n";
  return buffer;
  })

});