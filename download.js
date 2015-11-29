var exec = require('child_process').exec,
    fs = require('fs'),
    wget = require('wget'),
    xml2js = require('xml2js');

var output = 'tmp/sitemap.xml';
var parser = new xml2js.Parser();
var src = 'http://media.continente.pt/sitemap.xml';

var extractValues = function (urls) {
    urls.forEach(function (url, index) {
        index = index + 1;
        var id = url.match(/[0-9]+/)[0];
        var file = 'tmp/' + id + '.html';
        if (!fs.existsSync(file)) {
            url = 'http://www.continente.pt/stores/continente/pt-pt/public/Pages/ProductDetail.aspx?ProductId=' + id;
            setTimeout(function () {
                console.log('processing file ' + index + ' of ' + urls.length, url);
                exec('curl -s ' + url + ' > ' + file);
            }, index * 500)
        }
    });
};

var parseFile = function () {
    fs.readFile(output, function(error, data) {
        parser.parseString(data, function (error, result) {
            var urls = [];
            result.urlset.url.forEach(function (node) {
                var url = node.loc[0];
                if (url.match('ProductId'))
                    urls.push(url);
            });
            extractValues(urls);
        });
    });
};

if (!fs.existsSync(output)) {
    wget.download(src, output).on('end', function() {
        parseFile();
    });
} else {
    parseFile();
}
