<script type="text/javascript">	
	var frecuentPaymentsScriptsExecuted = false;


function postProcessResponses(a,event,c){
 
 	 $(".radioButtonWrapper").find("input[type='radio']").each(function(a,el){		 
		console.log("11");
		if(el.value.split('*')[1] && Number(el.value.split('*')[1]) <= 0){
			el.disabled = true;
			$(el).addClass("disabled");
		}
	})
 
 

	if(frecuentPaymentsScriptsExecuted && !(event == 'ajaxQLR' || event == 'ajaxHiddens') ){
		window.closeProgress();
		return true;
	} 
	frecuentPaymentsScriptsExecuted = true;



 
	function processCheckboxWidget() {
		
		 //var $this = $('#'+elementId);
 		 $("input[type='checkbox']").each(function(index ){
 			//var $checkbox = $this.find("input[type='checkbox']");
 			var $checkbox = $(this);           
			$checkbox.addClass('banesco_checkbox')
			var $label = $('<label for="' + $checkbox.attr('id') + '"></label>');
			$checkbox.parent().append($label)
			$checkbox.off('click');
			$checkbox.on('click', function () {
				$checkbox.toggleClass('active', $checkbox.is(':checked'))
			})	 

			var ancho = $('body').width() - 35;

	  		$('.totalCard').find('label').css({"position": "absolute", "left": "2px", "padding-left": ancho, "top": "8px", "padding-bottom": "25px"});

    		$('.banesco_checkbox + label').css({"position": "absolute", "top": "27px", "right": "18px" });	 

 		})
	}


	function processAmmountImputs(){
		
		$("input.amount-input").each(function(index){
			var elId = $(this).attr('id');
			$(this).after("<span id='"+elId+"_Helper' style='display:none;height:0;opacity:0;'></span>")
			handleNumberInput(this,'Y', 'Y', "")
		}) 
	} 


	function handleNumberInput(element,DecimalsNotAllowed, CurrencyFormat, MAX_LENGTH) {
	   
	    var $inputNumber = $(element);
	    var elementId = $inputNumber.attr('id');

	    $inputNumber.off("keydown");
	    $inputNumber.on("keydown", filterInput);
	    var isDroid = navigator.userAgent.match(/Android/);
	    if (isDroid) {
	        $inputNumber.attr("type", "tel");
	    } else {
	        $inputNumber.attr("type", "number");
	    }
	    $inputNumber.attr("pattern", "\\d*")

	    function filterInput(event) {
	    	
	        var keyCode = ('which' in event) ? event.which : event.keyCode;
	        var targetInput = event.target;
	        var targetInputValue = targetInput.value;

	        var isNotWanted = keyCode == 69 ||
	            keyCode == 107 ||
	            keyCode == 109 ||
	            keyCode == 189 ||
	            keyCode == 187 ||
	            keyCode == 38 ||
	            keyCode == 40;


	            if(DecimalsNotAllowed == 'Y'){
	                isNotWanted == isNotWanted || ((keyCode == 190 || keyCode == 110 || keyCode == 229))
	            }
	            

	        if (isNotWanted) {
	            event.stopPropagation()
	            event.preventDefault();
	        }

	        return !isNotWanted
	    }


	    function handlePaste(e) {
	        var clipboardData, pastedData;

	        clipboardData = e.clipboardData || window.clipboardData;
	        pastedData = clipboardData.getData('Text').toUpperCase();

	        if (pastedData.indexOf('E') > -1) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    };


	   

	    if(CurrencyFormat == 'Y'){
	        $inputNumber.attr("placeholder", "0.00");
	        $inputNumber.css({
	            color: 'transparent',
	            textShadow: '0 0 0 #708090'
	        })
	    }
	        
	    

	    var $inputHelper = $('#'+elementId+'_Helper');
	    $inputNumber.off("input");
	    $inputNumber.on("input", function (e) {
	        var previousValue = $inputHelper.html();
	        var currentValue = $inputNumber.val();
	        var lastCharInserted;
	        var currentValueString = currentValue.trim().split(".").join("");
	        var previousValueString = previousValue.trim().split(".").join("");

	        var currentValueStringChars = currentValueString.split('');
	        var previousValueStringChars = previousValueString.split('');

	        if (previousValueString.length < currentValueString.length) {
	            for (var i=0; i < currentValueStringChars.length; i++) {
	                if (!previousValueStringChars[i] || currentValueStringChars[i] != previousValueStringChars[i]) {
	                    lastCharInserted = currentValueStringChars[i]
	                    break;
	                }
	            }

	            currentValueString = previousValueString + lastCharInserted
	        } else {
	            $inputHelper.html('')
	        }
	        
	         if(CurrencyFormat == 'Y'){

	            var currentValueNumber = parseInt(currentValueString);
	            var numberToShow = (parseFloat(currentValueNumber / 100)).toFixed(2);
	            
	            if (currentValueString.length - 2 < 14) { 
	                if (!isNaN(numberToShow)) {
	                    $inputNumber.val(numberToShow);
	                    $inputHelper.html($inputNumber.val())
	                } else {
	                    $inputNumber.val(currentValue.substring(0, currentValue.length - 1));   
	                    $inputHelper.html($inputNumber.val())
	                }
	            } else {
	                if (!isNaN(numberToShow)) {
	                    $inputNumber.val($inputHelper.html())
	                    $inputHelper.html($inputNumber.val())
	                } 
	            }
	        }else{
	            if (!isNaN(Number(currentValueString))) {
	                $inputNumber.val(currentValueString);
	                $inputHelper.html($inputNumber.val())
	            } else {
	                $inputNumber.val(currentValueString.substring(0, currentValueString.length - 1));
	                $inputHelper.html($inputNumber.val())
	            }
	            if (MAX_LENGTH !== "" && $inputNumber.val().length > Number(MAX_LENGTH)) {
	                $inputNumber.val($inputNumber.val().substring(0, $inputNumber.val().length -1));
	                $inputHelper.html($inputNumber.val())
	            }
	       }
	    })	        
	}

  
	 
	processAmmountImputs();
	processCheckboxWidget();
	window.closeProgress();
	return true; 
}

postProcessResponses();
//if (Hi !== 'undefined')  {
 // Hi.addHook('postProcessResponses',runFrecuentPaymentsScripts)
//}
</script>