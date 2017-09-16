var express = require('express');
var router = express.Router();
var fileupload = require('express-fileupload');

router.use(fileupload());

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Movic' });
});

router.post('/upload', function (req, res, next) {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('/client/temp/', function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');

    });
});

module.exports = router;
