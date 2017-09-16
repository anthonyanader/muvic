var formidable = require('formidable');
var fs = require('fs');
var express = require('express');
// var expresshbs = require('express-handlebars');
var path = require("path");

var app = express();

/*
app.engine('handlebars', expresshbs());
app.set('view engine', 'handlebars');
*/

app.use(express.static(path.resolve(__dirname, 'client')));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.get('/', function (req, res, next) {
    res.render('/home.html');
});

app.get('/fileupload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = 'client/temp/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.render('/app.html')
        });
    });

});

console.log("Server started on Port 8080 ip: LOCALHOST")

app.listen(8080);
