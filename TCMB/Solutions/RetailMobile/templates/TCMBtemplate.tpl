$%if PRESENTATIONTYPE != Portlet || IS_RUNPREVIEW == "Y"$
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!--
 * $RCSfile: header.tpl,v $
 * $Author: pete $
 * $Revision: 1.34 $
 * $Date: 2013/04/02 17:27:00 $
-->
  <html dir="$$PRESENTATIONTYPE.LAYOUTDIRECTION$" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
    <head>
		<!-- Version number: $$!VERSION$ -->
	  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	  <meta name="HandheldFriendly" content="true" />
	  <meta charset="ISO-8859-1">
      <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
      <meta name="author" content="Edge IPK"/>
	  <link rel="shortcut icon" href="./html/favicon.ico">
	  <title>Banesco Móvil</title>
	  <!--<link href="./html/css/main.css?$$!VERSION$" rel="stylesheet">-->
	  $%IF PHASE == "TakeATour"$<link rel="stylesheet" href="./templates/widgets/carousel/css/idangerous.swiper.css">$%ENDIF$
	  <link rel="stylesheet" id="cssLink">
	  <script src="$$HTML_LOCATION$js/cordova/cordova_loader.js"></script>
	  <script src="$$HTML_LOCATION$js/hookit.min.js"></script>
	  <script type="text/javascript">
		var controlCss;
		var deviceAgent = navigator.userAgent.toLowerCase();
		if(deviceAgent.match(/android/i)){
			controlCss = "./html/css/android.css";
			document.getElementById("cssLink").setAttribute("href", controlCss);
		}
		</script>
	  <script src="./html/js/jquery.min.js"></script>
	  <script type="text/javascript" src="./html/js/main.js"></script>

	   $$HEADCONTENT$ 
	   <link rel='stylesheet' type='text/css' href='./html/css/banesco.css?$$!VERSION$' />
		

	   <script src="$$HTML_LOCATION$js/tcmb.js"></script>
	   <script type="text/javascript">
		function afterAjaxButtonActionService(p_service, p_element, p_innerOrOuter, p_text, p_actionFlag, p_actionData, p_ajaxCaller, p_dElement, ns) {
			if ($("#" + p_element).is(".ECDontRegen"))
				return false;
			return true;
		}

		function beforeSubmit(){
		
			 $%IF PHASE == "FrequentPayments"$   
				$("#C1__C1__FMT_72D14C8ACF50F163203367").css({'height':'61px'});
			 $%ENDIF$
		}
	   </script>
	   <script>
		   if("$$PHASE$" == "Login" || "$$PHASE$" == "SessionTimeOut"  || "$$PHASE$" == 'Offline'){
			   	$(function () {
			   		localStorage.setItem('sessionInitTimestamp', Date.now());
			   	})
		   	}
	   </script>
	   <script>
		   document.addEventListener('deviceready', function () {

		   		function rebootApplication (timeout) {
					document.getElementsByName("WorkingElements[1].SessionLoggedOutDueToInactivity")[0].value = timeout ? "Y" : "N";
					if (timeout) {
						var userID = "$$Login[1].UserID$";
						var sid = "$$LoginDetails[1].SessionID$";
						$("input[id=UID]").val(userID);	
						$("input[id=SessionID]").val(sid);
					}
					document.forms['sessionTimeoutForm'].submit()
				}

		   	    if("$$PHASE$" == 'Login' || "$$PHASE$" == 'SessionTimeOut' || "$$PHASE$" == 'Offline'){
				    /*
				    	Se manejan los eventos pause y resume en la phase de Login para controlar los casos en que la sesion expira
				    	cuando la aplicacion se encuentra en background y evitar que al regresar la aplicacion muestre
				    	la pantalla de sesion expirada.
				    */
					document.addEventListener('pause', function () {
						console.log("pause")
					})
	 
					document.addEventListener('resume', function () {
						console.log("En RESUME")
						// Se controla que el tiempo de sesion efectivamente haya expirado. En ese caso se reinicia la aplicacion
						var sessionInitTimestamp = localStorage.getItem('sessionInitTimestamp');
						console.log('TEMPLATE:: sessionInitTimestamp', sessionInitTimestamp)
						var secondsSinceSessionInit = (Date.now() - sessionInitTimestamp) / 1000;
						console.log('TEMPLATE:: secondsSinceSessionInit', secondsSinceSessionInit);
						debugger;
						if (secondsSinceSessionInit >= $$SessionTimeout$) {
							if("$$PHASE$" == 'Login'  || "$$PHASE$" == 'Offline'){
								console.log("TEMPLATE:: SessionTimeout. Reboot Application")
								rebootApplication(false)
							}else{
								console.log("TEMPLATE:: SessionTimeout. Reboot Application")
								rebootApplication(true)
							}	
						}
					})

				}else{
					localStorage.removeItem('sessionInitTimestamp');
				}
				
		   });
	   </script>
		$%IF !DownloadPDF = 'Y'$	   
		<script src="$$HTML_LOCATION$/js/cordova/PdfHandler.js"></script>
		<script>
		document.addEventListener('deviceready', function () {

			
		//window.onload=function(e){
			//var contextpath=('$$!COMPLETE_CONTEXTPATH$').replace(/&#x2F;/g,'/');
			var contextpath= '$$CONTEXTPATH$';
			$%IF DEVICE_INFO.platform == "Android"$				
				com.temenos.widgets.hybrid.showPDFAndroid.showPDF('$$HTTP_HEADER.Origin$' + contextpath+'/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/octet-stream', '$$!DOC_FILENAME$');				
			$%ENDIF$					
			$%IF DEVICE_INFO.platform == "iOS"$
				cordova.InAppBrowserShare.open(contextpath+'/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/pdf&printPdfFlag=PRINT&filename=/$$!DOC_FILENAME$', '_blank', 'location=yes,enableViewportScale=yes','pdf');
			$%ENDIF$
			$%IF DEVICE_INFO.platform == "windows8" || DEVICE_INFO.platform == "windows"$	
				if ((typeof(window.external) !=='undefined') && (typeof(window.external.notify) !=='undefined')) {
					window.external.notify('OPEN_IN_APP_PDF_NOTIFY'+ contextpath+'/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/octet-stream&');
				} else {
					window.open(contextpath+'/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/octet-stream&', '_blank', 'location=no');
				}
			$%ENDIF$
		//}
	    })
	    $%IF DEVICE_INFO.isHybrid != "Y"$
		$(function () {
			//var contextpath=('$$!COMPLETE_CONTEXTPATH$').replace(/&#x2F;/g,'/');
			var contextpath= '$$CONTEXTPATH$';
			downloadDoc(contextpath);
		})
		$%ENDIF$
	   </script>
		$%ENDIF$
    </head>
    <body $%IF PHASE == "FrequentPayments"$ style="background-color: white"  $%ENDIF$ >
$%endif$
$%if PRESENTATIONTYPE != "Pure HTML" && PRESENTATIONTYPE != "Accessibility Compliant"$
        <!-- UNCOMMENT IFRAME IF USING AUTOCOMPLETE - PROVIDES WORK-AROUND FOR IE6 ISSUE -->
    <!--iframe id="ec_suggest_iframe" style="position:absolute; left:0; top:0px; width:0px; height: 0px; " ></iframe-->
    <form id="$$NAMESPACE$form1" method="post" action="$$ACTIONURL$" onsubmit="return false;">
      <div><input type="hidden" name="MODE"/></div>
      $%if PRESENTATIONTYPE == "Offline"$
      	<div><input type="hidden" name="PAGE" value="$$PAGE$"/></div>
      $%ELSE$
      	<div><input type="hidden" name="$$PAGE_KEY$" value="$$PAGE_VAL$"/></div>
      $%ENDIF$

	  <div><input type="hidden" name="MENUSTATE"/></div>
$%else$
    <form id="$$NAMESPACE$form1" method="post" action="$$ACTIONURL$">
      <div style="display: none;"><input type="text" name="MODE"/></div>
      <div style="display: none;"><input type="text" name="$$PAGE_KEY$" value="$$PAGE_VAL$"/></div>
      <div><input type="hidden" name="MENUSTATE"/></div>
$%endif$

          $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs" || PRESENTATIONTYPE.LAYOUTCONTROL == "HTML DispInlineBlock"$
              <div $%IF PHASE == "AccountsList"$ class="SideMenuContainerFix" $%ENDIF$ $%IF PHASE == "FindATM"$ class="GMapContainerFix" $%ENDIF$ style="width: 100%; padding-top: 0px;">
                      $%IF !VALIDATION_ERROR_COUNT = 1$<div class='errorMessageRed'>1 problem exist in your phase.</div>$%ENDIF$
                      $%IF !VALIDATION_ERROR_COUNT > 1$<div class='errorMessageRed'>$$!VALIDATION_ERROR_COUNT$ problems exist in your phase.</div>$%ENDIF$
          $%else$
              <table cellpadding="0" cellspacing="0" border="0" width="100%" summary="edgeConnect Layout">
                      $%IF !VALIDATION_ERROR_COUNT = 1$<tr><td class='errorMessageRed'>1 problem exist in your phase.</td></tr>$%ENDIF$
                      $%IF !VALIDATION_ERROR_COUNT > 1$<tr><td class='errorMessageRed'>$$!VALIDATION_ERROR_COUNT$ problems exist in your phase.</td></tr>$%ENDIF$
          $%endif$
		$$FORMCONTENT$
		<div id="androidfooterfix"></div>
		    $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs" || PRESENTATIONTYPE.LAYOUTCONTROL == "HTML DispInlineBlock"$
        $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs"$
            <div style="clear:both"></div>
        $%ENDIF$
      </div>
	$%else$
	    </table>
	$%endif$
    </form>


<script>
	jQuery(document).ready(function() {
	$%IF PHASE == "GetLocalStorage"$ document.getElementById('BUT_1CBC621D6A88987541411').click();$%ENDIF$  //Click ON FORWARD BUTTON on GetLocalStorage Initialization page
	$( "input[type='number']" ).attr("pattern", "[0-9\.]*"); //FIX for Keypad on number inputs
	$( "input[type='number']" ).attr("step", "0.01");	//FIX for Keypad on number inputs
	var deviceAgent = navigator.userAgent.toLowerCase();

		$(document)
			$%IF PHASE != "Login"$ $("#androidfooterfix").css("height","60px");$%ENDIF$


	//WHIRLE EFFECT TO ACCOUNT CARDS
  	/*$("div[id*=inner-currentaccount]").each(function( index ) {
  	    index++;
  	    var $this = $( this );
  		setTimeout(function (){$this.addClass('whirleactive');}, index * 350);
	});*/
	//END OF WHIRLE EFFECT TO ACCOUNT CARDS
	$(".resetPdfFlag").trigger("click");

	if(IOS){
		$("body").addClass("ios");
	}else if(ANDROID){
		$("body").addClass("android");
	}
	
	
  });
</script>
<script>
	$%COMMENT$ This is hook that is called befora an AJAX call is performed. $%ENDCOMMENT$		
	function beforeAjaxPOSTRequest(url, async, parameters, ns, ajaxCaller, req) {
		showProgress();
		return true;
	}
	$%COMMENT$ This is hook that is called after making an AJAX call. Note that this hooks gets invoked multiple times, hence the logic for req.readyState $%ENDCOMMENT$
	function afterAjaxPOSTRequest(async, req, ajaxCaller, ns, uid) {
		if (async)
		{
			if (req.readyState == 4) 
			{ 
				closeProgress();
			}
		}
		else
		{
			closeProgress(); 
		}			
		return true;
	}
	
	$%COMMENT$ This is hook that is called before processing a form submit. $%ENDCOMMENT$
	function beforeSubmit () {
		showProgress();
	};
	$%COMMENT$ This is hook that is called when a new page is displayed. $%ENDCOMMENT$
	function afterInitForm(ns) {
		//If you have decided to comment out the call to hideSplashScreen() in index-hybrid.html,
		//this would be a good place to hide the splashscrreen by uncommenting the line below
		//document.addEventListener("deviceready", hideSplashScreen, false);
		document.addEventListener("deviceready", closeProgress, false);		
		if (isWindowExternalNotifyDefined()) {
            closeProgress();
        }           		
	};
	
    $%COMMENT$ 
            Shows the progress dialog for hybrid
            Call with a "message" parameter only if you want to display a custom message in the progress dialog. You can choose to display the default message or to show no message at all. 
        $%ENDCOMMENT$
        function showProgress(message) {
            //if (navigator.spinnerDialog) {
            if ((typeof(navigator) !=='undefined') && (typeof(navigator.spinnerDialog) !=='undefined')) {            
                if (message) {
                    navigator.spinnerDialog.show(true, message);
                } else {
                    $%COMMENT$ 
                        Call navigator.spinnerDialog.show(true)  if you want to show also a message in the progress dialog. The message is configured in the hybrid message editor, under the key loading_wait 
                        Call navigator.spinnerDialog.show(false) if you don't want to show any message in the progress dialog
                    $%ENDCOMMENT$
                    navigator.spinnerDialog.show(false, null);
                }
            } else 
            {
            	if (isWindowExternalNotifyDefined()) {
                    window.external.notify("UNIVERSAL_APPS_SHOW_PROGRESS_NOTIFY"+JSON.stringify({"showMessage":false, "message":message}));
                } else {
                    console.log("no navigator.spinnerDialog");
                }
            }
        };
        
        $%COMMENT$ 
            Closes the progess dialog for hybrid 
        $%ENDCOMMENT$
        function closeProgress() {
            //if (navigator.spinnerDialog) {
            if ((typeof(navigator) !=='undefined') && (typeof(navigator.spinnerDialog) !=='undefined')) {            
                navigator.spinnerDialog.hide();
            } else 
            {
            	if (isWindowExternalNotifyDefined()) {
                    window.external.notify("UNIVERSAL_APPS_CLOSE_PROGRESS_NOTIFY");
                } else {
                    console.log("no navigator.spinnerDialog");
                }
            }
        };      
  </script>
$%if PRESENTATIONTYPE != Portlet || IS_RUNPREVIEW == "Y"$
<form name="sessionTimeoutForm" method=POST action="servletcontroller" autocomplete="off">
	<input type="hidden" name="PRODUCT" value="">
	<input type="hidden" name="PRESENTATION_TYPE" value="">
	<input type="hidden" name="MODE" value="XX">
	<input type="hidden" id="session_token" name="Session[1].Session_Token">
	<input type="hidden" name="WorkingElements[1].SessionLoggedOutDueToInactivity" value="Y"/>
</form>


  </body>
</html>
$%endif$
