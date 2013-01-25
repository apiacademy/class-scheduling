/***************************************
 * Class-Scheduling Hypermedia Server
 * January 2013
 * Mike Amundsen (@mamund)
 * **************************************/

var http = require('http');
var querystring = require('querystring');

var code = 0;
var root = '';
var port = (process.env.PORT || 1337);
var prodType = 'application/vnd.apiacademy-schedule+xml';
var testType = 'application/xml';
var csType = '';

// internal modules
var storage = require('./storage.js');
var component = require('./component.js');
var representation = require('./representation.js');

// routing
var reHome = new RegExp('^\/$','i');
var reStudents = new RegExp('^\/students\/.*','i');
var reTeachers = new RegExp('^\/teachers\/.*','i');
var reCourses = new RegExp('^\/courses\/.*','i');
var reSchedules = new RegExp('^\/schedules\/.*','i');
var reFiles = new RegExp('^\/files\/.*','i');

// top-level handler
function handler(req, res) {
    var rtn;

    // route request
    switch(req.url) {
        // lots of checks here
        // ...

        // stub response
        default:
        // handle component work
        rtn = component.students('list');
        code = 200;
        csType = testType;

        // compose representation
        rtn = representation(rtn,testType);
        
        break;
    }
    
    // return response
    sendResponse(req, res, rtn, code);
}

function sendResponse(req, res, body, code) {
    res.writeHead(code, {'Content-Type' : csType}),
    res.end(body);
}
http.createServer(handler).listen(port);

