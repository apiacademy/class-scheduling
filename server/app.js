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
    var segments, i, x, parts, rtn, flg;

    // set root
    root = 'http://'+req.headers.host;
    csType = testType;

    // parse incoming request URL
    parts = [];
    segments = req.url.split('/');
    for(i=0, x=segments.length; i<x; i++) {
        if(segments[i]!=='') {
            parts.push(segments[i]);
        }
    }

    // route request
    flg=false;

    console.log(req.url);

    // home
    if(reHome.test(req.url)) {
        flg=true;
        if(req.method==='GET') {
            sendHome(req, res);
        }
        else {
            sendError(req, res, 'Method Not Allowed', 405);
        }
    }

    if(flg===false && reStudents.test(req.url)) {
        flg=true;
        switch(req.method) {
            case 'GET':
                if(parts[1]) {
                    rtn = component.students('read', parts[1]);
                    code = 200;
                    csType = testType;
                }
                else {
                    rtn = component.students('list');
                    code = 200;
                    csType = testType;
                }
                break;
            default:
                sendError(req, res, 'Method not Allowed', 405);
        }
    }
    
    if(flg===false) {
        sendError(req, res, 'Not Found', 404);
        rtn = null;
    }

    console.log(rtn);

    // compose representation
    if(rtn!==null) {
        rtn = representation(rtn,csType);
        sendResponse(req, res, rtn, code);
    }    
}

function sendHome(req, res) {
    var rtn, doc, item;

    console.log('home');

    doc = {};
    doc.links = [];
    item = {name:'home',href:root+'/', action:'read', prompt:'Home'};
    doc.links.push(item);
    item = {name:'student',href:root+'/students/', action:'list', prompt:'Student List'};
    doc.links.push(item);

    console.log(JSON.stringify(doc));

    rtn = representation(doc,csType);
    sendResponse(req, res, rtn, 200);
}

function sendError(req, res, msg, code) {
    sendResponse(req, res, '<error>'+msg+'</error>', code);
}

function sendResponse(req, res, body, code) {
    res.writeHead(code, {'Content-Type' : csType}),
    res.end(body);
}

http.createServer(handler).listen(port);

