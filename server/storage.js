/********************************************
 * Class Scheduling 
 * Storage Module
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/

var fs = require('fs');
var folder = process.cwd()+'/data/';

module.exports = main;

function main(object, action, arg1, arg2) {
    var rtn;
        
    switch(action) {
        case 'list':
            rtn = getList(object);
            break;
        case 'filter':
            rtn = getList(object, arg1);
            break;
        case 'item':
            rtn = getItem(object, arg1);
            break;
        case 'add':
            rtn = addItem(object, arg1);
            break;
        case 'update':
            rtn = updateItem(object, arg1, arg2);
            break;
        case 'remove':
            rtn = removeItem(object, arg1);
            break;
        default:
            rtn = null;
            break;
    }
    return rtn;
}

function getList(object, filter) {
    var coll, item, list, i, x, fld;

    coll = [];
    list = fs.readdirSync(folder+object+'/');
    for(i=0, x=list.length; i<x; i++) {
        fld=null;
        item = JSON.parse(fs.readFileSync(folder+object+'/'+list[i]));
        if(filter) {
            switch(object) {
                case 'student':
                    fld = 'studentName';
                    break;
                case 'teacher':
                    fld = 'teacherName';
                    break;
                case 'course':
                    fld = 'courseName';
                    break;
                default:
                    break;
            }
            if(fld!==null) {
                if(item[fld].toLowerCase().indexOf(filter.toLowerCase())!==-1) {
                    coll.push(item);
                }

            }
        }
        else {
            coll.push(item);
        }
    }

    return coll;
}

function getItem(object, id) {
    var item;

    item = JSON.parse(fs.readFileSync(folder+object+'/'+id));
    return item;
}

function addItem(object, item) {
    item.id = makeId();
    item.dateCreated = new Date();
    fs.writeFileSync(folder+object+'/'+item.id, JSON.stringify(item));
    return getItem(object, item.id);
}

function updateItem(object, id, item) {
    var current;

    current = getItem(object, id);
    for(var prop in current) {
        if(item[prop]) {
            current[prop] = item[prop];
        }
    }

    fs.writeFileSync(folder+object+'/'+id, JSON.stringify(current));
    return getItem(object, id);
}

function removeItem(object, id) {
    fs.unlinkSync(folder+object+'/'+id);
    return getList(object);
}

function makeId() {
    var rtn;

    rtn = String(Math.random());
    rtn = rtn.substring(2);
    rtn = parseInt(rtn).toString(36);

    return rtn;
}

/* eof */
