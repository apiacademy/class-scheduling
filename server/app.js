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
var reStudents = new RegExp('^\/student\/.*','i');
var reTeachers = new RegExp('^\/teacher\/.*','i');
var reCourses = new RegExp('^\/course\/.*','i');
var reSchedules = new RegExp('^\/schedule\/.*','i');
var reFiles = new RegExp('^\/file\/.*','i');

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

                    doc = {};
                    doc.action = {};
                    doc.action.links = pageLinks();
                    rtn.action = {};
                    rtn.action.template = listTemplates('student');
                    doc.list = [];
                    doc.list.push(rtn);
                    rtn = doc;

                    code = 200;
                    csType = testType;
                }
                else {
                    rtn = component.students('list');

                    doc = {};
                    doc.action = {};
                    doc.action.link = pageLinks();
                    rtn.action = {};
                    rtn.action.template = listTemplates('student');
                    doc.list = [];
                    doc.list.push(rtn);
                    rtn = doc;

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

    if(rtn!==null) {
        rtn = representation(rtn,csType);
        sendResponse(req, res, rtn, code);
    }    
}

function pageLinks() {
    var links, item;

    links = [];
    item = {name:'home',href:root+'/', action:'read', prompt:'Home'};
    links.push(item);
    item = {name:'student',href:root+'/student/', action:'list', prompt:'Students'};
    links.push(item);
    item = {name:'teacher',href:root+'/teacher/', action:'list', prompt:'Teachers'};
    links.push(item);
    item = {name:'course',href:root+'/course/', action:'list', prompt:'Courses'};
    links.push(item);
    item = {name:'schedule',href:root+'/schedule/', action:'list', prompt:'Schedules'};
    links.push(item);

    return links;
}

function listTemplates(name) {
    var template, tmp;

    template = [];
    tmp = {name:name, href:'/'+name+'/', action:'add', prompt:'Add '+name};
    tmp.data = addElements(name);
    template.push(tmp);
    
    tmp = {name:name, href:'/'+name+'/', action:'filter', prompt:'Filter '+name};
    tmp.data = filterElements(name);
    template.push(tmp);

    return template;
}

function addElements(name) {
    var data;

    data = [];
    switch(name) {
        case 'student':
            data.push({name:'studentName',value:'',prompt:'studentName'});
            data.push({name:'standing', value:'', prompt:'standing'});
            break;
        case 'course' :
        case 'teacher' :
        case 'schedule' :
        default:
            break;
    }

    return data;
}

function filterElements(name) {
    var data;

    data = [];
    switch(name) {
        case 'student':
            data.push({name:'studentName',value:'', prompt:'studentName'});
            break;
        case 'course':
        case 'teacher':
        case 'schedule':
        default:
            break;
    }

    return data;
}

function sendHome(req, res) {
    var rtn, doc, item;

    doc = {};
    doc.action = {};
    doc.action.link = pageTemplates();

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

