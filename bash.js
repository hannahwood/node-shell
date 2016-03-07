var commands = require('./command');


process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
  var cmd = data.toString().trim();
  var cmdList = cmd.split(/\s*\|\s*/g);
  
  key = cmdList[0].split(' ').slice(0,1);
  args = cmdList[0].split(' ').slice(1);
  commands[key](args,cmdList[1]); 
  
  // process.stdout.write('You typed: ' + cmd);

});

var done = function(output, stdin) {
  // show the output
  
  if(!stdin) {
  	process.stdout.write(output);
  }
  else {
  	stdin.pop();
  	commands[stdin[0]](output);
  }
  
  // show the prompt
  process.stdout.write("\nprompt > ");
};

module.exports.done = done;