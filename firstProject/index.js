var http = require('http');
var dt = require('./firstmodule');
var dt2 = require('./seconfile')

//console.log(dt.myDateTime());
console.log(dt2.getDate());
/*http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("The date and time are currently: " + dt.myDateTime());
    res.end('Hello World!');
}).listen(8080);*/