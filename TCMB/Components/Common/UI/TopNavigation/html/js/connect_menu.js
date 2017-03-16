/*
 * $RCSfile: connect_menu.js,v $
 * $Author: rrece $
 * $Revision: 1.5 $
 * $Date: 2014/09/16 09:28:03 $
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

function sendMenuState(state, mode, ns, compId, doSave, doMandValidate, inlineErrors )
{
    if (this["beforeMenuSubmit"] && !beforeMenuSubmit(state, mode, ns))
    {
        return;
    }
    
    if (doSave && !doFieldValidation(mode, null, doMandValidate, getFormElems(ns), true, ns, inlineErrors))
    {
      return;
    }

	if (ns == null) ns = "";
	var f = getForm(ns);
	//In menu JS, store selected menu item in variable instead of in cookie
	//Get selected menu item and pass it through on the form. f.menustate
	if (f != null && f.MODE != null)
	{
		f.MODE.value = mode;
	}
	setMenuState(ns, state, compId);
	f.action = getVariable(ns, "act");
	f.submit();
}

function setMenuState(ns, state, compId)
{
	var f = getForm(ns);
	if (f != null)
	{
        var elem = f.elements[compId+"MENUSTATE"];
		if (elem == null)
		{
			elem = document.createElement("input");
			elem.setAttribute("name", compId+"MENUSTATE");
			elem.setAttribute("type", "HIDDEN");
			f.appendChild(elem);
		}
		var ms_value = "";
		for (var i in state)
		{
			ms_value += ("" + i + "^" + state[i] + "#");
		}
		if (ms_value.indexOf("#") == ms_value.length - 1)
		{
			ms_value = ms_value.substring(0, ms_value.length - 1);
		}
		if (ms_value.indexOf("|") == ms_value.length - 1)
		{
			ms_value = ms_value.substring(0, ms_value.length - 1);
		}
		elem.value = ms_value;
	}
}