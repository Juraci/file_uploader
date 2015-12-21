var fs = require('fs');
var http = require('http');
var uploads_dir = './uploads/';

server = http.createServer().listen(8080);

server.on('request', function(request, response) {
    console.log(request.url);
    var newFile = fs.createWriteStream(uploads_dir + 'sample.txt');
    request.pipe(newFile);

    request.on('end', function() {
        response.end('uploaded!');
    });
});
