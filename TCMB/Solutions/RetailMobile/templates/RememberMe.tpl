<script src="$$HTML_LOCATION$/js/custom_scripts.js"></script>
<script type="text/javascript" language="javascript">

//Clear error message on focus handling
$( document ).ready( function() {
  	// Add listener
  	$('.form-control').focus(function() {
  		$('.ErrorMessage').hide();
  		$('.WelcomeMessageWhite').children().addBack().show(); 
	});
});

//Check whether the checkbox with ID REMEMBER_ME_CHECKBOX is selected or not.
//If selected, check whether the cookie already exists using readCookie(). If not, create one using newCookie().
//If not selected, check whether the cookie already exists using readCookie(). If it does, delete it using eraseCookie().
/*
function rememberMeAfterInitForm(ns) 
{
            
	   // setFocusToFirst(ns, null, null);
		$("#$$COMPONENT_ID_PREFIX$USER_NAME").val(readCookie("USER_NAME"));
		$("#$$COMPONENT_ID_PREFIX$REMEMBER_ME_CHECKBOX_0").prop("checked", readCookie("REMEMBER_ME"));
	    return;
}
*/

/*	
function rememberMeafterSubmit(ns, p_mode, p_scrollToButton, p_id)
 {    
             var name = $("#$$COMPONENT_ID_PREFIX$USER_NAME").val();  //Non t24 user
			 var cookiename = readCookie("USER_NAME");  //Read User name cookie 
		       if (name!=cookiename)
			   { 
			   eraseCookie("USER_NAME");
	           eraseCookie("REMEMBER_ME");
               }
              $("#$$COMPONENT_ID_PREFIX$USER_NAME").val("********");			   
			   return;
}
*/
/*	
Hi.addHook('afterSubmit', rememberMeafterSubmit).addHook('afterInitForm', rememberMeAfterInitForm);
*/

//Add hideErrorMessageWrapper for eC function hideErrorMessage
var oriHideErrorMessageFunc;
var hideErrorMessageWrapper = function() {	
	var argsArray = [].slice.apply(arguments);
	if(typeof oriHideErrorMessageFunc === 'function')
	{					
		setTimeout(function () {oriHideErrorMessageFunc.apply(this,argsArray)}, 90);
	}
}
		
// Register our replacement wrapper function for hideErrorMessage
if(''+window['hideErrorMessage']  !== ''+hideErrorMessageWrapper)  {
		oriHideErrorMessageFunc = window['hideErrorMessage'];
		window['hideErrorMessage'] = hideErrorMessageWrapper;
}
</script>