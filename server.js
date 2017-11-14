var express = require('express');
var app = express();

var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  }
});

var upload = multer({storage: storage});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/fileupload', upload.single('myfile'), function (req, res, next) {
  if (!req.file) {
    console.log("No file received");
    
    return res.send({err: "no file received"});
  } else {
    console.log("File received");
    
    return res.json({
      file_name: req.file.originalname,
      size: req.file.size + " bytes"
    });
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
