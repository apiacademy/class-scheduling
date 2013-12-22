/********************************************
 * Class-Scheduling 
 * HTML Browser scripts
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/
 
// style on load
window.onload = function() {
  
  updateActions();

  // convert actions & links into HTML
  function updateActions() {
    var coll, i, x, lgd;

    coll = document.getElementsByTagName('form');
    for(i=0,x=coll.length;i<x;i++) {
      coll[i].onsubmit = sendForm;
    }

    coll = document.getElementsByTagName('a');
    for(i=0,x=coll.length;i<x;i++) {
      lgd = coll[i].getAttribute('legend');
      if(lgd==='remove') {
        coll[i].onclick = sendDelete;  
      }
    }
  }

  // accomodate delete
  function sendDelete() {
    var a = this;
    sendRequest(a);
    return false;
  }
  
  // accomodate forms
  function sendForm() {
    var t = this;
    sendRequest(t);
    return false;
  }
  
  // handle protocol mapping (for HTTP)
  function sendRequest(elm) {
    var t, body, href, action, method;

    t = elm;
    f = false;
    action = t.getAttribute('legend');

    switch(action) {
      case 'add':
	href = t.action;
        method='post';
	body = makeBody(t);
	f = true;
	break;
      case 'update':
	href = t.action;
	method='put';
	body = makeBody(t);
	f = true;
	break;
      case 'remove':
	href = t.href;
	method='delete';
	f = true;
	break;
      default:
	f = false;
    }

    if(f) {
      makeRequest(href, action, method, body);
    }
  }

  // build request bodies per spec
  function makeBody(t) {
    var i, x, coll, body;

    coll = t.getElementsByTagName('input');
    body = '';
    for(i=0,x=coll.length;i<x;i++) {
      if(i>0) {
        body +='&';
      }
      body += coll[i].name+'='+escape(coll[i].value);
    }
    return body;
  }

  // native XmlHttpRequest call
  function makeRequest(href, context, method, body) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {

      ajax.onreadystatechange = function(){processResponse(ajax, context);};

      if(body) {
        ajax.open(method,href,false);
        ajax.send(body);
      }
      else {
        ajax.open(method,href,false);
        ajax.send(null);
      }
    }
  }

  // handle XmlHttpRequest response
  function processResponse(ajax, context) {

    if(ajax.readyState==4 || ajax.readyState==='complete') {
      if(ajax.status===200 || ajax.status===204) {
	alert('Success!');
        window.location.reload();
      }
      else {
        alert(ajax.status);
      }
    } 
  }
}

