/**************************
 * Class Scheduling
 * Home Connector
 * January 2013
 * Mike Amundsen (@mamund)
 **************************/

var root = '';
var component = require('./../component.js');
var utils = require('./utils.js');

module.exports = main;

function main(req, res, parts, base) {
    var doc, code;
    
    root = base;
    
    if(req.method==='GET') {
        doc = sendHome(req, res);
        code = 200;
    }
    else {
        utils.errorDoc(req, res, 'Method Not Allowed');
        code = 405;
    }

    return {code:code, doc:doc}; 
 }
 
function sendHome(req, res) {
    var rtn, doc, item;

    doc = {action:{link:[]}};
    doc.action.link = utils.pageActions(root);

    return doc;
}


