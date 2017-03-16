/*
 * $RCSfile: connect_hybrid.js,v $
 * $Author: aheath $
 * $Revision: 1.8 $
 * $Date: 2015/12/11 16:15:09 $
 */

/** Places the device info retrieved from cordova.device on the request.
  * This can only be called on deviceready when the device information is available. */
function fetchDeviceInfo(p_formName)
{
	//console.log("in fetchDeviceInfo");
	var form = document.forms[p_formName];
	if (form != null && form.DEVICE_INFO != null && device != null) {
		var deviceInfo = '{';
		deviceInfo += '"model":"' + device.model + '",';
		deviceInfo += '"platform":"' + device.platform + '",';
		deviceInfo += '"version":"' + device.version + '",';
		deviceInfo += '"cordova":"' + device.cordova + '",';
		deviceInfo += '"uuid":"' + device.uuid + '",';
		deviceInfo += '"isHybrid":"Y",';
		deviceInfo += '"usePushNotifications":"' + localStorage.getItem("USE_PUSH_NOTIFICATIONS") + '"';
		deviceInfo += '}';
		form.DEVICE_INFO.value = deviceInfo;
	}
}
//notifies windows universal apps for calculating the device info (no cordova for universal apps)
function notifyUniversalAppsForDeviceInfo() {
	if ((typeof(window.external) !=='undefined') && (typeof(window.external.notify) !=='undefined')) {
		window.external.notify("UNIVERSAL_APPS_DEVICE_INFO_NOTIFY");
	}
}
//Invoked from native for universal apps
function setWindowsUniversalAppsDeviceInfo(deviceInfoJsonString) {
	var deviceInfoObj;
    try {
        //this is for device info on plaftorms that do not support Cordova, such as Windows Universal Apps
         //var nonCordovaDeviceInfo = JSON.parse('{"firstname":"Jesper","surname":"Aaberg","phone":["555-0100","555-0120"]}');
        deviceInfoObj = JSON.parse(deviceInfoJsonString);
        if ((deviceInfoObj.model === 'undefined')) 
        {
            if (!(typeof window.clientInformation.platform  === 'undefined')){
                deviceInfoObj.model = window.clientInformation.platform;    
            }
        }
        if ((typeof deviceInfoObj.platform === 'undefined')) {
            if (!(typeof window.clientInformation.userAgent  === 'undefined')){
                var userAgent = window.clientInformation.userAgent;
                var devicePlatform = userAgent.indexOf("MSAppHost/1.0") == -1 ? "windows" : "windows8";
                deviceInfoObj.platform = devicePlatform;
            }
        }
        window.device = deviceInfoObj;
        setDeviceInfoInForm(JSON.stringify(deviceInfoObj));
    } catch (err3) {
    	console.log("Error setting windows universal apps device info: " + err3.message );
    	setDeviceInfoInForm(deviceInfoObj?JSON.stringify(deviceInfoObj):deviceInfoJsonString);
    }
	
}
//Intercepts the call to ecDoSubmit and passes in a modified "mode" arg 
function wrapCallToEcDoSubmit(overridenMode) 
{
	var originalEcDoSubmit = ecDoSubmit;
	ecDoSubmit = function () 
	{
		arguments[1] = overridenMode;
		originalEcDoSubmit.apply(this, arguments);
	};
}

//Put here any javascript variables that are needed for hybrid. This method is called
//by the hybrid shell after the page is loaded, for each page 
function getVarsForHybrid () {
	var varsForHybrid = {};
	var currentTheme = '';
	if (typeof(window.CURRENT_THEME) !== 'undefined' && window.CURRENT_THEME) {
		currentTheme = window.CURRENT_THEME;
	}
	varsForHybrid.currentTheme = currentTheme;
	return JSON.stringify(varsForHybrid);
}
