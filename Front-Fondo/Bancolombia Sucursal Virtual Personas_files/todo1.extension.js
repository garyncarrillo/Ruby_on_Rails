var flag;
/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequest(url){
	renderInContainer(url,"#notes",undefined,true,undefined,undefined,undefined,true);
}
/**
 *  Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 * Envia el menu y el submenu para validar si debe presentar o no segunda clave
 * **/
 function ajaxRequestMenu(url,menu,submenu,wizard){
	ajaxRequestMenu(url,menu,submenu,wizard,undefined,undefined);
 }
 function ajaxRequestMenu(url,menu,submenu,wizard,OnSuccessCallback){
	ajaxRequestMenu(url,menu,submenu,wizard,OnSuccessCallback,undefined);
 }
function ajaxRequestMenu(url,menu,submenu,wizard,OnSuccessCallback,count){
	var url1="/cb/pages/jsp/security/invokeSecondPass.jsp?urlreturn=";
	var wizard1=wizard.replace("/","Back");
	var urlreturn="";
		urlreturn=url.replace(/&amp;/g, "_sp_").replace(/&/g, "_sp_")+"&menu="+menu+"&sub="+submenu+"&wizard="+wizard1;
		if(count!=undefined){
			urlreturn = urlreturn +"&count="+count;
		}
		url=url1+urlreturn;
		renderInContainer(url,"#notes",undefined,true,OnSuccessCallback,undefined,undefined,true);
}
function ajaxRequestMada(url,menu,submenu,wizard){
	var wizard1=wizard.replace("/","Back");
	var urlreturn="";
		urlreturn=url+"&menu="+menu+"&sub="+submenu+"&wizard="+wizard1;
		url=urlreturn;
		renderInContainer(url,"#notes",undefined,true,undefined,undefined,undefined,true);
}
/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestRenderInContainer(url,container,OnSuccessCallback){
	renderInContainer(url,"#"+container,undefined,true,OnSuccessCallback,undefined,undefined,true);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestSync(url){
	renderInContainer(url,"#notes",undefined,true,undefined,undefined,undefined,false);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestNonCache(url){
	ajaxRequestNonCache(url,undefined);
}
/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 * @param OnSuccessCallback
 */
function ajaxRequestNonCache(url,OnSuccessCallback){
	renderInContainer(url,"#notes",undefined,false,OnSuccessCallback,undefined,undefined,true);
}
/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestWithCallback(url,OnSuccessCallback,OnErrorCallback,OnCompleteCallback){
	renderInContainer(url,"#notes",undefined,true,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,true);
}

/**
 * Function that send a request as POST or GET. This method use ajax
 * @param string url  
 */
function ajaxRequestWithCallback2(url,OnSuccessCallback,OnErrorCallback,OnCompleteCallback){
	executeAjaxRequest(url,undefined,true,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,true);
}

function ajaxRequestWithCallbackPOST(url,parameters,OnSuccessCallback,OnErrorCallback,OnCompleteCallback){
	executeAjaxRequestPOST(url,parameters,true,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,true);
}

/**
 * Function that send a request as POST. This method use ajax synchronous
 * @param url
 */
function ajaxRequestWithCallbackPOST2(url,parameters,OnSuccessCallback,OnErrorCallback,OnCompleteCallback){
	executeAjaxRequestPOST(url,parameters,true,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,false);
}

/**
 * Function that send a request as POST or GET. This method use ajax
 * @param string url  
 */
function ajaxRequestWithCallback2NoLoading(url,OnSuccessCallback,OnErrorCallback,OnCompleteCallback){
	executeAjaxRequest(url,undefined,true,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,true,true);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestWithParameters(url,parameters){
	renderInContainer(url,"#notes",parameters,true,undefined,undefined,undefined,true);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax whith callback
 * @param string url  
 */
function ajaxRequestWithParametersCallback(url,parameters,OnSuccessCallback){
	renderInContainer(url,"#notes",parameters,true,OnSuccessCallback,undefined,undefined,true);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url - url to first ajax request
 * @param string urlSubscribe - url to second ajax request after first request
 */
function ajaxSubscribeRequest(url,urlSubscribe){
	renderInContainerSubscribe(url,"#notes",urlSubscribe);
}

/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url - url to first ajax request
 * @param string urlSubscribe - url to second ajax request after first request
 */
function ajaxSubscribeRequestMenu(url,urlSubscribe,menu,submenu,wizard){
	renderInContainerSubscribeMenu(url,"#notes",urlSubscribe,menu,submenu,wizard);
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInContainer(url,container,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync){
	showLoadingDialog();
	if(url.indexOf("cst")<0){
		if(url.lastIndexOf("?")>=0){
			url = url + '&'+getCstParam(); 
		}else{
			url = url + '?'+getCstParam(); 
		}
	}
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		data: ((parameters ==undefined || parameters == null || parameters =="")?"":parameters),
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
				if(OnSuccessCallback){
					OnSuccessCallback();
				}
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				showGenericError();
			}
			console.log('error 11: '+jqXHR.status+'. texto: '+errorThrown);
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInContainerMua(url,container,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync,methodType){
	showLoadingDialog();
	if(url.indexOf("cst")<0){
		if(url.lastIndexOf("?")>=0){
			url = url + '&'+getCstParam(); 
		}else{
			url = url + '?'+getCstParam(); 
		}
	}
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		type:methodType,
		data: ((parameters ==undefined || parameters == null || parameters =="")?"":parameters),
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
				if(OnSuccessCallback){
					OnSuccessCallback();
				}
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				showGenericError();
			}
			console.log('error 11: '+jqXHR.status+'. texto: '+errorThrown);
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function executeAjaxRequest(url,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync){
	showLoadingDialog();
	if(url.lastIndexOf("cst")<0){
		if(url.lastIndexOf("?")>=0){
			url = url + '&'+getCstParam(); 
		}else{
			url = url + '?'+getCstParam(); 
		}
	}
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		data: ((parameters ==undefined || parameters == null || parameters =="")?"":parameters),
		success: function(reponseHtml) { 
			try{
				if(OnSuccessCallback){
					OnSuccessCallback(reponseHtml);
				}
			}catch(err) {
				console.log('ERROR:' + err);
				if(!invalidateSession(reponseHtml)){
					showGenericError();
				}
				else {
					return false;
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				showGenericError();
			}else{
				console.log('error 13: '+jqXHR.status+'. texto: '+errorThrown);
			}
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

/**
 * Function that send a request as POST and render into element in the page. This method use ajax
 */
function executeAjaxRequestPOST(url,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync){
	showLoadingDialog();
	if (parameters == undefined || parameters == null) {
		parameters == "";
	}	
	// Add security parameters
	if(parameters.indexOf("cst") < 0) {
		if (parameters.length > 0){
			parameters = parameters + '&' + getCstParam(); 
		} else {
			parameters = getCstParam();
		}
	}
	if(parameters.indexOf("CSRF_TOKEN") < 0) {
		parameters = parameters + '&' + getCSRFParam();
	}
	// Send ajax request
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		data:parameters,
		type:"POST",
		success: function(reponseHtml) { 
			try{
				if(OnSuccessCallback){
					OnSuccessCallback(reponseHtml);
				}
			}catch(err) {
				console.log('ERROR:' + err);
				if(!invalidateSession(reponseHtml)){
					showGenericError();
				}
				else {
					return false;
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				showGenericError();
			}else{
				console.log('error 13: '+jqXHR.status+'. texto: '+errorThrown);
			}
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInContainerSubscribe(url,container,urlSubscribe){
	showLoadingDialog();
	if(url.lastIndexOf("cst")<0){
		if(url.lastIndexOf("?")>=0){
			url = url + '&'+getCstParam(); 
			urlSubscribe = urlSubscribe + '&'+getCstParam(); 
		}else{
			url = url + '?'+getCstParam(); 
			urlSubscribe = urlSubscribe + '?'+getCstParam(); 	
		}
	}
	$.ajax({  
		url: url,
		success: function(reponseHtml) { 
			try{
				renderInContainer(urlSubscribe,container);
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			showGenericError();
		},
		complete: function(){
		}
	});
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
 function renderInContainerSubscribeMenu(url,container,urlSubscribe,menu,submenu,wizard){
 renderInContainerSubscribeMenu(url,container,urlSubscribe,menu,submenu,wizard,undefined);
 }
function renderInContainerSubscribeMenu(url,container,urlSubscribe,menu,submenu,wizard,OnSuccessCallback){
	showLoadingDialog();
	if(url.lastIndexOf("cst")<0){
		if(url.lastIndexOf("?")>=0){
			url = url + '&'+getCstParam(); 
		}else{
			url = url + '?'+getCstParam(); 
		}
	}
	
	//aqui
	setTimeout(function(){$.ajax({  
		url: url,
		success: function(reponseHtml) { 
			try{
				if(!invalidateSession(reponseHtml)){
					ajaxRequestMenu(urlSubscribe,menu,submenu,wizard,OnSuccessCallback);
				}
				else {
					return false;
				}
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR){
			console.log('ERROR:' + jqXHR.status);
			showGenericError();
		},
		complete: function(){
		}
	});},3000);
	
}


/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page
 * @param Array parameters - Array of parameter and value <p><pre>var parameters = new Array(); <br/>parameters['name_parameter'] = 'value_parameter';</pre></p> 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInElement(url, parameters, method, container){
	$("#dvLoading").show();

	var inputs = '';
	for (var i in parameters) {
		inputs += i + '=' + parameters[i] + '&';
	}

	$.ajax({  
		url: url,
		data: inputs,  				
		type: method,  
			
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			showGenericError();
		},
		complete: function(){
			$("#dvLoading").hide();
		}
	});
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page
 * @param Array parameters - Array of parameter and value <p><pre>var parameters = new Array(); <br/>parameters['name_parameter'] = 'value_parameter';</pre></p> 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInElementJsonParams(url, parameters, method, container){
	$("#dvLoading").show();

	$.ajax({  
		url: url,
		data: parameters,  				
		type: method,  
			
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			showGenericError();
		},
		complete: function(){
			$("#dvLoading").hide();
		}
	});
}

function showLoadingDialog(){
	//DEVCENMEN-3196 Se eliminan elementos de FORCE antes de cargar la cortina de la SVP
	if($('#loading-indicator-MESSAGE_CENTER_MAIN-overlay')!=null && $('#loading-indicator-MESSAGE_CENTER_MAIN')!=null){
		$('#loading-indicator-MESSAGE_CENTER_MAIN-overlay').remove();
		$('#loading-indicator-MESSAGE_CENTER_MAIN').remove();
	}
	if(!isLoading()){
		if(window.parent.ifrm){
			window.parent.$('#ifrm').showLoading();
		}else{
			$("#dvLoading").show();
			$("#dvBlockPage").show();
		}
	}
	flag=true;
}

function hideLoadingDialog(){
	if(window.parent.ifrm){
		window.parent.$('#ifrm').hideLoading();
	}else{
		$("#dvLoading").hide();
		$("#dvBlockPage").hide();
	}
	flag=false;
}

function isLoading(){
	return flag;
}

$( document ).ajaxStop(function( event,request, settings ) {    
  hideLoadingDialog();
});
/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - /cb/pages/jsp/global/displayErrorGeneral.jsp
 */
function showGenericError(){
	var url = '/cb/pages/jsp/global/displayErrorGeneral.jsp';
	$.ajax({  
		url: url,	
		success: function(reponseHtml) { 
			$("#notes").html(reponseHtml);
		}
	});
}

/********************************************************************************/
/************************************GRILLAS*************************************/
/********************************************************************************/

function sortColumnFix(idTable){
	try{
	    $grid = jQuery('#'+idTable);
	    colModel = $grid.jqGrid('getGridParam', 'colModel');
	    sortName = $grid.jqGrid('getGridParam', 'sortname');
	    $('#gbox_' + $.jgrid.jqID($grid[0].id) +
	        ' tr.ui-jqgrid-labels th.ui-th-column').each(function (i) {
	        var cmi = colModel[i], colName = cmi.name;

	        if (cmi.sortable !== false) {
	            $(this).find('>div.ui-jqgrid-sortable>span.s-ico').show();
	        } else if (!cmi.sortable && colName !== 'rn' && colName !== 'cb' && colName !== 'subgrid') {
	            $(this).find('>div.ui-jqgrid-sortable').css({cursor: 'default'});
	        }
	    });
	}catch(e){
		console.log("Fallo sortColumnFix");
	}
}
function tableReziser(idTable, idTableContainer){
	executeResize(idTable, idTableContainer);
	$(window).bind('resize', function() {
		executeResize(idTable, idTableContainer);
	});
}

function executeResize(idTable, idTableContainer){
	try{
		var width = jQuery('#'+idTableContainer).width();
		jQuery('#'+idTable).jqGrid('setGridWidth',width);
	}catch(e){
		alert("Fallo tableReziser");
	}
}

function tableReziserCMCICMenu(idTable, idTableContainer){
	executeResizeCMCICMenu(idTable, idTableContainer);
	$(window).bind('resize', function() {
		executeResizeCMCICMenu(idTable, idTableContainer);
	});
}

function executeResizeCMCICMenu(idTable, idTableContainer){
	try{
		var firstWidth = jQuery('#'+idTableContainer).width();
		var width = firstWidth-21;
		jQuery('#'+idTable).jqGrid('setGridWidth',width);
	}catch(e){
		alert("Fallo tableReziser");
	}
}

$.subscribe('fixGrid', function(event, data) {
	/*para que funcione fixGrid,linkRowAction el div que contiene la grilla debe tener como id el id de la grilla concatenado con "_container"*/
	tableReziser(data.id, data.id+'_container');
	sortColumnFix(data.id);
	return false;
});

$.subscribe('fixGridCMCICMenu', function(event, data) {
	/*para que funcione fixGrid,linkRowAction el div que contiene la grilla debe tener como id el id de la grilla concatenado con "_container"*/
	tableReziserCMCICMenu(data.id, data.id+'_container');
	sortColumnFix(data.id);
	return false;
});

$.subscribe('linkRowAction', function(event, data) {
	altRowsCustom(data.id);
	clickGridAction(data.id);
	return false;
});

$('#gridMessagesLanding').subscribe('linkRowActionCMCICLanding', function(event, data) {
	altRowsCustom(data.id);
	clickGridAction(data.id);
	return false;
});

$('#gridMessagesMenuCIC').subscribe('linkRowActionCMCICMenu', function(event, data) {
	clickGridAction(data.id);
	return false;
});


function altRowsCustom(idGrid){
	$("#"+idGrid+" .jqgrow").mouseover(function(e) {
	    var hayAccion = true;
		if(e.target!==null && e.target.localName==="img"){
			hayAccion = false;
		}
		if(e.target!==null && e.target.localName==="input"){
			hayAccion = false;
		}
		if(hayAccion === true){
			try{
				var celdas = $(this).context.children;
				for(var i=0;i<celdas.length;i++){
					if(celdas[i].childNodes!== null && celdas[i].childNodes[0]!== null){
						var click = celdas[i].childNodes[0].onclick;
						if(click!==null && typeof click !== "undefined"){
							var rowId = $(this).addClass("grid-hover-row");
							return true;
						}
					}
				}
			}catch(e){
				console.log('Fallo la ejecución de la acción');
			}
		}
	});
	
	$("#"+idGrid+" .jqgrow").mouseout(function(e) {
	    var rowId = $(this).removeClass("grid-hover-row");
	});
}

function clickGridAction(idGrid){
	$("#"+idGrid+" .jqgrow").click(function(e) {
		var ejecutarAccion = true;
		if(e.target!==null && e.target.localName==="img"){
			ejecutarAccion = false;
		}
		if(e.target!==null && e.target.localName==="input"){
			ejecutarAccion = false;
		}
		if(e.target!==null && e.target.localName==="span"){
			ejecutarAccion = false;
		}
		if(e.target!==null && e.target.localName==="a"){
			ejecutarAccion = false;
		}
		if(e.target!==null && e.target.localName==="button"){
			ejecutarAccion = false;
		}
		if(ejecutarAccion === true){
			try{
				var celdas = $(this).context.children;
				for(var i=0;i<celdas.length;i++){
					if(celdas[i].childNodes!== null && celdas[i].childNodes[0]!== null){
						var click = celdas[i].childNodes[0].onclick;
						if(click!==null && typeof click !== "undefined"){
							var rowId = $(this).addClass("grid-selected-row");
							click.apply(celdas[i].childNodes[0]);
							setTimeout(removeClickEffect,1000,$(this));
							break;
						}
					}
				}
			}catch(e){
				console.log('Fallo la ejecución de la acción');
			}
		}
	});
}
/* Function to recover iCol of a cell*/
function getColIndex(gridName,columnName) {
	var cm =  jQuery(gridName).jqGrid('getGridParam','colModel');
	for(var i=0;i<cm.length;i++){
		if(cm[i].name===columnName){
			return i;		
		}
	}
	return 0;
}  
/* Function to recover width of a cell*/
function getColWidth(gridName,columnName) {
	var cm =  jQuery(gridName).jqGrid('getGridParam','colModel');
	for(var i=0;i<cm.length;i++){
		if(cm[i].name===columnName){
			return cm[i].width;
		}
	}
	return 0;
}  


function removeClickEffect(row){
	try{
		row.removeClass("grid-selected-row");
	}catch(e){}
}


/**
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */
function ajaxRequestCST(url){
 	renderInContainerCST(url,"#notes",undefined,true,undefined,undefined,undefined,true, "GET" );
}

function ajaxRequestCSTParam(url,container,param,method){
 	renderInContainerCST(url,container,param,true,undefined,undefined,undefined,true, method );
}

/**
 * Function that send a request as POST or GET and render into element in the page. This method use ajax
 * @param string url - jqGrid id used in current page 
 * @param string method - GET or POST
 * @param string container - Id or jquery selector into render the page.
 */
function renderInContainerCST(url,container,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync, hasType){
	showLoadingDialog();
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		data: ((parameters ==undefined || parameters == null || parameters =="")?"":parameters),
		type:hasType,
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
				if(OnSuccessCallback){
					OnSuccessCallback();
				}
			}catch(err) {
				console.log('ERROR:' + err);
				$(container).html("<b>Error injecting code: </b>" + err);
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				$(container).html("<b>Error: </b>" + errorThrown + ' - ' + jqXHR.status);
			}else{
				console.log('error 16: '+jqXHR.status+'. texto: '+errorThrown);
			}
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

function dollarFormat(number){
	return 'U$S '+$.number( number, 2, '.', ',' );
}

function pesoFormat(number){
	return '$ '+$.number( number, 2, '.', ',' );
}

function amountToNumber(amount){
	return amount.replace(/[$US\s]/g,'');
}


/** Methods used by mua*/
function redirectToView(url, parameters){
	ajaxRequestWithParametersMua(url,parameters);
}

/** Methods used by mua*/
function redirectToViewGet(url, parameters){
	ajaxRequestWithParameters(url,parameters);
}

/**Methods used by mua
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */

function ajaxRequestWithParametersMua(url,parameters){
	renderInContainerMua(url,"#notes",parameters,true,undefined,undefined,undefined,true,"POST");
}

function scrollTopCustom(){
	document.location.href="#header0";
	document.location.href="#header0";
}

function isshowMisMensajes(valorURL){
	var show=true;
	try{
		if((valorURL.indexOf('ALLACCOUNTS_HOME')>=0)||valorURL.indexOf('LTRANSFINTER')>=0){
			show=false;
		}
	}catch(e){}
	if(show){
		showMisMensajes(loadMessageCenterMenu);
	}
}
function inputDollarFormat(number){
	var num=$.number( number, 0, '.', ',' );
	if(num=="0")
		{
		num="";
		}
	return num;
}

function inputDollarFormatDecimal(n){

	if(n!=""){
		//Separamos los numeros entre decimales y enteros
		var parts = String(n).split(".");
		var numComplete="";
		var num="";
		if(parts.length>1)
		{
			//seleccionamos los decimales
			var decimals="0."+parts[1].substring(0,2);
			// redondeamos los decimales
			//decimals=(+decimals).toFixed(2);
			//sumamos el numero entero + el decimal redondeado
			numComplete=parseFloat(parts[0])+parseFloat(decimals);
		}
		else{
			if(parseInt(parts[0])>0){
				
				numComplete=parts[0];
			}
			else{
				numComplete="";
			}
		}
		//Separamos el numero redondeado completo para darle formato
		parts = String(numComplete).split(".");
		//Si existe el numero con decimales
		if(parts.length>1)
		{
			if(parts[1].length==1)
			{
				parts[1]=parts[1]+"0";
			}
			//Damos formato al numero
			num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		}
		else
		{
			num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+".00";
			
		}
		return num;
	}
	else
	{
		return "";
	}
}

/**Methods used by mua OnSuccesCallback
 * Function that send a request as POST or GET and render into general container. This method use ajax
 * @param string url  
 */

function ajaxRequestWithParametersMuaCallback(url,parameters,OnSuccessCallback){
	renderInContainerMua(url,"#notes",parameters,true,OnSuccessCallback,undefined,undefined,true,"POST");
}

function ajaxRequestPOST(url,params){
	renderInContainerPOST(url,"#notes",params,true,undefined,undefined,undefined,true);
}

function ajaxRequestPOST2(url,container,params){
	renderInContainerPOST(url,container,params,true,undefined,undefined,undefined,true);
}

function ajaxRequestRenderInContainerPOST(url,params,container,OnSuccessCallback){
	renderInContainerPOST(url,"#"+container,params,true,OnSuccessCallback,undefined,undefined,true);
}

function renderInContainerPOST(url,container,parameters,cacheState,OnSuccessCallback,OnErrorCallback,OnCompleteCallback,isAsync){
	showLoadingDialog();
	if (parameters == undefined || parameters == null) {
		parameters == "";
	}	
	// Add security parameters
	if(parameters.indexOf("cst") < 0) {
		if (parameters.length > 0){
			parameters = parameters + '&' + getCstParam(); 
		} else {
			parameters = getCstParam();
		}
	}
	if(parameters.indexOf("CSRF_TOKEN") < 0) {
		parameters = parameters + '&' + getCSRFParam();
	}
	// Send ajax request
	$.ajax({  
		url: url,
		async:isAsync,
		cache:cacheState,
		data:parameters,
		type:"POST",
		success: function(reponseHtml) { 
			try{
				$(container).html(reponseHtml);
				isshowMisMensajes(url);
				scrollTopCustom();
				if(OnSuccessCallback){
					OnSuccessCallback();
				}
			}catch(err) {
				console.log('ERROR:' + err);
				showGenericError();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ERROR:' + jqXHR.status);
			if(jqXHR.status != '403' || jqXHR.status != '302' || jqXHR.status != '404' || jqXHR.status != '303'){
				showGenericError();
			}else{
				console.log('error 16: '+jqXHR.status+'. texto: '+errorThrown);
			}
			if(OnErrorCallback){
				OnErrorCallback();
			}
		},
		complete: function(){
			if(OnCompleteCallback){
				OnCompleteCallback();
			}
		}
	});
}

function invalidateSession(contenido){
	if(typeof contenido === 'string'){
		var codeContent = splitText(contenido,"code=",null);
		var codigoContent = splitText(codeContent,"'",1);
		var code = splitText(codigoContent,"",0);
		if(code != null && code!="null" && code!=""){
			window.location.href='/cb/pages/jsp-ns/invalidate-session.jsp?code='+code;
			return true;
		}
	}
	return false;
}

function splitText(textContent, textSplit, posSplit){
	if(textContent && textContent != null && posSplit != null) {
		textContent = textContent[posSplit];
		if(posSplit === 0){
			return textContent;
		}
	}
	if(textContent && textContent != null && textContent != '') {
		return textContent.split(textSplit);
	} else {
		return null;
	}
}
