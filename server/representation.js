/******************************************
 * Class Scheduling Representation Service
 * January 2013
 * Mike Amundsen (@mamund)
 * ****************************************/

module.exports = main;
var csType = 'application/vnd.apiacademy-schedule+xml';
var xmlType = 'application/xml';

var csDoc = {};
csDoc.link = '<link name="{@name}" href="{@href}" action="{@action}" prompt="{@prompt}" />';

function main(object, mimeType) {
    
    switch(mimeType) {
        case csType:
        case xmlType:
            rtn = processCSDoc(object);
            break;
        default:
            return null;
    }
    
    return rtn;
}

function processCSDoc(object) {
    var doc, i, x, tmp;

    doc = '<root>';
    if(object && object.links) {
        doc += '<links>';
        for(i=0, x=object.links.length; i<x; i++) {
            tmp = csDoc.link;
            tmp = tmp.replace('{@name}', object.links[i].name);
            tmp = tmp.replace('{@href}', object.links[i].href);
            tmp = tmp.replace('{@action}', object.links[i].action);
            tmp = tmp.replace('{@prompt}', object.links[i].prompt);
            doc += tmp;
        }
        doc += '</links>';
    }
    doc += '</root>';

    return doc;
}

