// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var server = http.createServer(function(req, res){
  var urlPath = url.parse(req.url).pathname;
  var filePath = path.join(__dirname, urlPath);
  fs.exists(filePath, function(exists){
    if(exists){
      fs.readFile(filePath, function(err, data){
        if(err){
          res.writeHead(500);
          res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});

server.listen(3000);
console.log('Server running at http://')
