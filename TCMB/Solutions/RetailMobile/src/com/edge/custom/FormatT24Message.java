/*
 * $RCSfile: UploadDocToServer.java,v $
 * $Author: uk\ratheesh.upendra $
 * $Revision: 1.1 $
 * $Date: 2014/02/18 09:41:01 $
 *
 * Copyright (c) 2001-2012 edge IPK Limited, All rights reserved.
 *
 * This source code is protected by copyright laws and international copyright treaties,
 * as well as other intellectual property laws and treaties.
 *  
 * Access to, alteration, duplication or redistribution of this source code in any form 
 * is not permitted without the prior written authorisation of edge IPK.
 * 
 */

package com.edge.custom;

import com.acquire.Constants;
import com.acquire.intelligentforms.ContextObject;
import com.acquire.intelligentforms.FormConstants;
import com.acquire.intelligentforms.FormSession;
import com.acquire.intelligentforms.data.SessionDictionary;
import com.acquire.intelligentforms.entities.Property;
import com.acquire.intelligentforms.entities.RequiredAttributes;
import com.acquire.intelligentforms.rules.IErrorHandlingRule;
import com.acquire.intelligentforms.rules.IRule;
import com.acquire.intelligentforms.rules.Rule;

/**
 * @author
 * 
 * Extract the messages from error and override returned in response
 * 
 * 
 * 
 */

public class FormatT24Message extends Rule implements IRule, IErrorHandlingRule {

	private static final long serialVersionUID = 1L;

	public static final String ATTR_STATUS = "successIndicator";
	public static final String ATTR_MSG_CONTENT = "messageContent";
	public static final String ATTR_MSG_OUTPUT = "messageOut";
	public static final String ATTR_MSG_TYPE = "messageType";

	public static final String CLASSNAME = "FormatT24Message";
	static String propertiesFilePath;
	static String channelName;
	public String signOnName;

	public static String getClassIdentifier() {
		return CLASSNAME;
	}

	static {

		setRequiredAttributesNames(CLASSNAME, new String[] { ATTR_STATUS,
				ATTR_MSG_CONTENT, ATTR_MSG_OUTPUT, ATTR_MSG_TYPE });

		setRequiredAttributesLabel(CLASSNAME,
				new String[] { "Status", "Message to be extracted",
						"Extracted message", "Message type" });

		setRequiredAttributesHelpText(CLASSNAME, new String[] {
				"Output status. Allowed values are Success or T24Error",
				"Message content which should be extracted",
				"Extracted message as an output",
				"Ouput of message type. Returns as Message or Warning" });

		setRequiredAttributesComponentType(
				CLASSNAME,
				new String[] {
						"com.acquire.intelligentforms.ide.dictionaryeditor.PropertyChooser",
						"com.acquire.intelligentforms.ide.dictionaryeditor.PropertyChooser",
						"com.acquire.intelligentforms.ide.dictionaryeditor.PropertyChooser",
						"com.acquire.intelligentforms.ide.dictionaryeditor.PropertyChooser" });

		setRequiredAttributesComponentValue(
				CLASSNAME,
				new String[] {
						"Data Item Chooser|-1|true|false|com.acquire.intelligentforms.entities.Property",
						"Data Item Chooser|-1|true|false|com.acquire.intelligentforms.entities.Property",
						"Data Item Chooser|-1|true|false|com.acquire.intelligentforms.entities.Property",
						"Data Item Chooser|-1|true|false|com.acquire.intelligentforms.entities.Property" });

		setRequiredAttributesManadatory(CLASSNAME, new boolean[] { true, true,
				true, true });

		setRequiredAttributesEntityDependence(CLASSNAME,
				new Class[] { Property.class, Property.class, Property.class,
						Property.class });

		setRequiredAttributesListener(CLASSNAME, new boolean[] { false, false,
				false, false });

		setRequiredAttributesDefaultValues(CLASSNAME, new String[] { "", "",
				"", "" });

		setRequiredAttributesTab(CLASSNAME, new String[] { "Details",
				"Details", "Details", "Details" });

		setRequiredAttributesDisplayOnNewLine(CLASSNAME, new int[] {
				FormConstants.DISPLAY_ON_NEW_LINE,
				FormConstants.DISPLAY_ON_NEW_LINE,
				FormConstants.DISPLAY_ON_NEW_LINE,
				FormConstants.DISPLAY_ON_NEW_LINE });

		setRequiredAttributesUsage(CLASSNAME, new int[] {
				RequiredAttributes.DEFAULT_ATTR_USAGE,
				RequiredAttributes.DEFAULT_ATTR_USAGE,
				RequiredAttributes.DEFAULT_ATTR_USAGE,
				RequiredAttributes.DEFAULT_ATTR_USAGE });

		setRequiredTabNames(CLASSNAME, new String[] { "Details", "Details",
				"Details", "Details" });

		setGenericDialogHandler(CLASSNAME, null);

		setHelpFile(CLASSNAME, null);
	}

	@Override
	public String getDisplayString() {
		return m_comment;
	}

	// Constructor
	public FormatT24Message(ContextObject p_context) {
		super(p_context);
	}

	@Override
	public int evaluate(FormSession p_formSession) throws Exception {
		SessionDictionary oSecDic = p_formSession.getSessionDictionary();
		String ResStatus = (String) getAttribute(ATTR_STATUS);
		String message = (String) getAttribute(ATTR_MSG_CONTENT);

		ResStatus = (String) oSecDic.getPropertyValue(ResStatus);
		message = (String) oSecDic.getPropertyValue(message);

		String messageType = null;
		String messageOut = null;

		StringBuilder str = new StringBuilder(message);

		if (ResStatus.equalsIgnoreCase("T24Error")) {
			// find the symbol "=" get the message content
			int eqSymbol = str.indexOf("=");

			if (eqSymbol != -1) {
				messageOut = str.substring(eqSymbol + 1);
			} else {
				messageOut = message;
			}
		} else {
			// find the string between the symbols "}" and "{"
			if ((str.indexOf("}")) != -1 && (str.indexOf("{")) != -1) {
				messageOut = str.substring((str.indexOf("}")) + 1,
						(str.indexOf("{")));
				int findWarn = str.indexOf("Warning");
				int findMess = str.indexOf("Message");
				if (findWarn == -1) {
					if (findMess == -1) {
						messageOut = null;
						messageType = null;
					} else {
						messageType = "Message";
					}
				} else {
					messageType = "Warning";
				}
			} else if ((str.indexOf("}")) != -1) {
				messageOut = str.substring((str.indexOf("}")) + 1);
				int findWarn = str.indexOf("Warning");
				int findMess = str.indexOf("Message");
				if (findWarn == -1) {
					if (findMess == -1) {
						messageOut = null;
						messageType = null;
					} else {
						messageType = "Message";
					}
				} else {
					messageType = "Warning";
				}
			} else {
				messageOut = message;
			}
		}
		oSecDic.setPropertyValue((String) getAttribute(ATTR_MSG_OUTPUT),
				messageOut);
		oSecDic.setPropertyValue((String) getAttribute(ATTR_MSG_TYPE),
				messageType);
		return Constants.TRUE;
	}

}