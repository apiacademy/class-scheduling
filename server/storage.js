/**********************************
 * Class Scheduling Storage Module
 * January 2013
 * Mike Amundsen (@mamund)
 * ********************************/

var fs = require('fs');
var folder = process.cwd()+'/data/';

module.exports = main;

function main(object, action, arg1, arg2) {
    var rtn;
        
    switch(action) {
        case 'list':
        case 'item':
        case 'add':
        case 'update':
        case 'remove':
            rtn = null;
            break;
    }
    return rtn;
}
