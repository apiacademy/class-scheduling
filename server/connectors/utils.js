/********************************************
 * Class Scheduling 
 * Connector utilities
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/

var fs = require('fs');
var folder = process.cwd()+'/file/';

exports.pageActions = function(root) {
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

exports.errorDoc = function(req, res, msg, code) {
    var doc;

    doc = {error:{data:[]}};
    doc.error.data.push({name:'message', value:msg, prompt:'Message'});
    doc.error.data.push({name:'url', value:root+req.url, prompt:'URL'});

    return {code:code,doc:doc};
}

exports.file = function(req, res, parts, root) {
    var body, doc, type;

    try {
        body = fs.readFileSync(folder+parts[1]);

        type = 'text/plain';
        if(parts[1].indexOf('.js')!==-1) {
            type = 'application/javascript';
        }
        if(parts[1].indexOf('.css')!==-1) {
            type = 'text/css';
        }
        if(parts[1].indexOf('.xsl')!==-1) {
            type = 'text/xsl';
        }
        doc = {code:200, doc:body, headers:{'content-type':type}}; 
    }
    catch(ex) {
        doc = {code:404,doc:'<root />'};
    }

    return doc;
}
