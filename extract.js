var fs = require('fs'),
    jquery = fs.readFileSync('./jquery.js', 'utf-8'),
    jsdom = require('jsdom');

var files = fs.readdirSync('tmp/');

files = files.filter(function (file) {
    if (!file.match('.html'))
        return;

    fs.readFile('tmp/' + file, 'utf8', function(error, html) {
        jsdom.env({
            html: html,
            src: [jquery],
            done: function (err, window) {
                var $ = window.$;
                var title = $('.productTitle').html();
                var unitPrice = $('.pricePerUnit .updListPrice').html();
                if (unitPrice)
                    unitPrice = unitPrice.replace('&nbsp;', '');
                console.log('Title:', title);
                console.log('Unit Price:', unitPrice);
            }
        });
    });

});
