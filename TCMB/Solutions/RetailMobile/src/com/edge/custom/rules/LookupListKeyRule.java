package com.edge.custom.rules;

import com.acquire.Constants;
import com.acquire.intelligentforms.FormContext;
import com.acquire.intelligentforms.FormSession;
import com.acquire.intelligentforms.IGenericDialogSpec;
import com.acquire.intelligentforms.data.ListValues;
import com.acquire.intelligentforms.entities.FormList;
import com.acquire.intelligentforms.entities.NextPhase;
import com.acquire.intelligentforms.entities.Property;
import com.acquire.intelligentforms.rules.AddToListRule;
import com.acquire.intelligentforms.rules.IComplexRule;
import com.acquire.intelligentforms.rules.IRule;
import com.acquire.intelligentforms.rules.Rule;
import com.acquire.intelligentforms.rules.RuleList;
import com.acquire.intelligentforms.rules.RuleResult;
import com.acquire.intelligentforms.rules.RulesEngine;
/**
 *  @author gmcdonald
 *  
 *  Utility rule to look a list key value 
 */
public class LookupListKeyRule extends Rule implements IRule, IGenericDialogSpec, IComplexRule 
{
    public final static String CLASSNAME = "Lookup List Key Rule";
    public final static String ATTR_LOOKUP_LIST = "StaticListtoSearch";
    public final static String ATTR_SEARCH_TERM = "SearchValue";
    
    static
    {
        setRequiredAttributesNames(CLASSNAME, new String[] {ATTR_LOOKUP_LIST,
                                                            ATTR_SEARCH_TERM
                                                            });
        setRequiredAttributesLabel(CLASSNAME, new String[] {"Lookup List",
                                                            "Search Term"});
        setRequiredAttributesHelpText(CLASSNAME, new String[] {"Select the List to perform a lookup on",
                                                               "Provide the value to search the list keys for"});
        
        setRequiredAttributesComponentType(CLASSNAME, new String[] {"com.acquire.intelligentforms.ide.datatypeseditor.ListChooser" + "|" + IGenericDialogSpec.RICH_VALUES,
                                                                    "com.acquire.intelligentforms.ide.dialogs.RichTextField" + "|" + IGenericDialogSpec.RICH_VALUES});
        setRequiredAttributesComponentValue(CLASSNAME, new Object[] {"List Chooser|2|false|false|com.acquire.intelligentforms.entities.FormList",
                                                                     "ALL_CHARS"});
        
        setRequiredAttributesManadatory(CLASSNAME, new boolean[] {true,
                                                                  true});
        setRequiredAttributesEntityDependence(CLASSNAME, new Class[] {FormList.class,
                                                                      Property.class});
        setRequiredAttributesListener(CLASSNAME, new boolean[] {false,
                                                                false});
        setRequiredAttributesTab(CLASSNAME, new String[] {"Details",
                                                          "Details"});
        setRequiredAttributesDefaultValues(getClassIdentifier(), new String[] {null,
                                                                               null});
        setRequiredTabNames(CLASSNAME, new String[] {"Details"});
    }

    
    public static String getClassIdentifier()
    {
        return CLASSNAME;
    }

    public LookupListKeyRule(FormContext p_formContext)
    {
        super(p_formContext);
    }

    public int evaluate(FormSession p_formSession) throws Exception
    {
        RuleResult ruleResult = evaluate(p_formSession, null, null, RulesEngine.BUTTON_RULE);
        return ruleResult.getResult();
    }
    
    public RuleResult evaluate(FormSession p_formSession, NextPhase p_currentPhase, RuleList p_ruleList, int p_ruleType) throws Exception {
        FormContext formContext = p_formSession.getFormContext();

        if (p_formSession.getDebugLevel() >= 4) {
            p_formSession.outputDebugMessage("Look up list key Rule " + getName(), "Look up List", 4);
        }

        String listName = checkForSubstitution((String) getAttribute(ATTR_LOOKUP_LIST), p_formSession, false);
        String searchTerm = checkForSubstitution((String) getAttribute(ATTR_SEARCH_TERM), p_formSession, false);
        FormList list = (FormList) p_formSession.getFormContext().getEntity(listName, FormList.class);
        
        if (p_formSession.getDebugLevel() >= 4) {
            super.outputDebugMessage(p_formSession,"Searching list " + listName + " for " + searchTerm, 4);
        }
        
        // TODO Don't care about language maps or presentation lists at the moment, should add more error handling really!!
        // but we probably should at some point
        ListValues valuesInList = formContext.getListValues(list, null, null, false, true);
        if (valuesInList != null && valuesInList.containsKey(searchTerm)) {
            if (p_formSession.getDebugLevel() >= 4) {
                super.outputDebugMessage(p_formSession,"FOUND: " + searchTerm, 4);
            }
            return new RuleResult(Constants.TRUE, true, null);
        } else {
            if (p_formSession.getDebugLevel() >= 4) {
                super.outputDebugMessage(p_formSession,"NOPE - IT AINT IN HERE: " + searchTerm, 4);
                super.outputDebugMessage(p_formSession,"SEE: " + valuesInList, 4);
            }
            return new RuleResult(Constants.FALSE, true, null);
        }
    }

    public String getDisplayString()
    {
        StringBuffer displayString = new StringBuffer();
        String listName = (String) getAttribute(ATTR_LOOKUP_LIST);
        String searchTerm = (String) getAttribute(ATTR_SEARCH_TERM);

        displayString.append("List Contains Key Rule:  Lookup List");
        displayString.append(listName)
                     .append(" Search term source: ")
                     .append(searchTerm);

        return displayString.toString();
    }
}