// Create web server
// start server: node comments.js
// test: http://localhost:8080/comments

var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function(req, res){
	switch (req.method){
		case 'POST':
			var item = '';
			req.setEncoding('utf8');
			req.on('data', function(chunk){
				item += chunk;
			});
			req.on('end', function(){
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			items.forEach(function(item, i){
				res.write(i + ') ' + item + '\n');
			});
			res.end();
			break;
	}
});

server.listen(8080);