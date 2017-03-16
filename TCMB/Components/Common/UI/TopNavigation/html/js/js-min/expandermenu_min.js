var Class={create:function(){return function(){this.initialize.apply(this,arguments)}}};Object.extend=function(a,c){for(var b in c){a[b]=c[b]}return a};Object.extend(Object,{clone:function(a){return Object.extend({},a)}});Function.prototype.bind=function(){var a=this,c=$A(arguments),b=c.shift();return function(){return a.apply(b,c.concat($A(arguments)))}};Object.extend(String.prototype,{camelize:function(){var d=this.split("-"),a=d.length;if(a==1){return d[0]}var c=this.charAt(0)=="-"?d[0].charAt(0).toUpperCase()+d[0].substring(1):d[0];for(var b=1;b<a;b++){c+=d[b].charAt(0).toUpperCase()+d[b].substring(1)}return c}});var $break=new Object();var $continue=new Object();var Enumerable={each:function(b){var a=0;try{this._each(function(d){try{b(d,a++)}catch(f){if(f!=$continue){throw f}}})}catch(c){if(c!=$break){throw c}}return this},include:function(a){var b=false;this.each(function(c){if(c==a){b=true;throw $break}});return b},reject:function(b){var a=[];this.each(function(d,c){if(!b(d,c)){a.push(d)}});return a}};var $A=Array.from=function(d){if(!d){return[]}if(d.toArray){return d.toArray()}else{var b=[];for(var a=0,c=d.length;a<c;a++){b.push(d[a])}return b}};Object.extend(Array.prototype,Enumerable);if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse}Object.extend(Array.prototype,{_each:function(b){for(var a=0,c=this.length;a<c;a++){b(this[a])}}});Array.prototype.toArray=Array.prototype.clone;function $w(a){a=a.strip();return a?a.split(/\s+/):[]}if(window.opera){Array.prototype.concat=function(){var e=[];for(var b=0,c=this.length;b<c;b++){e.push(this[b])}for(var b=0,c=arguments.length;b<c;b++){if(arguments[b].constructor==Array){for(var a=0,d=arguments[b].length;a<d;a++){e.push(arguments[b][a])}}else{e.push(arguments[b])}}return e}}var Hash=function(a){Object.extend(this,a||{})};function $H(a){if(a&&a.constructor==Hash){return a}return new Hash(a)}ObjectRange=Class.create();Object.extend(ObjectRange.prototype,{initialize:function(c,a,b){this.start=c;this.end=a;this.exclusive=b},_each:function(a){var b=this.start;while(this.include(b)){a(b);b=b.succ()}},include:function(a){if(a<this.start){return false}if(this.exclusive){return a<this.end}return a<=this.end}});function ecPrototype(b){if(arguments.length>1){for(var a=0,d=[],c=arguments.length;a<c;a++){d.push(ecPrototype(arguments[a]))}return d}if(typeof b=="string"){b=document.getElementById(b)}return Element.extend(b)}if(!window.Element){var Element=new Object()}Element.extend=function(c){if(!c||_nativeExtensions||c.nodeType==3){return c}if(!c._extended&&c.tagName&&c!=window){var b=Object.clone(Element.Methods),a=Element.extend.cache;if(["INPUT","TEXTAREA","SELECT"].include(c.tagName)){Object.extend(b,Form.Element.Methods)}for(var e in b){var d=b[e];if(typeof d=="function"&&!(e in c)){c[e]=a.findOrStore(d)}}}c._extended=true;return c};Element.extend.cache={findOrStore:function(a){return this[a]=this[a]||function(){return a.apply(null,[this].concat($A(arguments)))}}};Element.Methods={visible:function(a){return ecPrototype(a).style.display!="none"},toggle:function(a){a=ecPrototype(a);Element[Element.visible(a)?"hide":"show"](a);return a},hide:function(a){ecPrototype(a).style.display="none";return a},show:function(a){ecPrototype(a).style.display="";return a},getStyle:function(b,c){b=ecPrototype(b);if(["float","cssFloat"].include(c)){c=(typeof b.style.styleFloat!="undefined"?"styleFloat":"cssFloat")}c=c.camelize();var d=b.style[c];if(!d){if(document.defaultView&&document.defaultView.getComputedStyle){var a=document.defaultView.getComputedStyle(b,null);d=a?a[c]:null}else{if(b.currentStyle){d=b.currentStyle[c]}}}if((d=="auto")&&["width","height"].include(c)&&(b.getStyle("display")!="none")){d=b["offset"+c.capitalize()]+"px"}if(window.opera&&["left","top","right","bottom"].include(c)){if(Element.getStyle(b,"position")=="static"){d="auto"}}if(c=="opacity"){if(d){return parseFloat(d)}if(d=(b.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(d[1]){return parseFloat(d[1])/100}}return 1}return d=="auto"?null:d},setStyle:function(b,c){b=ecPrototype(b);for(var a in c){var d=c[a];if(a=="opacity"){if(d==1){d=(/Gecko/.test(navigator.userAgent)&&!/Konqueror|Safari|KHTML/.test(navigator.userAgent))?0.999999:1;if(/MSIE/.test(navigator.userAgent)&&!window.opera){b.style.filter=b.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"")}}else{if(d==""){if(/MSIE/.test(navigator.userAgent)&&!window.opera){b.style.filter=b.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"")}}else{if(d<0.00001){d=0}if(/MSIE/.test(navigator.userAgent)&&!window.opera){b.style.filter=b.getStyle("filter").replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+d*100+")"}}}}else{if(["float","cssFloat"].include(a)){a=(typeof b.style.styleFloat!="undefined")?"styleFloat":"cssFloat"}}b.style[a.camelize()]=d}return b},getDimensions:function(c){c=ecPrototype(c);var g=ecPrototype(c).getStyle("display");if(g!="none"&&g!=null){return{width:c.offsetWidth,height:c.offsetHeight}}var b=c.style;var f=b.visibility;var d=b.position;var a=b.display;b.visibility="hidden";b.position="absolute";b.display="block";var h=c.clientWidth;var e=c.clientHeight;b.display=a;b.position=d;b.visibility=f;return{width:h,height:e}},makeClipping:function(a){a=ecPrototype(a);if(a._overflow){return a}a._overflow=a.style.overflow||"auto";if((Element.getStyle(a,"overflow")||"visible")!="hidden"){a.style.overflow="hidden"}return a},undoClipping:function(a){a=ecPrototype(a);if(!a._overflow){return a}a.style.overflow=a._overflow=="auto"?"":a._overflow;a._overflow=null;return a}};Object.extend(Element.Methods,{childOf:Element.Methods.descendantOf});Object.extend(Element,Element.Methods);var _nativeExtensions=false;if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){["","Form","Input","TextArea","Select"].each(function(b){var c="HTML"+b+"Element";if(window[c]){return}var a=window[c]={};a.prototype=document.createElement(b?b.toLowerCase():"div").__proto__})}var Form=new Object();Form.Element=new Object();if(!window.Event){var Event=new Object()}var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},realOffset:function(b){var a=0,c=0;do{a+=b.scrollTop||0;c+=b.scrollLeft||0;b=b.parentNode}while(b);return[c,a]},cumulativeOffset:function(b){var a=0,c=0;do{a+=b.offsetTop||0;c+=b.offsetLeft||0;b=b.offsetParent}while(b);return[c,a]},positionedOffset:function(b){var a=0,d=0;do{a+=b.offsetTop||0;d+=b.offsetLeft||0;b=b.offsetParent;if(b){if(b.tagName=="BODY"){break}var c=Element.getStyle(b,"position");if(c=="relative"||c=="absolute"){break}}}while(b);return[d,a]},offsetParent:function(a){if(a.offsetParent){return a.offsetParent}if(a==document.body){return a}while((a=a.parentNode)&&a!=document.body){if(Element.getStyle(a,"position")!="static"){return a}}return document.body},within:function(b,a,c){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(b,a,c)}this.xcomp=a;this.ycomp=c;this.offset=this.cumulativeOffset(b);return(c>=this.offset[1]&&c<this.offset[1]+b.offsetHeight&&a>=this.offset[0]&&a<this.offset[0]+b.offsetWidth)},withinIncludingScrolloffsets:function(b,a,d){var c=this.realOffset(b);this.xcomp=a+c[0]-this.deltaX;this.ycomp=d+c[1]-this.deltaY;this.offset=this.cumulativeOffset(b);return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+b.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+b.offsetWidth)},overlap:function(b,a){if(!b){return 0}if(b=="vertical"){return((this.offset[1]+a.offsetHeight)-this.ycomp)/a.offsetHeight}if(b=="horizontal"){return((this.offset[0]+a.offsetWidth)-this.xcomp)/a.offsetWidth}},page:function(d){var a=0,c=0;var b=d;do{a+=b.offsetTop||0;c+=b.offsetLeft||0;if(b.offsetParent==document.body){if(Element.getStyle(b,"position")=="absolute"){break}}}while(b=b.offsetParent);b=d;do{if(!window.opera||b.tagName=="BODY"){a-=b.scrollTop||0;c-=b.scrollLeft||0}}while(b=b.parentNode);return[c,a]},clone:function(c,e){var a=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});c=ecPrototype(c);var d=Position.page(c);e=ecPrototype(e);var f=[0,0];var b=null;if(Element.getStyle(e,"position")=="absolute"){b=Position.offsetParent(e);f=Position.page(b)}if(b==document.body){f[0]-=document.body.offsetLeft;f[1]-=document.body.offsetTop}if(a.setLeft){e.style.left=(d[0]-f[0]+a.offsetLeft)+"px"}if(a.setTop){e.style.top=(d[1]-f[1]+a.offsetTop)+"px"}if(a.setWidth){e.style.width=c.offsetWidth+"px"}if(a.setHeight){e.style.height=c.offsetHeight+"px"}},absolutize:function(b){b=ecPrototype(b);if(b.style.position=="absolute"){return}Position.prepare();var d=Position.positionedOffset(b);var f=d[1];var e=d[0];var c=b.clientWidth;var a=b.clientHeight;b._originalLeft=e-parseFloat(b.style.left||0);b._originalTop=f-parseFloat(b.style.top||0);b._originalWidth=b.style.width;b._originalHeight=b.style.height;b.style.position="absolute";b.style.top=f+"px";b.style.left=e+"px";b.style.width=c+"px";b.style.height=a+"px"},relativize:function(a){a=ecPrototype(a);if(a.style.position=="relative"){return}Position.prepare();a.style.position="relative";var c=parseFloat(a.style.top||0)-(a._originalTop||0);var b=parseFloat(a.style.left||0)-(a._originalLeft||0);a.style.top=c+"px";a.style.left=b+"px";a.style.height=a._originalHeight;a.style.width=a._originalWidth}};if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){Position.cumulativeOffset=function(b){var a=0,c=0;do{a+=b.offsetTop||0;c+=b.offsetLeft||0;if(b.offsetParent==document.body){if(Element.getStyle(b,"position")=="absolute"){break}}b=b.offsetParent}while(b);return[c,a]}}var Effect=new Object();Effect.ScopedQueue=Class.create();Object.extend(Object.extend(Effect.ScopedQueue.prototype,Enumerable),{initialize:function(){this.effects=[];this.interval=null},add:function(b){var c=new Date().getTime();var a=(typeof b.options.queue=="string")?b.options.queue:b.options.queue.position;switch(a){case"front":this.effects.findAll(function(d){return d.state=="idle"}).each(function(d){d.startOn+=b.finishOn;d.finishOn+=b.finishOn});break;case"with-last":c=this.effects.pluck("startOn").max()||c;break;case"end":c=this.effects.pluck("finishOn").max()||c;break}b.startOn+=c;b.finishOn+=c;if(!b.options.queue.limit||(this.effects.length<b.options.queue.limit)){this.effects.push(b)}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)}},remove:function(a){this.effects=this.effects.reject(function(b){return b==a});if(this.effects.length==0){clearInterval(this.interval);this.interval=null}},loop:function(){var c=new Date().getTime();for(var b=0,a=this.effects.length;b<a;b++){if(this.effects[b]){this.effects[b].loop(c)}}}});Effect.Queues={instances:$H(),get:function(a){if(typeof a!="string"){return a}if(!this.instances[a]){this.instances[a]=new Effect.ScopedQueue()}return this.instances[a]}};Effect.DefaultOptions={fps:60,from:0,to:1,delay:0,queue:"parallel"};Effect.Base=function(){};Effect.Base.prototype={start:function(a){this.options=Object.extend(Object.extend({},Effect.DefaultOptions),a||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.event("beforeStart");if(!this.options.sync){Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).add(this)}},loop:function(c){if(c>=this.startOn){if(c>=this.finishOn){this.render(1);this.cancel();this.event("beforeFinish");if(this.finish){this.finish()}this.event("afterFinish");return}var b=(c-this.startOn)/(this.finishOn-this.startOn);var a=Math.round(b*this.options.fps*this.options.duration);if(a>this.currentFrame){this.render(b);this.currentFrame=a}}},render:function(a){if(this.state=="idle"){this.state="running";this.event("beforeSetup");if(this.setup){this.setup()}this.event("afterSetup")}if(this.state=="running"){if(this.options.transition){a=this.options.transition(a)}a*=(this.options.to-this.options.from);a+=this.options.from;this.position=a;this.event("beforeUpdate");if(this.update){this.update(a)}this.event("afterUpdate")}},cancel:function(){if(!this.options.sync){Effect.Queues.get(typeof this.options.queue=="string"?"global":this.options.queue.scope).remove(this)}this.state="finished"},event:function(a){if(this.options[a+"Internal"]){this.options[a+"Internal"](this)}if(this.options[a]){this.options[a](this)}}};Effect.Scale=Class.create();Object.extend(Object.extend(Effect.Scale.prototype,Effect.Base.prototype),{initialize:function(b,c){this.element=ecPrototype(b);if(!this.element){throw (Effect._elementDoesNotExistError)}var a=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:c},arguments[2]||{});this.start(a)},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=this.element.getStyle("position");this.originalStyle={};["top","left","width","height","fontSize"].each(function(b){this.originalStyle[b]=this.element.style[b]}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var a=this.element.getStyle("font-size")||"100%";["em","px","%","pt"].each(function(b){if(a.indexOf(b)>0){this.fontSize=parseFloat(a);this.fontSizeType=b}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]}},update:function(a){var b=(this.options.scaleFrom/100)+(this.factor*a);if(this.options.scaleContent&&this.fontSize){this.element.setStyle({fontSize:this.fontSize*b+this.fontSizeType})}this.setDimensions(this.dims[0]*b,this.dims[1]*b)},finish:function(a){if(this.restoreAfterFinish){this.element.setStyle(this.originalStyle)}},setDimensions:function(a,e){var f={};if(this.options.scaleX){f.width=Math.round(e)+"px"}if(this.options.scaleY){f.height=Math.round(a)+"px"}if(this.options.scaleFromCenter){var c=(a-this.dims[0])/2;var b=(e-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY){f.top=this.originalTop-c+"px"}if(this.options.scaleX){f.left=this.originalLeft-b+"px"}}else{if(this.options.scaleY){f.top=-c+"px"}if(this.options.scaleX){f.left=-b+"px"}}}this.element.setStyle(f)}});Effect.BlindUp=function(a){a=ecPrototype(a);a.makeClipping();return new Effect.Scale(a,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(b){b.element.hide().undoClipping()}},arguments[1]||{}))};Effect.BlindDown=function(b){b=ecPrototype(b);var a=b.getDimensions();return new Effect.Scale(b,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:a.height,originalWidth:a.width},restoreAfterFinish:true,afterSetup:function(c){c.element.makeClipping().setStyle({height:"0px"}).show()},afterFinishInternal:function(c){c.element.undoClipping()}},arguments[1]||{}))};var selectedItem;var useEffects=true;var expanderMenuState=new Object();function initMenu(f,k,m,n){if(this["afterMenuSubmit"]&&!afterMenuSubmit(f,k,n)){return}expanderMenuState[f]=k;var d=k.split("~");selectedItem=ecPrototype(m+"selectedItem");for(var c=0;c<d.length;c++){try{var q=d[c].split("|");for(var j=q.length-1;j>=0;j--){var b=document.getElementById(q[j]);if(b!=null){var o=b.className;b.className="expanded";if(o.match("activeMenuLink")){b.className+=" activeMenuLink"}var c=b.parentNode;while(c.tagName.toLowerCase()!="body"){if(c.tagName.toLowerCase()=="li"){c.className="expanded"}c=c.parentNode}}}}catch(l){}}var a="";var h=k.lastIndexOf("_R");if(h>-1){a=k.substring(h)}var g=ecPrototype(m+n+"leftMenu"+a).getElementsByTagName("li");for(var j=0;j<g.length;j++){g[j].style.display="block";if(ul=g[j].getElementsByTagName("ul")[0]){if(g[j].className.match("collapsed")){if(useEffects){new Effect.BlindUp(ul,{duration:0})}if(containsCurrent(g[j])){g[j].className="current collapsed"}}else{if(g[j].className.match("expanded")){if(useEffects){new Effect.BlindDown(ul,{duration:0})}}}}}}function getParent(c,a){var b=c.parentNode;if(b&&b.className!="leftMenu"){if(b.tagName.toLowerCase()!=a.toLowerCase()){return getParent(b,a)}else{return b}}else{return false}}function containsCurrent(a){parentLi=selectedItem;if(parentLi){while(parentLi=getParent(parentLi,"li")){if(parentLi==a){return true}}}return false}var sliders=0;var SLIDE_UP=1;var SLIDE_DOWN=2;function storeMenuState(h,c,f){var g=h.parentNode.parentNode;var b=g.id;var d=g;if(f){expanderMenuState[c]=b}else{while(d.className.indexOf("leftMenu")==-1){d=d.parentNode}var j=d.getElementsByTagName("li");var a="";for(var e=0;e<j.length;e++){if(j[e].className.indexOf("expanded")>=0){a=a+j[e].id+"|"}}if(a.charAt(a.length-1)=="|"){a=a.substring(0,a.length-1)}expanderMenuState[c]=a}return}function toggleMenu(e,g,h){var a=getParent(e,"li");var f=useEffects?0.3:0;if(jscss("check",a,DISABLED_CLASS)){return}if(a.className.indexOf("expanded")>=0){if(a.getElementsByTagName("ul").length>0){slide(a.getElementsByTagName("ul")[0],f,SLIDE_UP,containsCurrent(a)?"current collapsed":"collapsed");var d=a.getElementsByTagName("ul")[0].getElementsByTagName("li");for(var c=0;c<d.length;c++){d[c].className="collapsed"}}}else{if(h){parentNode=a.parentNode;for(var c=0;c<parentNode.childNodes.length;c++){var b=parentNode.childNodes[c].tagName;if(b&&parentNode.childNodes[c]!=a){if(b.toLowerCase()=="li"&&parentNode.childNodes[c].className.indexOf("expanded")>=0){if(parentNode.childNodes[c].getElementsByTagName("ul").length>0){slide(parentNode.childNodes[c].getElementsByTagName("ul")[0],f,SLIDE_UP,containsCurrent(parentNode.childNodes[c])?"current collapsed":"collapsed")}}}}}a.className="expanded";if(a.getElementsByTagName("ul").length>0){slide(a.getElementsByTagName("ul")[0],f,SLIDE_DOWN,null)}}clickedItem=a;return false}function expandTree(){var d=useEffects?0.3:0;var a=document.getElementById("m0");a.className="expanded";var c=a.getElementsByTagName("li");for(var b=0;b<c.length;b++){c[b].className="expanded";if(c[b].getElementsByTagName("ul").length>0){slide(c[b].getElementsByTagName("ul")[0],d,SLIDE_DOWN,null)}}resize()}function collapseTree(){var d=useEffects?0.3:0;var a=document.getElementById("m0");a.className="collapsed";var c=a.getElementsByTagName("li");for(var b=0;b<c.length;b++){c[b].className="collapsed hidden";if(c[b].getElementsByTagName("ul").length>0){slide(c[b].getElementsByTagName("ul")[0],d,SLIDE_UP,null)}}}function changeClass(a,b){a=document.getElementById(a);a.className=b}function slide(a,d,c,b){if(useEffects){sliders++;if(c==SLIDE_UP){new Effect.BlindUp(a,{duration:d})}else{new Effect.BlindDown(a,{duration:d})}if(b){changeClass(getParent(a,"li").id,b+"ing");setTimeout("changeClass('"+getParent(a,"li").id+"', '"+b+"');",d*1000)}setTimeout("sliders--;",d*1000)}};