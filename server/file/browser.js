/********************************************
 * Class-Scheduling 
 * HTML Browser scripts
 * January 2013
 * Mike Amundsen (@mamund)
 * http://www.infoq.com/author/Mike-Amundsen
 * http://www.linkedin.com/in/mikeamundsen
 ********************************************/
 
// uses bootstrap for styling
window.onload = function() {
  var elm, coll, i, x;
  
  // style the body
  //elm = document.getElementsByTagName('div')[0];
  //if(elm) {elm.className = 'hero-unit';}
  
  // style the nav links
  coll = document.getElementsByTagName('a');
  for(i=0, x=coll.length; i<x;i++) {
    if(coll[i].parentNode.className==='links') {
      coll[i].className = 'btn btn-primary';
    }
  }
 
  // style the message details
  elm = document.getElementsByTagName('dl')[0];
  if(elm) {elm.className='dl-horizontal'};
  
  // style the input form
  coll = document.getElementsByTagName('form');
  for(i=0, x=coll.length; i<x; i++) {
    coll[i].className='form-horizontal';
  }
  coll = document.getElementsByTagName('input');
  for(i=0, x=coll.length; i<x; i++) {
    if(coll[i].getAttribute('type')==='submit') {
      coll[i].className='btn';
    }
  }
}


