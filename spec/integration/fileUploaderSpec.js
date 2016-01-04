describe('File Uploader', function() {
    var request = require('request');
    var fs =  require('fs');
    var baseUrl = 'http://localhost:8080/';
    var fileExamples = './spec/support/file_examples/';
    var uploads = './uploads/';
    var uploadedFile;

    describe('PUT file', function() {
        afterEach(function() {
            try {
                fs.unlinkSync(uploadedFile);
            } catch(err) {}
        });

        it('returns 201 Created', function(done) {
            var sampleFile = fileExamples + 'sample.txt';
            uploadedFile = uploads + 'sample.txt';

            fs.createReadStream(sampleFile).pipe(request.put(baseUrl + 'sample.txt', function(error, response, body) {
                expect(response.statusCode).toBe(201);
                done();
            }));
        });

        it('uploads a text file', function(done) {
            var sampleFile = fileExamples + 'sample.txt';
            uploadedFile = uploads + 'sample.txt';

            fs.createReadStream(sampleFile).pipe(request.put(baseUrl + 'sample.txt', function(error, response, body) {
                expect(fs.statSync(uploadedFile).isFile()).toBe(true);
                done();
            }));
        });

        it('uploads a gif file', function(done) {
            var sampleFile = fileExamples + 'huebr.gif';
            uploadedFile = uploads + 'huebr.gif';

            fs.createReadStream(sampleFile).pipe(request.put(baseUrl + 'huebr.gif', function(error, response, body) {
                expect(fs.statSync(uploadedFile).isFile()).toBe(true);
                done();
            }));
        });

        it('reports the upload progress', function(done) {
            var sampleFile = fileExamples + 'huebr.gif';
            uploadedFile = uploads + 'huebr.gif';

            fs.createReadStream(sampleFile).pipe(request.put(baseUrl + 'huebr.gif', function(error, response, body) {
                expect(body).toMatch(/progress:/);
                done();
            }));
        });
    });
});
