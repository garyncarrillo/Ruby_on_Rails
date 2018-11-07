// Constant required to determine, whether to show Navigation away check message or not.
var isPageUnloadHandled = true;
	
/* Function written for showing message to user, when it navigates away from application */
window.onbeforeunload = function(){
	if(isPageUnloadHandled){
		//Check if current browser is Firefox mozilla and version is greater than or equal to 4
		if ( /Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4 ){
			//Show message to the user
			$('#sessionNotificationMsgDiv').html(logoutPopupText);
			$('#sessionNotificationMsgDiv').show();
			$('#sessionNotificationMsgDiv').delay(1500).fadeOut();
		}
		return logoutPopupText;
	}
};

/* 
 * This function will force current user log out of the application,
 * if he is navigating away from application 
 */
window.onunload = function(){
	if(isPageUnloadHandled){
		/*Se invoca la URL para cerrar la sesion con el banco*/
		var urlLogout = '/cb/pages/jsp-ns/olb/SafeExit?'+getCstParam();
		$.ajax({
			url : urlLogout,
			success : function(data) {
				
				}
		});
		
		// Logout user from the application using AJAX request.
		$.ajax({
			url: logoutUrl,
			type: 'POST',
			async: false,
			cache: false,
			dataType: 'HTML'
		});
	}
		
};

function hideSessionNotificationDialog(){
	$('#sessionNotificationMsgDiv').dialog('close');
}


/*
 * Function to set flag 'isPageUnloadHandled' to false to indicate no message to be shown from
 * onbeforeunload function.
 */ 
function setPageUnloadHandledFlag(){
	isPageUnloadHandled = false;
};

/*
 * Function to re-set flag 'isPageUnloadHandled' to true to avoid message to be shown from
 * onbeforeunload function.
 */ 
function resetPageUnloadHandledFlag(){
	isPageUnloadHandled = true;
};