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
  var elm, coll, i, x;
  
  // style the body
  markForms();
  
  function markForms() {
    coll = document.getElementsByTagName('form');
    for(i=0,x=coll.length;i<x;i++) {
      coll[i].style.display='none';
      coll[i].id='form-'+i;
      elm = document.createElement('a');
      elm.href='#';
      elm.class=coll[i].getAttribute('legend')+'_link';
      elm.id='link-'+i;
      elm.appendChild(document.createTextNode(coll[i].getAttribute('legend')));
      elm.onclick = toggleForm;
      coll[i].parentNode.appendChild(elm);
    }
  }

  function toggleForm() {
    var a,f;

    a = this;
    f = document.getElementById(this.id.replace('link','form'));
    if(a.style.display==='none') {
      a.style.display='inline';
      f.style.display='none';
    }
    else {
      a.style.display='none';
      f.style.display='inline';
    }

    return false;
  }
}


