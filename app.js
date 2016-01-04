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
    request.on('readable', function() {
        var chunk = null;
        while(null !== (chunk = request.read())){
            uploadedBytes += chunk.length;
            var progress = (uploadedBytes / fileBytes) * 100;
            response.write('progress: ' + parseInt(progress, 10) + '%\n');
        }
    });
    request.pipe(newFile);

    request.on('end', function() {
        response.end('uploaded!');
    });
});
