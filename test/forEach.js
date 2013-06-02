var ugAP = require('..');

var FS = require('fs');
var PATH = require('path');

var expect = require("chai").expect;

describe('forEach', function() {

    var dirPath = PATH.resolve(__dirname + '/forEach');

    FS.readdirSync(dirPath).forEach(function(file) {
        file = PATH.resolve(dirPath, file);
        var fileContent = FS.readFileSync(file, 'utf-8');

        var name = (fileContent.match(/^\/\/.*/) || [])[0];
        if (name) {
            name = name.replace('// ', '');

            // remove first line with name
            fileContent = fileContent.split('\n');
            fileContent.shift();
            fileContent = fileContent.join('\n');

            fileContent = fileContent.split('// *result*');

            var testCase = fileContent[0].trim();
            var testResult = fileContent[1].trim();

            it(name, function() {
                var result = ugAP.plainize(testCase);
                expect(result).to.be.equal(testResult)
            });

        } else {
            //throw 'invalid test';
        }
    });

});
