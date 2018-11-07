// Java script variable to keep track of currently loaded/clicked menu
var currentlyLoadingEntry = '';

/* Handler created for call back from History plugin. */
onBack_ForwardButtonClick = function (hash){
	
	if(currentlyLoadingEntry != hash){
		// User has come back to first page after continuously clicking back.
		if (hash ==''){
			if(confirm(logoutPopupText)){
				/*Se invoca la URL para cerrar la sesion con el banco*/
				var urlLogout = "<%=request.getContextPath()%>/pages/jsp-ns/olb/SafeExit?"+getCstParam();
				$.ajax({
					url : urlLogout,
					success : function(data) {
						
						}
				});
				
				var url='<%=request.getContextPath()%>';
				setTimeout(function(){
					//Log user out of application
					window.ifrm.location.replace(logoutUrl);
						},1000);
			} else {
				currentlyLoadingEntry = '1';
				history.forward();
				currentlyLoadingEntry = startingPage;
				history.forward();
			}
		} // User come back to first page after continuously clicking back.
		else if (hash == '1'){
			
			//history.back();// get back to hash value '';
			currentlyLoadingEntry = hash;
		} else {
			//Check if namespace is available or not.
			if(ifrm.ns){
				// This history entry is added by ourselves, 
				// thus perform necessary operation of showing that menu.
				ifrm.ns.shortcut.goToMenu(hash);
			}
			currentlyLoadingEntry = hash;
		}
	} else {
		currentlyLoadingEntry = hash;
	}
};

/*
 * Initialize History Plugin and make sure that isPageUnloadHandled flag is set to false,
 * when a button or link is clicked.
 */ 
$(document).ready(function() {
	// Initialize history plugin and use it to set value into browser history 
	$.history.init(onBack_ForwardButtonClick);
	if(startingPage == ''){
		currentlyLoadingEntry = '1';
		$.history.load('1');
		//This call is added due IE8 bug - Anchor tag target is shown in title bar.
		changeWindowTitle();
	}
});

/*
 * This function will add history entry into browser history with the help of
 * jquery history plugin.
 */
addHistoryEntry = function (entry){
	currentlyLoadingEntry = entry;
	
	// Save starting / first page after login
	if(startingPage == ''){
		startingPage = entry;
		setStartingPageInSession(entry);
	}
	$.history.load(entry);
};


/*
 * This function will call JSP which sets startPage in session.
 */
setStartingPageInSession = function (entry){
	$.get('/cb/pages/jsp/common/start-page-session-setting.jsp', {startPage : entry});	
};

/*
 * This function will change title of the window, when any menu is clicked.
 * This is done to make it easy for the user to understand, which menu he/she is currently on,
 * and which menu he will be going if he/she clicks back or forward button. 
 */
changeWindowTitle = function(menuName){
	if(menuName){
		document.title = windowTitle + ' - ' + menuName;
	} else {
		document.title = windowTitle;
	}
};