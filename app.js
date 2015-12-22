var fs = require('fs');
var http = require('http');
var uploads_dir = './uploads/';

server = http.createServer().listen(8080);

server.on('request', function(request, response) {
    var newFileName = request.url.replace('/', '');
    var newFile = fs.createWriteStream(uploads_dir + newFileName);
    request.pipe(newFile);

    request.on('end', function() {
        response.writeHead(201);
        response.end('uploaded!');
    });
});
