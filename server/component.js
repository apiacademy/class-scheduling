/**************************************
 * Class Scheduling Business Component
 * January 2012
 * Mike Amundsen (@mamund)
 * ************************************/

// access stored data
var storage = require('./storage.js');

exports.students = function(action, args1, args2) {
    var object, rtn;
    
    object = 'student';
    rtn = null;
    
    switch(action) {
        case 'list':
            rtn = storage(object, 'list');
            rtn = loadList(rtn, object);
            break;
        case 'read':
            rtn = storage(object, 'item', args1);
            break;
        case 'filter':
            rtn = storage(object, 'filter', args1);
            break;
        case 'add':
            rtn = storage(object, 'add', args1);
            break;
        case 'update':
            rtn = storage(object, 'update', args1, args2);
            break;
        case 'remove':
            rtn = storage(object, 'remove', args1);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.teachers = function(action, args1, args2) {
    var object, rtn;

    object = 'teacher';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = storage(object, 'list');
            break;
        case 'read':
            rtn = storage(object, 'item', args1);
            break;
        case 'filter':
            rtn = storage(object, 'filter', args1);
            break;
        case 'add':
            rtn = storage(object, 'add', args1);
            break;
        case 'update':
            rtn = storage(object, 'update', args1, args2);
            break;
        case 'remove':
            rtn = storage(object, 'remove', args1);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.courses = function(action, args1, args2) {
    var object, rtn;

    object = 'course';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = storage(object, 'list');
            break;
        case 'read':
            rtn = storage(object, 'item', args1);
            break;
        case 'filter':
            rtn = storage(object, 'filter', args1);
            break;
        case 'add':
            rtn = storage(object, 'add', args1);
            break;
        case 'update':
            rtn = storage(object, 'update', args1, args2);
            break;
        case 'remove':
            rtn = storage(object, 'remove', args1);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.schedules = function(action, args1, args2) {
    var object, rtn;

    object = 'schedule';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = dataElements(storage(object, 'list'), object);
            break;
        case 'read':
            rtn = storage(object, 'item', args1);
            break;
        case 'filter':
            rtn = storage(object, 'filter', args1);
            break;
        case 'add':
            rtn = storage(object, 'add', args1);
            break;
        case 'remove':
            rtn = storage(object, 'remove', args1);
            break;
        case 'assign':
        case 'unassign':
        default:
            rtn = null;
    }

    return rtn;
}

function loadList(coll, name) {
    var data, item, i, x;

    
    item = [];
    data = [];
    for(i=0, x=coll.length; i<x; i++) {
        for(prop in coll[i]) {
            d = {};
            d.name = prop;
            d.value = coll[i][prop];
            d.prompt = prop;
            data.push(d);
        }
        item[i] = {};
        item[i].display = {};
        item[i].display.data = data;
        data = [];
    }

    list = {};
    list.name = name;
    list.item = item;

    return list;
}
