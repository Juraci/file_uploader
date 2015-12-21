describe('File Uploader', function() {
    var request = require('request');
    var fs =  require('fs');
    var base_url = 'http://localhost:8080/';
    var sample_file = './spec/support/file_examples/sample.txt';
    var uploaded_file =  './uploads/sample.txt';

    afterEach(function() {
        fs.unlinkSync(uploaded_file);
    });

    describe('PUT file', function() {
        it('should upload the file', function(done) {
            fs.createReadStream(sample_file).pipe(request.put(base_url + 'sample.txt', function(error, response, body) {
                expect(fs.statSync(uploaded_file).isFile()).toBe(true);
                done();
            }));
        });
    });
});
