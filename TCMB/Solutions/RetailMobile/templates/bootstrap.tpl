$%if COMPONENT_ID_PREFIX != ""$
    $$FORMCONTENT$ 
$%else$
$%if PRESENTATIONTYPE != Portlet || IS_RUNPREVIEW == "Y"$
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!--
 * $RCSfile$
 * $Author$
 * $Revision$
 * $Date$
-->
  <html dir="$$PRESENTATIONTYPE.LAYOUTDIRECTION$" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" >
    <head>
		<!-- Version number: $$PROCESSVERSION$ -->
      <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <meta name="author" content="Edge IPK"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />   <!--   IE compatable fix-->
      <title>Temenos Connect Retail IB $$PRESENTATIONTYPE$ $%IF !VALIDATION_ERROR_COUNT > 0$ - $$!VALIDATION_ERROR_COUNT$ problems exist in your phase.$%ENDIF$</title>
      
	  <link rel="stylesheet" href="html/bootstrap3/css/bootstrap.css" media="screen">
	  <link rel="stylesheet" href="html/css/responsive_fixes.css" media="screen">

	  <!-- link rel="stylesheet" type="text/css" href="$$HTML_LOCATION$/css/print.css" media="print"/ -->
          
        <!-- html5 & media-queries(fallback) for IE8 and IE7 -->
        <!--[if lt IE 9]> 
            <script src="html/bootstrap3/js/html5shiv.js"></script>
            <script src="html/bootstrap3/js/respond.min.js"></script>     
        <![endif]-->

      <script src="html/bootstrap3/js/jquery.min.js"></script>
	  <script src="html/bootstrap3/js/bootstrap.min.js"></script>
	 
	  <!--link href="html/bootstrap3/css/bootstrap-responsive.min.css" rel="stylesheet"-->
      <noscript>
		<p class="errorMessageRed">
		JavaScript must be enabled in order for you to use Temenos Connect Internet Banking. enable JavaScript by changing your browser options, then
		<a href='' class="errorMessageRedBold">try again</a>
		.
		</p>
		</noscript> 

	  <script type="text/javascript">

		function handleNewProdClick(obj, targetLinkID){  			
			$("#"+targetLinkID).click();			
		}
	
	</script>
		
                $$HEADCONTENT$
	<link rel="stylesheet" href="html/css/bootstrapResponsiveDefault.css" media="screen">
    </head>
    <body style="margin:0px;" class="BrowserWindow">
$%endif$

<!-- Start Changes for the download functionality -->
<script type="text/javascript">
			// Additions by NGA to cope with document viewing
				
			function afterInitForm(p_namespace) 
			{	
				setFocusToFirst(p_namespace, null, null);
				$%IF !TemplateCMD = downloadDoc$
					// open a new pop-up Browser window to display the file contents
					window.setTimeout('downloadDoc();', 0);
			
				$%endif$
				//Handling the print functionality
				$%IF !TemplateCMD = printDoc$ 
					window.setTimeout('printDoc();', 0);
				$%endif$
			}
			
			
			function unescapeString(str) {
				// converts and HTML-encoded piece of text into its plain-text equivelent
				var div = document.createElement('div');
				div.innerHTML = str;
				return div.firstChild.data;
			}
			
			function downloadDoc()
		    {
		    	
		    		// ensure connect Data Store value is converted into the correct URL-encoded representation
					urlDownloadReqID = escape(unescapeString("$$Documents[1].Download[1].DownloadReqID$"));
					// and finally form them into the URL parameter string we need to use
					strURLParams = "?DownloadRef=" + urlDownloadReqID + "&Namespace=$$NAMESPACE$";
					//alert("strURLParams: "+strURLParams);
					//strURLParams = "?DownloadRef=" + "&Namespace=$$NAMESPACE$";
					
					try
					{							openWindow=window.open('$$CONTEXTPATH$/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/octet-stream&defaultDownloadFilename=$$Documents[1].Download[1].DownloadReqID$','RafPrintWin','toolbar=0,location=0,left=100,top=100,width=800,height=800'); 

						openWindow.focus(); 
						

						
										} 
					catch (e){
					alert("Either popup blocker is enabled or file cannot be downloaded for viewing at this moment."); 
					}
		    } 


			
			
			function printDoc()
		    {
					// ensure connect Data Store value is converted into the correct URL-encoded representation
					urlDownloadReqID = escape(unescapeString("$$Documents[1].Download[1].DownloadReqID$"));
					// and finally form them into the URL parameter string we need to use
					strURLParams = "?DownloadRef=" + urlDownloadReqID + "&Namespace=$$NAMESPACE$";
					//alert("strURLParams: "+strURLParams);
					//strURLParams = "?DownloadRef=" + "&Namespace=$$NAMESPACE$";
					urlSesssionID = escape(unescapeString("$$SESSION_ID$"));
					//DOC_FILEPATH = urlSesssionID+"/printDocuments/"+urlDownloadReqID;
					
					try
					{	
					//openWindow=window.open('$$CONTEXTPATH$/$$SESSION_ID$/printDocuments/$$Documents[1].Download[1].DownloadReqID$');
						
					openWindow=window.open('$$CONTEXTPATH$/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=&defaultDownloadFilename=$$Documents[1].Download[1].DownloadReqID$&printPdfFlag=PRINT','','toolbar=0,location=0,left=100,top=100,width=800,height=800'); 
						
						openWindow.focus();
						//openWindow.print();
						//openWindow.setTimeout(function() {
						//openWindow.print(); },1000);						
					}
					catch (e){
						alert("Either popup blocker is enabled or file cannot be downloaded for viewing at this moment."); 
					}
		    }



			function handleNewProdClick(obj, targetLinkID){
			
			$("#"+targetLinkID).click();
		}
				
			</script>

<!-- End Changes for the download functionality -->

$%if PRESENTATIONTYPE != "Pure HTML" && PRESENTATIONTYPE != "Accessibility Compliant"$
        <!-- UNCOMMENT IFRAME IF USING AUTOCOMPLETE - PROVIDES WORK-AROUND FOR IE6 ISSUE -->
    <!--iframe id="ec_suggest_iframe" style="position:absolute; left:0; top:0px; width:0px; height: 0px; " ></iframe-->
    <form id="$$NAMESPACE$form1" method="post" action="$$ACTIONURL$" autocomplete="off" >
      <div><input type="hidden" name="MODE"/></div>
      $%if PRESENTATIONTYPE == "Offline"$
      	<div><input type="hidden" name="PAGE" value="$$PAGE$"/></div>
      $%ELSE$
      	<div><input type="hidden" name="$$PAGE_KEY$" value="$$PAGE_VAL$"/></div>
      $%ENDIF$
      <div><input type="hidden" name="MENUSTATE"/></div>
$%else$
    <form id="$$NAMESPACE$form1" method="post" action="$$ACTIONURL$" autocomplete="off">
      <div style="display: none;"><input type="text" name="MODE"/></div>
      <div style="display: none;"><input type="text" name="$$PAGE_KEY$" value="$$PAGE_VAL$"/></div>
      <div style="display: none;"><input type="text" name="MENUSTATE"/></div>
      <div><input type="hidden" name="WorkingElements[1].Navigation[1].NextPhase"/></div>
$%endif$
	$%if IN_POPUP != "Y"$ <!-- don't show the branding in a popup -->
	<!--<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
			<button class="btn btn-navbar" data-target=".nav-collapse" data-toggle="collapse" type="button">
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			</button>
			<a class="brand" href="./index.html">Model Bank</a>
			<div class="nav-collapse collapse">
			</div>
		</div>
	</div>
	-->
	
	$%endif$
      <!-- To center the contents of your form, set style="text-align:center;" on the form tag (works in IE), 
          and style="margin-left:auto; margin-right:auto;" on the following table (works in Mozilla) -->
          $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs" || PRESENTATIONTYPE.LAYOUTCONTROL == "HTML DispInlineBlock"$
              <div style="width: 100%">
                      $%IF !VALIDATION_ERROR_COUNT = 1$<div class='errorMessageRed'>1 problem exist in your phase.</div>$%ENDIF$
                      $%IF !VALIDATION_ERROR_COUNT > 1$<div class='errorMessageRed'>$$!VALIDATION_ERROR_COUNT$ problems exist in your phase.</div>$%ENDIF$
          $%else$
              <table cellpadding="0" cellspacing="0" border="0" width="100%" summary="edgeConnect Layout">
                      $%IF !VALIDATION_ERROR_COUNT = 1$<tr><td class='errorMessageRed'>1 problem exist in your phase.</td></tr>$%ENDIF$
                      $%IF !VALIDATION_ERROR_COUNT > 1$<tr><td class='errorMessageRed'>$$!VALIDATION_ERROR_COUNT$ problems exist in your phase.</td></tr>$%ENDIF$
          $%endif$
             $$FORMCONTENT$
          $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs" || PRESENTATIONTYPE.LAYOUTCONTROL == "HTML DispInlineBlock"$
                $%IF PRESENTATIONTYPE.LAYOUTCONTROL == "HTML Divs"$
                    <div style="clear:both"></div>
                $%ENDIF$
              </div>
          $%else$
              </table>
          $%endif$     
    </form>
    <script type="text/javascript">
	
		$("div.column .button1").click(function() {
			
		handleNewProdClick(this, "BUT_PAYABILL");
		
		});

		$("div.column .button2").click(function() {
			
		handleNewProdClick(this, "BUT_MOVEMONEY");
		
		});
		
		$("div.column .button3").click(function() {
			
		handleNewProdClick(this, "BUT_SENDMONEY");
		
		});
		
		$("div.column .button4").click(function() {
			
		handleNewProdClick(this, "BUT_PREFERENCES");
		
		});
		
		$("div.column .button5").click(function() {
			
		handleNewProdClick(this, "BUT_PERSONALDETAILS");
		
		});
		$("div.column .button6").click(function() {
			
		handleNewProdClick(this, "BUT_HELP");
		
		});
		$("div.column .button7").click(function() {
			
		handleNewProdClick(this, "BUT_MYMESSAGES");
		
		});
		
		
		function closeDialogAjax(p_itemId, p_groupname)
		{
			hiddenButtonId = p_itemId + "_hiddenButton";
			handleNewProdClick(this, hiddenButtonId);
		}
		
		
	
	</script>

	<script> 
	$(function(){
		$(".autocompleteOff").attr("autocomplete","off");});
		
	</script> 

$%if PRESENTATIONTYPE != Portlet || IS_RUNPREVIEW == "Y"$
<form name="sessionTimeoutForm" method=POST action="servletcontroller" autocomplete="off">
			<input type="hidden" name="PRODUCT" value="">
			<input type="hidden" name="PRESENTATION_TYPE" value="">
			<input type="hidden" name="MODE" value="XX">
			<input type="hidden" name="WorkingElements[1].SessionLoggedOutDueToInactivity" value="Y"/>
		</form>

  </body>
</html>
$%endif$
$%endif$
