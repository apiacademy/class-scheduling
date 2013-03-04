/********************************************
 * Class Scheduling 
 * Teacher Connector
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/

var root = '';
var qs = require('querystring');
var utils = require('./utils.js');
var component = require('./../component.js');

module.exports = main;

function main(req, res, parts, base) {
    var code, doc;

    root = base;

    switch(req.method) {
        case 'GET':
            if(parts[1]) {
                doc = {code:200, doc:sendItem(req, res, parts[1])};
            }
            else {
                doc = {code:200, doc:sendList(req, res)};
            }
            break;
        case 'POST':
            if(parts[1]) {
                doc = errorDoc(req, res, 'Method Not Allowed', 405);
            }
            else {
                doc = {code:200, doc:addItem(req, res)};
            }
            break;
        case 'PUT':
            if(parts[1]) {
                doc = {code:200,doc:updateItem(req, res, parts[1])};
            }
            else {
                doc = utils.errorDoc(req, res, 'Method Not Allowed',405);
            }
            break;
        case 'DELETE':
            if(parts[1]) {
                doc = {code:204,doc:removeItem(req, res, parts[1])};
            }
            else {
                doc = utils.errorDoc(req, res, 'Method Not Allowed', 405);
            }
        default:
            doc = utils.errorDoc(req, res, 'Method Not Allowed', 405);
    }

    return doc;
}

function sendList(req, res) {
    var rtn, doc;

    rtn = component.course('list', root);
    rtn.action = {};
    rtn.action.template = listActions('course',root);

    doc = {action:{link:[]}};
    doc.action.link = utils.pageActions(root);

    doc.list = [];
    doc.list.push(rtn);
    rtn = doc;

    return rtn;
}

function sendItem(req, res, id) {
    var rtn, doc;

    rtn = component.course('read', id, root);
    rtn.action = {};
    rtn.action.template = listActions('course',root);
    doc = {action:{link:[]}};
    doc.action.link = utils.pageActions(root);
                 
    doc.list = [];
    doc.list.push(rtn);
    rtn = doc;

    return rtn;
}

function addItem(req, res) {
    var body, doc, msg, list;

    body = '';
    req.on('data', function(chunk) {
        body += chunk;
        console.log(body);
    });

    req.on('end', function() {
        try {
            msg = qs.parse(body);
            console.log(JSON.stringify(msg));
            list = component.course('add', msg);
            console.log(JSON.stringify(list));
            doc = {code:200, doc:list};
        }
        catch(ex) {
            doc = utils.errorDoc(req, res, 'Server Error', 500);
        }
    });

    return doc;
}

function updateItem(req, res, id) {
    var body, list, msg, doc;

    body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
        try {
            msg = qs.parse(body);
            list = component.course('update', id, msg);
            doc = {code:200, doc:list};
        }
        catch(ex) {
            doc = utils.errorDoc(req, res, 'Server Error', 500);
        }
    });
    
    return doc;
}

function removeItem(req, res, id) {
    var doc;

    doc = component.course('remove', id, root);
    doc = '';

    return doc;
}

function listActions(name, root) {
    var template, tmp, data;

    template = [];

    data = [];
    data.push({name:'courseName',value:'',prompt:'courseName'});
    data.push({name:'courseCapacity',value:'',prompt:'courseCapacity'});
    data.push({name:'courseDescription',value:'',prompt:'courseDescription'});
    tmp = {name:name, href:root+'/'+name+'/', action:'add', prompt:'Add '+name};
    tmp.data = data;
    template.push(tmp);
    
    data = [];
    data.push({name:'courseName',value:'', prompt:'courseName'});
    tmp = {name:name, href:root+'/'+name+'/', action:'filter', prompt:'Filter '+name};
    tmp.data = data;
    template.push(tmp);

    return template;
}
