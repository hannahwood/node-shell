var fs = require('fs');
var request = require('request');
var bash = require('./bash');


var commandList = {};
commandList.pwd = function(file) {
	var output = `Current directory: ${process.cwd()}`;
    bash.done(output);
};
commandList.date = function(file) {
    var currentDate = new Date();
    bash.done(currentDate.toString());
};
commandList.ls = function(file) {
    fs.readdir('.', function(err, files) {
        if (err) throw err;
        var result = '';
        files.forEach(function(readFile) {
            result += (readFile.toString() + "\n");
        });
        bash.done(result);
    });
};

commandList.echo = function(file) {
	bash.done(file.join(" "));
};
commandList.cat = function(file, stdin) {
	fs.readFile(file[0], function(err, files) {
        if (err) throw err;
        if(stdin) {
        	commandList[stdin](files.toString());
        }
        else bash.done(files.toString(), stdin);
    });
};
commandList.head = function(file, stdin) {
	var newFiles;
	fs.readFile(file[0], function(err, files) {
        if (err) {
        	newFiles = file.split('\n');
        }
        else {
        newFiles = files.toString().split('\n');
    }
        var nlCounter = 0;
        var result = '';
        for (var i = 0; i < 5; i++) {
        	result += (newFiles[i] + '\n');
        }
        bash.done(result,stdin);
        //bash.done(files.toString());
    });
};
commandList.tail = function(file, stdin) {
	fs.readFile(file[0], function(err, files) {
        if (err) throw err;
        var newFiles = files.toString().split('\n');
        var nlCounter = 0;
        var result = '';
        for (var i = newFiles.length - 5; i < newFiles.length; i++) {
        	result += (newFiles[i] + '\n');
        }
        bash.done(result);
    });
};
commandList.sort = function(file, stdin) {
	fs.readFile(file[0], function(err, files) {
        if (err) throw err;
        var sortedFiles = files.toString().split('\n').sort().join('\n');
        bash.done(sortedFiles);
    });
};
commandList.wc = function(file, stdin) {
	fs.readFile(file[0], function(err, files) {
        if (err) throw err;
        var newLines = files.toString().split('\n').length;
        bash.done(newLines.toString());
    });
};
commandList.uniq = function(file, stdin) {
	fs.readFile(file[0], function(err, files) {
		var finalArray = [];
        if (err) throw err;
        var deleteDuplicates = files.toString().split('\n');
        for(var i = 0; i < deleteDuplicates.length; i++) {
        	if(deleteDuplicates[i] !== deleteDuplicates[i+1]) {
        		finalArray.push(deleteDuplicates[i]);
        	} 
        }
        bash.done(finalArray.join('\n'));
    });
};
commandList.curl = function(file) {
    request(file[0], function(error, response, body) {
        if (!error && response.statusCode == 200) {
            bash.done(body) ;// Show the HTML for the Google homepage.
        }
    });
};
module.exports = commandList;