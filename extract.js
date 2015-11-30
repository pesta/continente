var fs = require('fs'),
    jquery = fs.readFileSync('./jquery.js', 'utf-8'),
    jsdom = require('jsdom');

fs.readdirSync('tmp/').filter(function (file) {
    if (!file.match('.html'))
        return;

    fs.readFile('tmp/' + file, 'utf8', function (error, html) {
        jsdom.env({
            html,
            src: [jquery],
            done: function (error, window) {
                var $ = window.$;
                var title = $('.productTitle').html();
                if (!title)
                    return;
                var unitPrice = $('.pricePerUnit .updListPrice').html();
                if (unitPrice)
                    unitPrice = unitPrice.replace('&nbsp;', '');
                console.log(title, '=>', unitPrice);
            }
        });
    });

});
