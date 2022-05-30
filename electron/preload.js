var exec = require('child_process').exec;

const fetch = require('node-fetch');
window.addEventListener('DOMContentLoaded', () => {
    
  exec('cd ../python & flask run',
  // exec('cd ../python & set FLASK_APP=api & flask run',
  function (error, stdout, stderr) {
        process.stdout.write('stdout: ' + stdout);
        process.stdout.write('stderr: ' + stderr);
        
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
  })
  
  
  