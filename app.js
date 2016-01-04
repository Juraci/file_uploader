var fs = require('fs');
var http = require('http');
var uploads_dir = './uploads/';

server = http.createServer().listen(8080);

server.on('request', function(request, response) {
    var newFileName = request.url.replace('/', '');
    var newFile = fs.createWriteStream(uploads_dir + newFileName);
    var fileBytes = request.headers['content-length'];
    var uploadedBytes = 0;

    response.writeHead(201);
    // the readable.read() is a method from the stream abstract interface
    // The read() method pulls some data out of the internal buffer and returns it. If there is no data available, then it will return null
    request.on('readable', function() {
        while(null !== request.read()) {}
    });

    // the data event is triggered when the request.read() returns a chunk of data
    request.on('data', function(chunk) {
        uploadedBytes += chunk.length;
        var progress = (uploadedBytes / fileBytes) * 100;
        response.write('progress: ' + parseInt(progress, 10) + '%\n');
    });

    request.pipe(newFile);

    request.on('end', function() {
        response.end('uploaded!');
    });
});
