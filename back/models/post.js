var ObjectID = require('mongodb').ObjectID,
    highlight = require('highlight.js'),
    marked = require('marked');

highlight.configure({
    tabReplace: '    '
});

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

module.exports = function(options) {
    options = options || {};
    options._id = options._id ? new ObjectID(options._id) : undefined;

    this._id = options._id || new ObjectID();
    this.title = options.title || undefined;
    this.description = options.description ? marked(options.description) : undefined;
    this.descriptionRaw = options.description || undefined;
    this.body = options.body ? marked(options.body) : undefined;
    this.bodyRaw = options.body || undefined;
    this.createAt = options.createAt || new Date();
    this.updatedAt = new Date();
};
