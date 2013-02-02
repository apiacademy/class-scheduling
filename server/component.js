/********************************************
 * Class Scheduling 
 * Business Component
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/

// access stored data
var storage = require('./storage.js');

exports.student = function(action, args1, args2, args3) {
    var object, rtn;
    
    object = 'student';
    rtn = null;
    
    switch(action) {
        case 'list':
            rtn = loadList(storage(object, 'list'), object);
            rtn = addEditing(rtn, object, args1);
            break;
        case 'read':
            rtn = loadList(storage(object, 'item', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'filter':
            rtn = loadList(storage(object, 'filter', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'add':
            rtn = loadList(storage(object, 'add', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'update':
            rtn = loadList(storage(object, 'update', args1, args2), object);
            rtn = addEditing(rtn, object, args3);
            break;
        case 'remove':
            rtn = loadList(storage(object, 'remove', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.teacher = function(action, args1, args2) {
    var object, rtn;

    object = 'teacher';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = loadList(storage(object, 'list'), object);
            rtn = addEditing(rtn, object, args1);
            break;
        case 'read':
            rtn = loadList(storage(object, 'item', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'filter':
            rtn = loadList(storage(object, 'filter', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'add':
            rtn = loadList(storage(object, 'add', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'update':
            rtn = loadList(storage(object, 'update', args1, args2), object);
            rtn = addEditing(rtn, object, args3);
            break;
        case 'remove':
            rtn = loadList(storage(object, 'remove', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.course = function(action, args1, args2) {
    var object, rtn;

    object = 'course';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = loadList(storage(object, 'list'), object);
            rtn = addEditing(rtn, object, args1);
            break;
        case 'read':
            rtn = loadList(storage(object, 'item', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'filter':
            rtn = loadList(storage(object, 'filter', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'add':
            rtn = loadList(storage(object, 'add', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'update':
            rtn = loadList(storage(object, 'update', args1, args2), object);
            rtn = addEditing(rtn, object, args3);
            break;
        case 'remove':
            rtn = loadList(storage(object, 'remove', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        default:
            rtn = null;
    }

    return rtn;
}

exports.schedule = function(action, args1, args2) {
    var object, rtn;

    object = 'schedule';
    rtn = null;

    switch(action) {
        case 'list':
            rtn = loadList(storage(object, 'list'), object);
            rtn = addEditing(rtn, object, args1);
            break;
        case 'read':
            rtn = loadList(storage(object, 'item', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'add':
            rtn = loadList(storage(object, 'add', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'update':
            rtn = loadList(storage(object, 'update', args1, args2), object);
            rtn = addEditing(rtn, object, args3);
            break;
        case 'remove':
            rtn = loadList(storage(object, 'remove', args1), object);
            rtn = addEditing(rtn, object, args2);
            break;
        case 'assign':
        case 'unassign':
        default:
            rtn = null;
    }

    return rtn;
}

function loadList(elm, name) {
    var coll, list, data, item, i, x;

    if(Array.isArray(elm)===false) {
        coll = [];
        coll.push(elm);
    }
    else {
        coll = elm;
    }

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
        item[i].name = name;
        item[i].display = {};
        item[i].display.data = data;
        data = [];
    }

    list = {};
    list.name = name;
    list.item = item;

    return list;
}

function addEditing(elm, object, root) {
    var coll, i, x, id;

    if(elm.item) {
        coll = elm.item;

        // handle templates
        for(i=0, x=coll.length; i<x; i++) {
            if(!coll[i].action) {
                coll[i].action = {};
            }
            if(!coll[i].action.template) {
                coll[i].action.template = [];
            }
            if(!coll[i].action.link) {
                coll[i].action.link = [];
            }
            
            id = getId(coll[i].display.data);

            // templates
            tmp = {name:object, action:'update', href:root+'/'+object+'/'+id}
            tmp.data = [];

            for(j=0, y=coll[i].display.data.length; j<y; j++) {
                if('id dateCreated'.indexOf(coll[i].display.data[j].name)===-1) {
                    tmp.data.push(coll[i].display.data[j]);
                }
            }
            coll[i].action.template.push(tmp);

            // links
            tmp = {name:object, action:'remove', href:root+'/'+object+'/'+id, prompt:'Remove'}
            coll[i].action.link.push(tmp);

            tmp = {name:object, action:'read', href:root+'/'+object+'/'+id, prompt:'Read'};
            coll[i].action.link.push(tmp);

            tmp = {}
        }
        elm.item = coll;
    }
    return elm;
}

function getId(data) {
    var i, x, rtn;

    for(i=0, x=data.length; i<x; i++) {
        if(data[i].name==='id') {
            rtn = data[i].value;
            break;
        }
    }
    return rtn;
}
