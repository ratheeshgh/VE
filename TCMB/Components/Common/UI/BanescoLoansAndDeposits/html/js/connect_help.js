/*
 * $RCSfile: connect_help.js,v $
 * $Author: aheath $
 * $Revision: 1.30 $
 * $Date: 2015/12/11 10:04:07 $
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

function showHelp(qName, ns, controllerName, contextPath, evt)
{
 if (!this["beforeHelpRequest"] || beforeHelpRequest(qName, ns, controllerName, contextPath))
 {
     var url = contextPath + "helpservletcontroller?QUESTION=" + qName + "&namespace=" + ns + "&controllername=" + controllerName;
     var top = calcWinPopupTop(300, window.event ? window.event : evt);
     var left = calcWinPopupLeft(600, window.event ? window.event : evt);
     window.open(url, "helpwin" ,"toolbar=no,directories=no,status=yes,scrollbars=yes,resizeable=yes,resize=yes,menubar=no,height=300,width=600,top=" + top + ",left=" + left).focus();
    }
    if (this["afterHelpRequest"])
    {
     afterHelpRequest(qName, ns, controllerName, contextPath);
    }
}
function calcWinPopupTop(p_windowHeight, evt){
    var top = 0;
    p_windowHeight = parseFloat(p_windowHeight);
 if ((evt.screenY + p_windowHeight) > screen.height) top = screen.height - (p_windowHeight + 30);
 else  top = evt.screenY;
    return top;
}
function calcWinPopupLeft(p_windowWidth, evt){
    var left = 0;
    p_windowWidth = parseFloat(p_windowWidth);
 if ((evt.screenX + p_windowWidth) > screen.width) left = screen.width - (p_windowWidth + 30);
 else  left = evt.screenX;
    return left;
}


function calcPopupPosition(p_w,p_h,evt)
{
    // try not to place the popup over the input 
	var leftOffset = (document.body.parentNode.scrollLeft != null && navigator.userAgent.indexOf("AppleWebKit") == -1)? document.body.parentNode.scrollLeft : window.scrollX;
	var browserWidth = calcBrowserWidth();
	var topOffset = (document.body.parentNode.scrollTop != null && navigator.userAgent.indexOf("AppleWebKit") == -1)? document.body.parentNode.scrollTop : window.scrollY;
	var browserHeight = calcBrowserHeight();

	var ltr = document.documentElement.dir == "ltr";
	
	var left = evt.clientX + leftOffset;
	var top;
	
	p_w = parseFloat(p_w);
	p_h = parseFloat(p_h);
	
	if ((evt.clientX + p_w) > (screen.left + screen.width) ||
		(evt.clientX + p_w) > browserWidth)
	{
	    // no room to place to the right, so try to place down and left
	    top = evt.clientY + topOffset + 20;
        if ((evt.clientY + p_h) > (screen.top + screen.height) ||
		    (evt.clientY + p_h) > browserHeight)
	    {
	         // no room to place down and left so place up and left
             top = top - (p_h + 20);
	    }	
        left = left - (p_w + 20);
	}
	else
	{
	    // can place to right, so see if can be placed below
        top = evt.clientY + topOffset;
        if ((evt.clientY + p_h) > (screen.top + screen.height) ||
		    (evt.clientY + p_h) > browserHeight)
	    {
	         // no room below so place above
             top = top - (p_h + 20);
	    }
	    // else set to the ideal position	
	}
	var rtl = document.documentElement.dir == "rtl";
	if(rtl) left = left - p_w;

	if(left<0)left=0;
	if(top<0)top=0;

    return {x: left, y: top};    
}

function calcBrowserWidth() {
  return getPageSize()[0];
}

function calcBrowserHeight() {
  return getPageSize()[1];
}

 //
// getPageSize()
//
function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer
		if(document.documentElement.clientWidth){
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}
	// for small pages with total height less then height of the viewport
	if(yScroll > windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll > windowWidth){
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}

	return [pageWidth,pageHeight];
}

var helpTimeout;
function showAjaxHelp(elId, qName, ns, controllerName, contextPath, evt, targetId)
{
//	 evt or targetId could be null/undefined/empty but not both
	if (!this["beforeHelpRequest"] || beforeHelpRequest(elId, qName, ns, controllerName, contextPath))
	{
		var isValidTargetId = targetId != null && targetId.length > 0;
		if (isValidTargetId)
		{
			setVariable(ns, 'currentHelpTarget', targetId);
			removeHelpContent();
		}
		else
		{
		    if (window.event) evt = window.event;
		    if(evt)
		    {
				var xy = new Object();
				if (window.event)
				{
					xy.clientX = window.event.clientX;
					xy.clientY = window.event.clientY;
				}
				else
				{
					xy.clientX = evt.clientX;
					xy.clientY = evt.clientY;
				}
				setVariable(ns, 'clickEvt', xy);
		    }
		}
		    
		helpTimeout = setTimeout( function () { ajaxHelp(elId, qName, ns, controllerName, contextPath); }, 500);    
    }
    if (this["afterHelpRequest"])
    {
	    afterHelpRequest(elId, qName, ns, controllerName, contextPath);
    }
}

function hideHelpContent()
{
	if (helpTimeout) {
		clearTimeout(helpTimeout);
		helpTimeout = null;
	}

	var currentHelpContent = document.getElementById('helpContent');
    if (currentHelpContent != null)
    {
    	currentHelpContent.style.display = 'none';
    }
}

function removeHelpContent()
{
	var currentHelpContent = document.getElementById('helpContent');
    if (currentHelpContent != null)
    {
    	currentHelpContent.parentNode.removeChild(currentHelpContent);
    }
}

function createHelpDiv(dElement, text, ns)
{
	var currentHelpTarget = getVariable(ns, 'currentHelpTarget');
	var clickEvt = getVariable(ns, 'clickEvt');
	
	if (currentHelpTarget != null)
	{
		var helpContainer = document.getElementById(currentHelpTarget);
		helpContainer.innerHTML = text + helpContainer.innerHTML;
		helpContainer.style.display = "";
		var helpDiv = document.getElementById("helpContent");
		helpDiv.style.width = helpContainer.clientWidth + "px";
		helpDiv.style.height = helpContainer.clientHeight + "px";
		return;
	}
	var helpDiv = document.getElementById("helpDiv");
	if (helpDiv == null)
	{
		helpDiv = createFloatingDiv("helpDiv", document.body);
	}
	helpDiv.innerHTML = text;
	helpDiv.style.position = "absolute";
	
	var w = helpDiv.firstChild.offsetWidth;
    var h = helpDiv.firstChild.offsetHeight;
    
    var pos = calcPopupPosition(w,h,clickEvt);

	helpDiv.style.left     = "" + pos.x + "px";
	helpDiv.style.top      = "" + pos.y + "px";
	helpDiv.style.display  = "";
}

function clickHelpButton(help_id)
{
    if (help_id && help_id.length>0)
    {
    	var helpElem = document.getElementById(help_id);
    	if (helpElem && helpElem.onclick)
    	{
    		helpElem.onclick();
    	}
    }
}


//*****************************************************************************
// Do not remove this notice.
//
// Copyright 2001 by Mike Hall.
// See http://www.brainjar.com for terms of use.
//*****************************************************************************

// Determine brwsr and version.

function ecBrowser() {

  var ua, s, i;

  this.isIE    = false;
  this.isNS    = false;
  this.version = null;

  ua = navigator.userAgent;

  s = "MSIE";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isIE = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  // Treat any other "Gecko" brwsr as NS 6.1.

  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = 6.1;
    return;
  }
}

var brwsr = new ecBrowser();

// Global object to hold drag information.

var dragObj = new Object();
dragObj.zIndex = 0;

function dragStart(event, id) {

  var el;
  var x, y;

  // If an element id was given, find it. Otherwise use the element being
  // clicked on.

  if (id)
    dragObj.elNode = document.getElementById(id);
  else {
    if (brwsr.isIE)
      dragObj.elNode = window.event.srcElement;
    if (brwsr.isNS)
      dragObj.elNode = event.target;

    // If this is a text node, use its parent element.

    if (dragObj.elNode.nodeType == 3)
      dragObj.elNode = dragObj.elNode.parentNode;
  }

  // Get cursor position with respect to the page.

  if (brwsr.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop  + document.body.scrollTop;
  }
  if (brwsr.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Save starting positions of cursor and element.

  dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);

  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

  // Update element's z-index.

  //dragObj.elNode.style.zIndex = ++dragObj.zIndex;

  // Capture mousemove and mouseup events on the page.

  if (brwsr.isIE) {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (brwsr.isNS) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}

function dragGo(event) {

  var x, y;

  // Get cursor position with respect to the page.

  if (brwsr.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (brwsr.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Move drag element by the same amount the cursor has moved.

  dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
  dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";

  if (brwsr.isIE) {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (brwsr.isNS)
    event.preventDefault();
}

function dragStop(event) {

  // Stop capturing mousemove and mouseup events.

  if (brwsr.isIE) {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  if (brwsr.isNS) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
}


