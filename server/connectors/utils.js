/******************************
 * Class-Scheduling
 * Connector utilities
 * January 2012
 * Mike Amundsen (@mamund)
 ******************************/

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

