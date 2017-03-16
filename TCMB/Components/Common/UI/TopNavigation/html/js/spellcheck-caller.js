/*
 * $RCSfile: spellcheck-caller.js,v $
 * $Author: alan.heath $
 * $Revision: 1.16 $
 * $Date: 2014/05/19 08:32:51 $
 *
 * Copyright (c) 2001-2006 edge IPK Limited, All rights reserved.
 *
 * This source code is protected by copyright laws and international copyright treaties,
 * as well as other intellectual property laws and treaties.
 *  
 * Access to, alteration, duplication or redistribution of this source code in any form 
 * is not permitted without the prior written authorisation of edge IPK.
 * 
 */

var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;

if (checkIt('konqueror'))
{
	browser = "Konqueror";
	OS = "Linux";
}
else if (checkIt('safari')) browser = "Safari";
else if (checkIt('omniweb')) browser = "OmniWeb";
else if (checkIt('opera')) browser = "Opera";
else if (checkIt('webtv')) browser = "WebTV";
else if (checkIt('icab')) browser = "iCab";
else if (checkIt('msie')) browser = "Internet Explorer";
else if (!checkIt('compatible'))
{
	browser = "Netscape Navigator";
	version = detect.charAt(8);
}
else browser = "An unknown browser";

if (!version || version == null) version = detect.charAt(place + thestring.length);

if (!OS)
{
	if (checkIt('linux')) OS = "Linux";
	else if (checkIt('x11')) OS = "Unix";
	else if (checkIt('mac')) OS = "Mac";
	else if (checkIt('win')) OS = "Windows";
	else OS = "an unknown operating system";
}

function checkIt(string)
{
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}

 function spellCheck(field, controllerName, ns, contextPath, evt)
 {  
  if (!this["beforeSpellCheck"] || beforeSpellCheck(field, controllerName, ns, contextPath) )
  {    
   if (!buttonsEnabled(ns)) return false;	
   var elements = new Array(0);              
   elements[elements.length] = field;       
   startSpellCheck(elements, controllerName, evt, ns, contextPath );
  }
  if (this["afterSpellCheck"]) afterSpellCheck(field, controllerName, ns, contextPath);
 }

function startSpellCheck(/* Array of Form Elements */ elements, controllerName, evt, ns, contextPath )
{
    var params='?op=1';    
    for( var x = 0; x < elements.length; x++ )    {
        var form = elements[x].form;        
        var formNumber = getFormNumber( form );    
        params = params + '&element_' + x + '=' + elements[x].name + '&form_number_' + x + '=' + formNumber;
    }    
	params = params + '&namespace=' + ns + '&controllername=' + controllerName;
	params = addSubSessionIdToParameters( params, ns );
	
	var url = contextPath ? contextPath : "";
	url += "spellcheck_entry";
	url += params;
	
    openCenteredWindow( url, 300, 200, evt);
}

function getFormNumber( form )
{
    var forms = document.forms;
    for( var x = 0; x < forms[x].length; x++ )
    {
        if( forms[x] == form )
            return x;
    }
    return -1; 
}

function openCenteredWindow( url, width, height, event )
{
    var pos = calcPopupPosition(width, height, event);
    var newWin = window.open( url,"","height=" + (height) + ",width=" + (width) +",left=" +pos.x+",top="+pos.y+",location=no,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=yes,toolbar=no");
    return newWin;
}
