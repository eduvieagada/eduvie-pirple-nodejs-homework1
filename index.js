var http = require('http');
var url = require('url');


var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);

    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    req.on('data', function(data) {
    });

    req.on('end', function(){
        var handler = typeof(routes[trimmedPath]) !== 'undefined' ? routes[trimmedPath] : routeHandlers.notFoundHandler;
        handler(req, res);
    });
});

server.listen(3000, function() {
    console.log('server is listening on port 3000');
});

var routeHandlers = {
    helloRouteHandler: function(req, res) {
        var payload = {
            'result': 'Hello World!'
        };
        var payloadString = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(200);
        res.end(payloadString);

        console.log(`returning this response ${payloadString}`);
    },
    notFoundHandler: function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(404);

        var errorMsg = `The server path:${req.url} does not exist`;
        res.end(errorMsg)
        console.log(errorMsg);
    }
};

var routes = {
    'hello': routeHandlers.helloRouteHandler
};