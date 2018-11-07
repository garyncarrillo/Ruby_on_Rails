/**
 * © TODO1 SERVICES, INC. ('TODO1') All rights reserved, ${date}.
 * 
 * This work is protected by the United States of America copyright laws.
 * 
 * All information contained herein is and remains the property of
 * TODO1 [and its suppliers, if any] .
 * 
 * Dissemination of this information or reproduction of this material
 * is not permitted unless prior written consent is obtained
 * from TODO1 SERVICES, INC.
**/

function getGestorAdToken(divId){
	var urlVerification = context+"/pages/jsp/ga/GATokenGeneration.action";
	var timeZone = "&timeZone=" + new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];
	var params = "id_ga="+divId+timeZone;
	var tk = null;
	ajaxRequestWithCallbackPOST2(urlVerification,params,function(data){
		if(data != undefined && data.token != undefined && data.token != null){
			tk = data.token;
		}
	},null,null);
	return tk;
}

function setGestorUrl(gaEnabled, url){
	if(gaEnabled === "true") {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		head.appendChild(script);
	}
} 
