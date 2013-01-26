/******************************************
 * Class Scheduling Representation Service
 * January 2013
 * Mike Amundsen (@mamund)
 * ****************************************/

module.exports = main;

function main(object, mimeType) {
    return '<root>'+JSON.stringify(object, null, 4)+'</root>';
}
