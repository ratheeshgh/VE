window.com = window.com || {};
window.com.temenos = window.com.temenos || {};
window.com.temenos.widgets = window.com.temenos.widgets || {};
window.com.temenos.widgets.hybrid = window.com.temenos.widgets.hybrid || {};

window.com.temenos.widgets.hybrid.showPDFAndroid = (function () {

	var showPDFAndroid = {};

	showPDFAndroid.showPDF = function (url, fileName) {

		var debug_mode = false;

		var progressIndicatorEnabled = true;
		//TODO: should move showProgress and hideProgress in connect_hybrid.js
		// progressIndicatorEnabled = progressIndicatorEnabled && (typeof showProgress === "function") && (typeof closeProgress === "function");

		if (!fileName) {
			var parts = url.split('/');
			fileName = parts.pop() ? parts.pop() : 'report.pdf';
		}

		if (progressIndicatorEnabled) {
			navigator.spinnerDialog.show(false, null);
		}

		window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (fs) {

			// logDebugMessage('file system open: ' + fs.name);
			fs.getDirectory('Download', {
				create: true,
				exclusive: false
			}, function (directory) {
				directory.getFile(fileName, {
					create: true,
					exclusive: false
				}, function (fileEntry) {
					downloadFile(fileEntry, url);
				}, onFileTranferError);
			}, onFileTranferError);
		}, onFileTranferError);

		var downloadFile = function (fileEntry, uri) {
			var fileTransfer = new FileTransfer();
			var fileURL = fileEntry.toURL();

			fileTransfer.download(
				uri,
				fileURL,
				function (entry) {
				logDebugMessage('file transfer complete: ' + entry.toURL());
				navigator.notification.alert('Your file has been stored in the Download folder', null, 'Download Success', 'Done');
				openPDFViewer(entry);
				if (progressIndicatorEnabled) {
					navigator.spinnerDialog.hide();
				}
			},
				onFileTranferError,
				null, // or, pass false
			{
				//headers: {
				//    'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
				//}
			});
		};

		var openPDFViewer = function (fileEntry) {
			var url = fileEntry.toURL();

			var onError = function (error) {
				console.log(error);
			};

			var mimeType = 'application/pdf';
			cordova.plugins.fileOpener2.open(url, mimeType, {
				error: function (e) {
					console.log(e);
				},
				success: function () {}
			});
			// cordova.plugins.temenos.OpenFileInExternalViewer.viewDocument(url, mimeType, onError);
		};

		var onFileTranferError = function (error) {
			navigator.spinnerDialog.hide();
			navigator.notification.alert('Sorry something went wrong', null, 'Download Failed', 'Done');
			console.log('download error source ' + error.source);
			console.log('download error target ' + error.target);
			console.log('download error code' + error.code);
		};

		var logDebugMessage = function (message) {
			if (debug_mode) {
				console.log(message);
			}
		};
	};

	return showPDFAndroid;
})();
function downloadDoc(contextpath){
	document.getElementById('pdf_download').src = contextpath+'/ServerFileRetrievalServlet?serverFilePathSessionAttrName=DOC_FILEPATH&contentType=application/octet-stream';
}