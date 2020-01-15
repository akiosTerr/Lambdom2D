import express from 'express';
import path from 'path';
const __dirname = path.resolve();

var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join('/index.html'));
});

app.listen(3000, function () {
    console.log('\n Example app listening on port 3000!');
});
