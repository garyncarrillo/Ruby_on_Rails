/**
 * The MessageCenter methods to Load and Reload.
 */

/**
 * Initialize the files to application a Message Center.
 */
function setup(){
	$.struts2_jquery.require("i18n/grid.locale-" +	$.struts2_jquery.gridLocal + ".js",
					function() {
						$.jgrid.no_legacy_api = true;
						$.jgrid.useJSON = true;
							}, '/cb/struts/');
	$.struts2_jquery.require("js/plugins/jquery.jqGrid.js",'','/cb/struts/');
	$.struts2_jquery.require("js/plugins/grid.inlinedit.js",'','/cb/struts/');
	$.struts2_jquery.require("js/plugins/grid.celledit.js",'','/cb/struts/');
	$.struts2_jquery.requireCss("themes/ui.jqgrid.css",'/cb/struts/');
	$.extend($.jgrid.defaults, { 
		altRows: true,
		altclass: 'ui-state-zebra',
		autowidth: true,
		gridview: true,
		loadui: 'disable'			
	});
	
	loadDeposits('setup');
}

/**
 * Load the landing page
 * @param from Is to difference if the invocation is from setup method or Landing page
 * 
 */
function loadDeposits(from){
	var urlString = context+"/pages/jsp-ns/olb/InitAccountSummary?redirect=ALLACCOUNTS_HOME&type=ALLACCOUNTS_HOME&"+getCstParam();
	$('#menusecond').html('');
	if (from === 'setup') {
			ajaxRequestNonCache(urlString, null);
	} else {
		urlString = context+"/pages/jsp-ns/olb/InitAccountSummary?type=ALLACCOUNTS_HOME&type=ALLACCOUNTS_HOME";
		ajaxRequestNonCacheForHome(urlString, null);
	}
	
}

function ajaxRequestNonCacheForHome(url,OnSuccessCallback){
	var url1 = "/cb/pages/jsp/security/invokeSecondPass.jsp?urlreturn=";
	var urlreturn = "";
	var menu = "HOME";
	var submenu = "HOME";
	var wizard = "N";

	urlreturn = url+"&menu="+menu+"&sub="+submenu+"&wizard="+wizard;
	url = url1+urlreturn;
	renderInContainer(url,"#notes",undefined,false,OnSuccessCallback,undefined,undefined,true);
}

/**
 * Load the URLs and flags defined in System Properties and put it in session.
 */
function loadMessageCenterURLInit(){
	var urlBolp=context+"/pages/jsp/messagecenter/MessageCenterLoadConfigurationCIC.action?"+getCstParam();
	executeAjaxRequest(urlBolp,"",true,function(data) {
			var flagGlobalActivate = data.flagGlobalActivate;
			if(flagGlobalActivate==='Y'){
				loadMessageCenterLanding();
				//loadMessageCenterMenu();
				$('#isForceAuthenticated').val(true);
			}
		},function () {
			console.log('No se presenta centro de mensajes');
		},null,true);
}

/**
 * Load the MessageCenter for Landing in index.jsp
 * This method control the flag to enable MessageCenter and Reload in the MessageCenterLandingIndex.jsp
 */
function loadMessageCenterLanding() {
	var urlBolp=context+"/pages/jsp/messagecenter/MessageCenterLanding.jsp?"+getCstParam();
	executeAjaxRequest(urlBolp,"",true,function(data) {
			$('#messageCenterLandingBox').html(data);	
		},null,null,true);
}

/**
 * Load the MessageCenter Small In the Menu
 * This method control the flag to enable MessageCenter and Reload in the MessageCenterMenu.jsp
 */
function loadMessageCenterMenu(){
	var urlBolp=context+"/pages/jsp/messagecenter/MessageCenterMenu.jsp?"+getCstParam();
	executeAjaxRequest(urlBolp,"",true,function(data) {
			$('#isCM_CIC_Menu_loaded').val(true);
			$('#messajeCenterMenu').html(data);
		},null,null,true);
}

/**
 * Load the Message Center NumMessage
 * @param from Is to difference if the invocation is from setup method or Landing page
 * 
 */
function loadMessageCenterNumMessage(){
	var urlBolp=context+"/pages/jsp/messagecenter/MessageCenterNumMessage.jsp?"+getCstParam();
	$.ajax({
		url : urlBolp,
		success : function(data) {
		$('#numregiframe').html(data);
		}
	});
}
/**
 * Set the value return from FORCE
 * @param value Is the value to show in red div over small CM
 * 
 */
function setNumMessages(value){
	if(value>=0){
		$("#numMessages").css("display","block");
		$("#bgNumMessages").css("display","block");
		$("#numMessages").text(value);
	}
}
/**
 * Load the URLS To invoke the Main Message Center
 * 
 */
function loadMessageCenterURL(params){
	redirectToMessageCenter();
}
/**
 * Load the Main Message Center
 * @param params the parameters to send post
 * 
 */
function loadMessageCenter(params){				
	var urlBolp=context+"/pages/jsp/messagecenter/MessageCenter.jsp";
	if($('#isForceAuthenticated').val()=='true'){
		if(params==''){
			params='lookcss=new';
		}
		urlBolp=context+"/pages/jsp/messagecenter/MessageCenterReload.jsp?"+params+'&'+getCstParam();
	}
	ajaxRequest(urlBolp);
}

/**
 * Scratch message with length more than 25
 * @param cellvalue value of cell
  * 
 */
function scratchMessage(cellvalue) {
	var ret;
	if(cellvalue.length>25){
		ret = '';
		var displayMessage = cellvalue.substring(0,22);
		ret = displayMessage+"...";
	}else{
		ret = cellvalue;
	}
	return ret;
}

/**
 * Formatter to read message Center
 * @param cellvalue value of cell
 * @param options options
 * @param rowObject row of message
 * 
 */
function readLastMessageFormat(cellvalue, options, rowObject) {
	var ret;
	try {
		if (cellvalue === undefined) {
			ret = '';
		} else {
			var displayMessage = cellvalue;
			if(options.pos === 1){
				if (!rowObject.read) {
					ret = '<span style="font-weight: bold;">' + dateLastMessageFormat(displayMessage) + '<span/>';
				} else {
					ret = '<span>' + dateLastMessageFormat(displayMessage) + '<span/>';
				}
			}else {
				if (!rowObject.read) {
					ret = formatLinkMessages('<span style="font-weight: bold;">' + scratchMessage(displayMessage) + '<span/>');
				} else {
					ret = formatLinkMessages('<span>' + scratchMessage(displayMessage) + '<span/>');
				}
			}
		}
	} catch (err) {
		ret = cellvalue;
	}
	return ret;
}

function readLastMessageFormatHome(cellvalue, options, rowObject) {
	var ret;
	try {
		if (cellvalue === undefined) {
			ret = '';
		} else {
			var displayMessage = cellvalue;
			if(options.pos === 1){
				if (!rowObject.read) {
					ret = '<span style="font-weight: bold;font-family:Arimo !important;">' + dateLastMessageFormat(displayMessage) + '<span/>';
				} else {
					ret = '<span style="font-family:Arimo !important;">' + dateLastMessageFormat(displayMessage) + '<span/>';
				}
			}else {
				if (!rowObject.read) {
					ret = formatLinkMessages('<span style="font-weight: bold;font-family:Arimo !important;">' + scratchMessage(displayMessage) + '<span/>');
				} else {
					ret = formatLinkMessages('<span style="font-family:Arimo !important;">' + scratchMessage(displayMessage) + '<span/>');
				}
			}
		}
	} catch (err) {
		ret = cellvalue;
	}
	return ret;
}
/**
 * Formatter to date
 * @param cellvalue value of cell
 * 
 */
function dateLastMessageFormat(cellvalue) {
	var ret;
	try {
		if (cellvalue === undefined) {
			ret = '';
		} else {
			var displayDate = cellvalue;
			ret = displayDate.split('T');
		}
	} catch (err) {
		ret = cellvalue;
	}
	return ret[0];
}

function formatLinkMessages(cellvalue) {
	return "<a href='#' onClick='redirectToMessageCenter()'>" + cellvalue + "</a>";
};

function redirectToMessageCenter() {
	var urlBolp="";
	urlBolp=context+"/pages/jsp/messagecenter/MessageCenter.jsp?"+getCstParam();
	/*Set Single Sign On by demand*/
	var urlSSO=context+"/pages/jsp/messagecenter/MessageCenterGetSingleSingOnCIC.action?"+getCstParam();

	executeAjaxRequest(urlSSO,"",true,function(data) {
			ajaxRequest(urlBolp);
		},null,null,true);	
}

function redirectToLoyalty() {
  var url=context+"/pages/jsp-ns/olb/GetColPntsDetail";
  ajaxRequestMenu(url,"LOYALTY","LOYALTYDETAIL","N",function() {
    invokeActionError('');
    breadCrumb_dinamic('','','Puntos Bancolombia');
  });
}