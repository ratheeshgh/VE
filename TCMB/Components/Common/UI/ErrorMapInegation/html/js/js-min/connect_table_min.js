function beforeRowClicked(a,g,e,d,b,f,c){return true}function afterRowClicked(a,g,e,d,b,f,c){}function beforeRowDoubleClicked(a,b,h,d,g,f,c,e){return true}function afterRowDoubleClicked(a,b,h,d,g,f,c,e){}function tableNavClicked(a,f,e,g,d){var c=unescape(stripPrefix(e,a));if(this["clientSideValidation"]&&this["formatCheckElems"]){if(!formatCheckElems(getFormElems(e),e)){return}}var b=prefixCompID(e,a,"TABLE_NAV__")+c+"__BTN_"+f+"__ID__"+encodeParam(e+stripPrefix(e,d));var h="_TABLE_"+d;ecSubmitForm(e,b,true,h)}function columnSort(c,p,n,d,h,f,m,a,b){if(h==null){h=""}var o=getForm(h).getElementsByTagName("input");var q;for(var e=0;e<o.length;e++){if(o[e].name==d){q=o[e]}}if(q!=null){put(d,getElementValue(q,h))}resortTable(c,p,n,h,f);if(q!=null){r=get(d);var l=splitstring(r,"|",false);q=document.getElementsByName(d);for(var k=0;k<q.length;k++){for(var g=0;g<r.length;g++){if(q[k].value==l[g]){q[k].checked=true;q[k].value=r;break}}}}}function toggleCheckboxes(h,e,f,b,l,a,k){if(f==true){var m=e.getElementsByTagName("table")[0];e=getFirstRealChild(m)}if(e==null||e.childNodes==null||e.childNodes.length==null){return}var g=h.checked;for(var d=0;d<e.childNodes.length;d++){var n=e.childNodes[d];if(n.innerHTML){var c=getSelector(n,"");if((g&&!c.checked)||(!g&&c.checked)){n.click()}}}}function getSelector(b,d){if(d==null){d=""}var f=getTableId(b)+"_Selector";var e=b.getElementsByTagName("input");var a=null;if(e&&e.length){for(var c=0;c<e.length;c++){if(e[c].id&&e[c].id.indexOf(f)==0){a=e[c];break}}}return(a)}function setSelector(b,d,c){var a=getSelector(b,d);if(a!=null){a.checked=c}}function isRowSelected(b,c){var a=getSelector(b,c);return((a!=null)?a.checked:false)}function selectRowClicked(e,k,b,l){var h=document;var g=getForm(l);if(b!=null&&b.length>0){var n=document.getElementsByName(b);if(n!=null&&n.length==null){if(this["hideErrorMessage"]){hideErrorMessage(l,n,[])}if(isRadio(n)){n.checked=true;if(this["hideErrorMessage"]){hideErrorMessage(l,n,[])}}else{n.checked=!n.checked}var a=findSelectAll(e);if(a!=null){a.checked=n.checked}}else{var c=true;if(this["hideErrorMessage"]){hideErrorMessage(l,n[0],[])}for(var m=0;m<n.length;m++){if(n[m].value==k){if(isRadio(n[m])){n[m].checked=true}else{n[m].checked=!n[m].checked}n.value=k}if(!n[m].checked){c=false}}var a=findSelectAll(e);if(a!=null){a.checked=c}}}}function findSelectAll(a){var d=getTable(a);if(!d){return null}var f=d.id+"_SelectAll";var b=d.getElementsByTagName("input");var e=null;var h=null;for(var c=0;c<b.length;c++){h=b[c];var g=h.getAttribute("id");if(g&&g.indexOf(f)==0){e=h;break}}return(e)}function rowDoubleClicked(f,d,k,l,e,g,c,a,h,b){if(h==null){h=""}if(beforeRowDoubleClicked(f,k,l,e,g,c,a,h)==false){return}selectRowClicked(f,g,c,h);if(k||l||e){setTableColours(f,d,h,k,l,e)}performDefaultButtonAction(f,a,h,b);afterRowDoubleClicked(f,k,l,e,g,c,a,h)}function rowClicked(b,e,a,d,f,c,h,g){if(!b){return}if(d==null){d=""}if(beforeRowClicked(b,e,a,d,c,h,g)==false){return}selectRowClicked(b,e,a,d);if(c||h||g){setTableColours(b,f,d,c,h,g)}afterRowClicked(b,e,a,d,c,h,g)}function getTable(a){return findTable(a)}function findTable(a,b){var c=a;while(c!=null){if(b&&b!=""&&b==p_id){c=null;break}if((c.nodeName=="TABLE"&&c.title)||(c.id&&c.id.indexOf("TBL_")>=0&&getRowPart(c.id).length==0)){break}c=c.parentNode}return(c)}function getTableName(a){return(getTable(a).getAttribute("title"))}function getTableId(a){return(getTable(a).getAttribute("id"))}function mouseEntered(a,d,c,b,f,e){if(d==null){d=""}if(c&&c.length>0&&!isRowSelected(a,d)){setVariable(d,prefixCompID(d,a.id,"RO_STYLE"),c);setVariable(d,prefixCompID(d,a.id,"SEL_STYLE"),b);setVariable(d,prefixCompID(d,a.id,"ODD_STYLE"),f);setVariable(d,prefixCompID(d,a.id,"EVEN_STYLE"),e);jscss("replace",a,c,"ecMarker_rs");jscss("add",a,c)}a.style.cursor=(IE4)?"hand":"pointer"}function mouseLeft(a,c){if(c==null){c=""}var b=getVariable(c,prefixCompID(c,a.id,"RO_STYLE"));if(b&&b.length>0&&!isRowSelected(a,c)){jscss("remove",a,b);jscss("replace",a,"ecMarker_rs",b)}}function hideOddEvenStyles(a,c,b){jscss("replace",a,c,"ecMarker_os");jscss("replace",a,b,"ecMarker_es")}function showOddEvenStyles(a,c,b){jscss("replace",a,"ecMarker_os",c);jscss("replace",a,"ecMarker_es",b)}function setTableColours(f,e,k,c,l,a){var g=getTableId(f);var h=getVariable(k,"rowClickedIds");var b=h[g];if(e){if(isRowSelected(f,k)){jscss("replace",f,"ecMarker_ss",c)}else{jscss("remove",f,c)}showOddEvenStyles(f,l,a)}else{if(b&&b!=""){var d=document.getElementById(b);if(d!=null&&!isRowSelected(d,k)){jscss("remove",d,c);jscss("replace",f,"ecMarker_ss",c);showOddEvenStyles(d,l,a)}}}h[g]=f.id;setVariable(k,"rowClickedIds",h);if(isRowSelected(f,k)&&((""+c).length)>0){jscss("replace",f,c,"ecMarker_ss");hideOddEvenStyles(f,l,a);jscss("remove",f,getVariable(k,prefixCompID(k,f.id,"RO_STYLE")));jscss("add",f,c)}}function getColumnInnerText(d){if(typeof d=="string"){return d}if(typeof d=="undefined"){return d}var e="";var c=d.childNodes;var a=c.length;for(var b=0;b<a;b++){switch(c[b].nodeType){case 1:if(c[b].className=="accessibilityStyle"){break}e+=getColumnInnerText(c[b]);break;case 3:e+=c[b].nodeValue;break}}return e}function resortTable(a,o,n,l,g){if(l==null){l=""}var b=a.firstChild;var d=null;if(b.lastChild&&b.lastChild.tagName&&b.lastChild.tagName.toLowerCase()=="img"){d=b.lastChild}else{for(var p=0;p<b.childNodes.length;p++){if(b.childNodes[p].tagName&&b.childNodes[p].tagName.toLowerCase()=="img"){d=b.childNodes[p]}}}var f=a.parentNode;var c=a.getAttribute("abbr")-1;if(o!=null){var m=1;if(g){m=0}var k=o.rows.length;var h=getColumnInnerText(o.rows[m].cells[c]);sortfn=new Function("a","b","var n='"+l+"'; return sortRowsCaseInsensitive(a,b,n);");if(n=="date"){sortfn=new Function("a","b","var n='"+l+"'; return sortRowsByDate(a,b,n);")}if(n=="number"){sortfn=new Function("a","b","var n='"+l+"'; return sortRowsByNumeric(a,b,n);")}setVariable(l,"SORT_COLUMN_INDEX",c);var e=new Array();for(j=m;j<k;j++){if(g){e[j]=o.rows[j]}else{e[j-1]=o.rows[j]}}e.sort(sortfn);if(d!=null){if(d.getAttribute("sortdir")=="ascending"){d.src=getImageDirPath(l)+"up.gif";e.reverse();d.setAttribute("sortdir","descending")}else{d.src=getImageDirPath(l)+"down.gif";d.setAttribute("sortdir","ascending")}}for(i=0;i<e.length;i++){if(o.getElementsByTagName("tbody")){o.getElementsByTagName("tbody")[0].appendChild(e[i])}}for(var p=0;p<f.childNodes.length;p++){if(f.childNodes[p].lastChild&&f.childNodes[p].lastChild.tagName!="undefined"){if(f.childNodes[p].lastChild.tagName&&f.childNodes[p].lastChild.tagName.toLowerCase()=="img"&&f.childNodes[p].lastChild!=d){f.childNodes[p].lastChild.src=getImageDirPath(l)+"invis.gif";f.childNodes[p].lastChild.setAttribute("sortdir","")}}}}}function getParent(b,a){if(b==null){return null}else{if(b.nodeType==1&&b.tagName.toLowerCase()==a.toLowerCase()){return b}else{return getParent(b.parentNode,a)}}}function sortRowsByDate(d,c,f){if(f==null){f=""}var e=getVariable(f,"SORT_COLUMN_INDEX");aa=getColumnInnerText(d.cells[e]);bb=getColumnInnerText(c.cells[e]);if(aa.length==10){dt1=aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2)}else{yr=aa.substr(6,2);if(parseInt(yr)<50){yr="20"+yr}else{yr="19"+yr}dt1=yr+aa.substr(3,2)+aa.substr(0,2)}if(bb.length==10){dt2=bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2)}else{yr=bb.substr(6,2);if(parseInt(yr)<50){yr="20"+yr}else{yr="19"+yr}dt2=yr+bb.substr(3,2)+bb.substr(0,2)}if(dt1==dt2){return 0}if(dt1<dt2){return -1}return 1}function sortRowsByNumeric(d,c,f){if(f==null){f=""}var e=getVariable(f,"SORT_COLUMN_INDEX");aa=parseFloat(getColumnInnerText(d.cells[e]));if(isNaN(aa)){aa=0}bb=parseFloat(getColumnInnerText(c.cells[e]));if(isNaN(bb)){bb=0}return aa-bb}function sortRowsCaseInsensitive(d,c,f){if(f==null){f=""}var e=getVariable(f,"SORT_COLUMN_INDEX");aa=getColumnInnerText(d.cells[e]).toLowerCase();bb=getColumnInnerText(c.cells[e]).toLowerCase();if(aa==bb){return 0}if(aa<bb){return -1}return 1}function sortRowsByDefault(d,c,f){if(f==null){f=""}var e=getVariable(f,"SORT_COLUMN_INDEX");aa=getColumnInnerText(d.cells[e]);bb=getColumnInnerText(c.cells[e]);if(aa==bb){return 0}if(aa<bb){return -1}return 1};