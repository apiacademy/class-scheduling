/********************************************
 * Class-Scheduling 
 * Hypermedia Server
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/


// base modules
var http = require('http');
var querystring = require('querystring');

//shared vars
var root = '';
var port = (process.env.PORT || 1337);
var prodType = 'application/vnd.apiacademy-schedule+xml';
var testType = 'application/xml';
var csType = '';

// internal modules
var storage = require('./storage.js');
var component = require('./component.js');
var representation = require('./representation.js');

// connector modules
var course = require('./connectors/course.js');
var home = require('./connectors/home.js');
var schedule = require('./connectors/schedule.js');
var student = require('./connectors/student.js');
var teacher = require('./connectors/teacher.js');
var utils = require('./connectors/utils.js');

// routing rules
var reHome = new RegExp('^\/$','i');
var reCourse = new RegExp('^\/course\/.*','i');
var reSchedule = new RegExp('^\/schedule\/.*','i');
var reStudent = new RegExp('^\/student\/.*','i');
var reTeacher = new RegExp('^\/teacher\/.*','i');
var reFile = new RegExp('^\/file\/.*','i');

// request handler
function handler(req, res) {
    var segments, i, x, parts, rtn, flg, doc;

    // set local vars
    root = 'http://'+req.headers.host;
    csType = testType;
    flg = false;
    doc = null;

    // parse incoming request URL
    parts = [];
    segments = req.url.split('/');
    for(i=0, x=segments.length; i<x; i++) {
        if(segments[i]!=='') {
            parts.push(segments[i]);
        }
    }

    // home
    if(reHome.test(req.url)) {
        flg = true;
        doc = home(req, res, parts, root);
    }

    // course
    if(flg===false && reCourse.test(req.url)) {
        flg = true;
        doc = course(req, res, parts, root)
    }

    // schedule
    if(flg===false && reSchedule.test(req.url)) {
        flg = true;
        doc = schedule(req, res, parts, root)
    }
    
    // student
    if(flg===false && reStudent.test(req.url)) {
        flg = true;
        doc = student(req, res, parts, root);
    }

    // teacher
    if(flg===false && reTeacher.test(req.url)) {
        flg = true;
        doc = teacher(req, res, parts, root);
    }

    // catch error
    if(flg===false) {
        doc = {code:404, doc:utils.errorDoc(req, res, 'Not Found')};
    }

    // send out response
    if(doc!==null) {
        rtn = representation(doc.doc);
        sendResponse(req, res, rtn, doc.code, doc.headers);
    }
    else {
        sendResponse(req, res, '<root />', 500);
    }
}

function sendResponse(req, res, body, code, headers) {
    var hdrs;
    
    if(headers && headers!==null) {
        hdrs = headers;
    }
    else {
        hdrs = {}
        hdrs['content-type'] = csType;
    }
    res.writeHead(code, hdrs),
    res.end(body);
}

// wait for request
http.createServer(handler).listen(port);

