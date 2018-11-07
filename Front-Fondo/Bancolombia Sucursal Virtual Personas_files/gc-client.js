var gcclient = {

  adIds: {},
  contentsList: {},
  currentContentPos: {},
  defaultContents: {},
  defaultId: {},
  adData: {},
  adParams: {},
  popupRefs: {},
  idTimeout: {},
  buttonsState: {},
  originalLeft: {},

  ConfigItem: function (contentId) {
    this.contentId = contentId;
    this.estado = 1;
    this.countVis = 0;
    this.countClicks = 0;
    this.nextDisplay = 0;
  },

  replaceDiv: function (divId, currentContent, adId) {
    var doc = document;
    if (gcclient.popupRefs[adId])
      doc = gcclient.popupRefs[adId].opener.document;
    
    if(!doc) return;

    if (!doc.getElementById(divId)) return;

    var divElement = document.getElementById(divId);
    if(!divElement) return;
    var adParams = {};

    if (!gcclient.adIds[divId]) {
      adParams = JSON.parse(divElement.innerHTML);
      if (!gcutil.isNotDef(adParams.mode) && adParams.mode === "url") {
        var urlParams = location.search.substr(1).split("&");
        var tmp = [];
        for (var i = 0; i < urlParams.length; i++) {
          tmp = urlParams[i].split("=");
          if (tmp[0] === "aId") adParams.aId = tmp[1];
          else if (tmp[0] === "uId") adParams.uId = tmp[1];
          else if (tmp[0] === "companyId") adParams.companyId = tmp[1];
          else if (tmp[0] === "groupId") adParams.groupId = tmp[1];
          else if (tmp[0] === "token") adParams.token = tmp[1];
          else if (tmp[0] === "clientId") adParams.clientId = tmp[1];
          else if (tmp[0] === "cssLink") adParams.cssLink = tmp[1];
        }
      }
      adId = adParams.aId;
      gcclient.adParams[adId] = adParams;
      gcclient.adIds[divId] = adId;
    } else {
      adId = gcclient.adIds[divId];
      adParams = gcclient.adParams[adId];
    }

    var companyId = adParams.companyId;
    var groupId = adParams.groupId;

    var popupMode = gcutil.isNotDef(adParams.popup) ? false : adParams.popup;
    gcclient.adData[adId] = gcutil.isNotDef(adParams.data) ? {} : adParams.data;

    var config = "";
    var configMap = gcutil.loadConfigMap(adId, adParams.uId);
    var contentKeys = gcutil.getKeys(configMap);
    gcclient.buttonsState[adId] = {};

    for (var j = 0; j < contentKeys.length; j++) {
      var contentConfig = configMap[contentKeys[j]];
      var contentButtons = {};
      contentButtons["ddv"] = contentConfig["ddv"];
      contentButtons["rmt"] = contentConfig["rmt"];
      contentButtons["l"] = contentConfig["l"];
      contentButtons["nl"] = contentConfig["nl"];
      gcclient.buttonsState[adId][contentConfig["contentId"]] = contentButtons;

      if (contentKeys[j] === "DEFAULT") continue;

      var status = contentConfig["estado"];
      if (status === 1) {
        var currentTime = new Date().getTime();
        if (contentConfig["nextDisplay"] !== 0 &&
          contentConfig["nextDisplay"] > currentTime) {
          status = 0;
        } else {
          gcclient.buttonsState[adId][contentConfig["contentId"]]["rmt"] = false;
        }
      }
      config = config + "{" + contentConfig["contentId"] + "," + status + ","
        + contentConfig["countVis"] + "," + contentConfig["countClicks"] + "},";
    }
    if (config !== "") config = config.slice(0, -1);
    if (gcclient.idTimeout[adId]) window.clearTimeout(gcclient.idTimeout[adId]);

    var requestUrl = gcconfig.endpoint;
    var body = "cmd=" + gcconfig.configCmd + "&ip=&ua=&config=" + config;

    if (gcutil.isNotDef(adParams.token)) {
      body += "&uId=&adId=" + adId +
        "&date=" + gcutil.obfuscate(new Date().getTime()) +
        "&tzo=" + gcutil.obfuscate(new Date().getTimezoneOffset()) +
        "&companyId=" + companyId + "&groupId=" + groupId;
      gcclient.callContentService(requestUrl, body, adId, currentContent, divId, divElement, popupMode, adParams.cssLink);
    } else {
      gcutil.getToken(divId).then(function (token) {
        body += "&token=" + token + "&clientId=" + adParams.clientId;
        gcclient.callContentService(
          requestUrl, body, adId, currentContent, divId, divElement, popupMode, adParams.cssLink);
      });
    }
  },

  callContentService: function (requestUrl, body, adId, currentContent, divId, divElement, popupMode, cssLink) {
	  new gcutil.ajaxPostRequest(requestUrl, body, function (adData) {
	    	
	    	var ua = window.navigator.userAgent;
	        var msie = ua.indexOf("MSIE ");
	        var adData_T;
	        
	        if ((msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) && typeof adData === "string") // If Internet Explorer, return version number
	        {
	        	var json = JSON.parse(adData);
	  		  if (typeof json === "string") 
	  			  json = JSON.parse(json);
	  		  adData_T = json;
	        }else{
	        	adData_T = adData;
	        }

	      if (!gcutil.isNotDef(adData_T) && adData_T !== null &&
	    		  adData_T.defaultContent !== null && adData_T.contentList !== null) {

	        gcclient.contentsList[adId] = adData_T.contentList;
	        gcclient.defaultContents[adId] = adData_T.defaultContent;
	        gcclient.defaultId[adId] = adData_T.defaultId;

	        if (adData_T.contentList.length > 0) {
	          gcclient.buildDiv(divElement, divId, adId, popupMode, cssLink);
	          gcclient.currentContentPos[adId] =
	            gcclient.getCurrentContentPos(adId, currentContent);
	          gcclient.loadCurrentContent(divId, adId);	          
	        } else {	          
	          if(popupMode !== "true"){
	        	  gcclient.buildDiv(divElement, divId, adId, popupMode, cssLink);
	        	  gcclient.loadDefaultContent(divId, adId);	        	  
	          }
	        }
	      } else {
	        gcclient.handleError("Sin contenido para el anuncio", adId, divId);
	      }
	    }, function (e) {
	      gcclient.handleError(e, adId, divId);
	    });
	  }, 

  buildDiv: function (divElement, divId, adId, popupMode, cssLink) {
	  if(gcclient.contentsList[adId] && gcclient.contentsList[adId].length == 0 && popupMode === "true"){
		  return;
	  }
    var width = divElement.getAttribute("gc-popup-width");
    var height = divElement.getAttribute("gc-popup-height");
    var className = divElement.className;

    var html = gcclient.adTemplate
      .replace(/!{CLASSNAME}/g, className)
      .replace(/!{ID}/g, divId);

    var doc = document;
    if (popupMode !== "true") {
      divElement.insertAdjacentHTML("afterend", html);
      divElement.parentNode.removeChild(divElement);
    } else {
    	
      if (!gcclient.popupRefs[adId])
        gcclient.popupRefs[adId] = window.open("", "",
          "width=" + width + "px, height=" + height + "px");

      if (!gcclient.popupRefs[adId]) {
        divElement.style.display = "none";
        return;
      }

      doc = gcclient.popupRefs[adId].document;
      if(!doc) return;
      gcclient.setPopupStyle(cssLink, doc.head);
      doc.body.innerHTML = html;

      divElement.style.display = "none";
    }

    if(!doc) return;
    
    var winRef = popupMode !== "true" ? window : gcclient.popupRefs[adId].opener;
    doc.getElementById('rmt-lnk-' + divId)
      .addEventListener('click', function (evt) {
        winRef.gcclient_recordarMasTarde(divId, adId);
        evt.preventDefault();
        return false;
      });
    doc.getElementById('ddv-lnk-' + divId)
      .addEventListener('click', function (evt) {
        winRef.gcclient_noVerMas(divId, adId);
        evt.preventDefault();
        return false;
      });
    doc.getElementById('l-lnk-' + divId)
      .addEventListener('click', function (evt) {
        winRef.gcclient_like(divId, adId);
        evt.preventDefault();
        return false;
      });
    doc.getElementById('nl-lnk-' + divId)
      .addEventListener('click', function (evt) {
        winRef.gcclient_noLike(divId, adId);
        evt.preventDefault();
        return false;
      });
  },

  setPopupStyle: function (cssLink, head) {
    var links = document.head.getElementsByTagName('link');
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    for (var i = 0; i < links.length; i++)
      if (links[i].href.indexOf(cssLink) !== -1) {
        var link = document.createElement('link');
        link.rel = links[i].rel;
        link.type = links[i].type;
        link.href = links[i].href;
        
        if ((msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))) // If Internet Explorer, return version number
        {
        	head.innerHTML = head.innerHTML +'&NewLine;'+ link.outerHTML;
        }else{
        	head.appendChild(link);
        }
        return;
      }
    setTimeout(function () {
      gcclient.setPopupStyle(cssLink)
    }, 300);
  },

  getCurrentContentPos: function (adId, currentPos) {
    if (!currentPos) return 0;
    if (currentPos >= gcclient.contentsList[adId].length)
      return gcclient.contentsList[adId].length - 1;
    return currentPos;
  },

  isPopupMode: function (adId) {
    return typeof gcclient.adParams[adId].popup === "undefined" ?
      false : gcclient.adParams[adId].popup;
  },

  getCurrentContent: function (adId) {
    var contentList = gcclient.contentsList[adId];
    var currentContent = gcclient.currentContentPos[adId];
    return contentList[currentContent];
  },

  loadDefaultContent: function (divId, adId) {
	  var popupMode = gcclient.isPopupMode(adId);
	  if(popupMode === "true"){
		  return;
	  }
    var defaultContent = gcclient.defaultContents[adId];
    defaultContent = decodeURIComponent(defaultContent);    
    var baseWindow = popupMode ? gcclient.popupRefs[adId] : window;
    var doc = baseWindow.document;

    if(!doc) return;
    
    gcutil.ajaxRequest(defaultContent, function (defaultHtml) {
      var iFrame = doc.getElementById(divId + "-iframe");
      if(!iFrame) return;
      
      iFrame.insertAdjacentHTML("afterend", iFrame.outerHTML);
      iFrame.parentNode.removeChild(iFrame);
      iFrame = doc.getElementById(divId + "-iframe");
  

      defaultHtml = gcclient.getContentWithScript(
        defaultHtml, adId, divId, popupMode);
      iFrame.contentWindow.document.write(defaultHtml);
      doc.getElementById("ddv-" + divId).style.display = "none";
      doc.getElementById("rmt-" + divId).style.display = "none";

      gcclient.currentContentPos[adId] = null;

      gcclient.changeOpacity(doc, divId, adId, "l");
      gcclient.changeOpacity(doc, divId, adId, "nl");

      gcclient.eventService(divId, adId, "VIEW");
      
    }, function (e) {
      gcclient.handleError(e, adId, divId, true);
    });
  },

  loadCurrentContent: function (divId, adId) {
    var contentList = gcclient.contentsList[adId];
    var currentContentPos = gcclient.currentContentPos[adId];
    if (currentContentPos === null || !contentList[currentContentPos]) return;
    var currentContent = contentList[currentContentPos];

    var popupMode = gcclient.isPopupMode(adId);
    var baseWin = (popupMode ? gcclient.popupRefs[adId] : window);
    if(!baseWin) return;
    var iFrameElement = baseWin.document.getElementById(divId + "-iframe");
    if(!iFrameElement) return;
    if (!iFrameElement.contentWindow) return;

    var stopSeeing = currentContent.stopSeeing === "SI";
    var seeLater = currentContent.seeLater === "SI";
    var ddvElem = baseWin.document.getElementById("ddv-" + divId);
    var rmtElem = baseWin.document.getElementById("rmt-" + divId);

    if(ddvElem)
    ddvElem.style.display = stopSeeing ? "block" : "none";
    if(rmtElem)
    rmtElem.style.display = seeLater ? "block" : "none";

    if (!gcclient.originalLeft.ddv)
      gcclient.originalLeft.ddv = baseWin.getComputedStyle(ddvElem).left;
    if (!gcclient.originalLeft.rmt)
      gcclient.originalLeft.rmt = baseWin.getComputedStyle(rmtElem).left;

    ddvElem.style.left = !seeLater && stopSeeing ?
      gcclient.originalLeft.rmt : gcclient.originalLeft.ddv;

    var contentUrl = decodeURIComponent(currentContent.url);
    gcutil.ajaxRequest(contentUrl, function (contentHtml) {

      var stopView = gcclient.incrementCountVis(adId, currentContent.id, divId);
      if (stopView) return;

      var rotationTime = currentContent.rotationTime * 1000;
      if (rotationTime > 0 && contentList.length > 1) {
        gcclient.idTimeout[adId] = window.setTimeout(function () {
          if (currentContentPos + 1 < contentList.length) {
            gcclient.currentContentPos[adId] = currentContentPos + 1;
          } else {
            gcclient.currentContentPos[adId] = 0;
          }
          gcclient.loadCurrentContent(divId, adId);
        }, rotationTime);
      }

      var html = iFrameElement.outerHTML;
      iFrameElement.insertAdjacentHTML("afterend", html);
      iFrameElement.parentNode.removeChild(iFrameElement);
      iFrameElement = baseWin.document.getElementById(divId + "-iframe");
      
      if(!iFrameElement) return;

      var valueStr = currentContent.value;
      if (valueStr === "") valueStr = "{}";
      var value = JSON.parse(valueStr);
      var valueAttrs = gcutil.getKeys(value);
      for (var i = 0; i < valueAttrs.length; i++) {
        contentHtml = contentHtml.replace(
          new RegExp("!{" + valueAttrs[i] + "}", "g"), value[valueAttrs[i]]);
      }

      var adData = gcclient.adData[adId];
      var adDataAttrs = gcutil.getKeys(adData);
      for (var j = 0; j < adDataAttrs.length; j++) {
        contentHtml = contentHtml.replace(
          new RegExp("!{" + adDataAttrs[j] + "}", "g"), adData[adDataAttrs[j]]);
      }

      contentHtml = gcclient.getContentWithScript(
        contentHtml, adId, divId, popupMode);
      iFrameElement.contentWindow.document.write(contentHtml);

      gcclient.changeOpacity(baseWin.document, divId, adId, "ddv");
      gcclient.changeOpacity(baseWin.document, divId, adId, "rmt");
      gcclient.changeOpacity(baseWin.document, divId, adId, "l");
      gcclient.changeOpacity(baseWin.document, divId, adId, "nl");

      gcclient.eventService(divId, adId, "VIEW");
    }, function () {
      gcclient.handleAnnounceError(adId, divId);
    });
  },

  changeOpacity: function (doc, divId, adId, prefix, contentId) {
	if (!doc) return;
    if (!contentId) contentId = getContentId(adId);
    var used = gcclient.buttonsState[adId][contentId] &&
      gcclient.buttonsState[adId][contentId][prefix];
    var value = used ? .25 : 1;

    var elem = doc.getElementById(prefix + "-img-" + divId);
    if(!elem) return;
    elem.style.opacity = value;
    elem.style.filter = "alpha(opacity=" + value * 100 + ")";
  },

  getConfigParams: function (adId, contentId) {
    var adParams = gcclient.adParams[adId];
    var configMap = gcutil.loadConfigMap(adId, adParams.uId);
    var contentConfig = configMap[contentId];
    if (typeof contentConfig === 'undefined') {
      contentConfig = new gcclient.ConfigItem(contentId);
    }
    return {
      adParams: adParams,
      configMap: configMap,
      contentConfig: contentConfig
    };
  },

  getContentWithScript: function (contentHtml, adId, divId, popup) {
    var headClosePos = contentHtml.indexOf("</head>");
    var jsRef = "<script type=\"text/javascript\" " +
      "src=\"" + gcconfig.contentScriptPath + "\" " +
      "data-ad_id='" + adId + "' data-div_id='" + divId + "' " +
      "data-popup='" + popup + "'></script>";
    contentHtml = contentHtml.slice(0, headClosePos) +
      jsRef + contentHtml.slice(headClosePos);
    return contentHtml;
  },

  incrementCountVis: function (adId, contentId, divId) {
    if (contentId === "DEFAULT") return;

    var r = gcclient.getConfigParams(adId, contentId);
    r.contentConfig["countVis"] = r.contentConfig["countVis"] + 1;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);

    var viewsNumber = gcclient.getCurrentContent(adId).viewsNumber;
    if (r.contentConfig["countVis"] > viewsNumber && viewsNumber > 0) {
      gcclient.changeContentState(adId, contentId);
      gcclient.replaceDiv(divId, gcclient.currentContentPos[adId], adId);
      return true;
    }
  },

  incrementCountClick: function (adId, contentId, divId) {
    if (contentId === "DEFAULT") return;

    var r = gcclient.getConfigParams(adId, contentId);
    r.contentConfig["countClicks"] = r.contentConfig["countClicks"] + 1;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);

    var clicksNumber = gcclient.getCurrentContent(adId).clicksNumber;
    if (r.contentConfig["countClicks"] >= clicksNumber && clicksNumber > 0) {
      gcclient.changeContentState(adId, contentId);
      setTimeout(function () {
        gcclient.replaceDiv(divId, gcclient.currentContentPos[adId], adId);
      }, 300);
    }
  },

  changeContentState: function (adId, contentId) {
    var r = gcclient.getConfigParams(adId, contentId);
    r.contentConfig["estado"] = 0;
    r.contentConfig["ddv"] = true;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);
  },

  changeNextDisplay: function (adId, contentId) {
    var r = gcclient.getConfigParams(adId, contentId);
    var nextDisplayTime = new Date().getTime();
    nextDisplayTime = nextDisplayTime + gcconfig.adPostponeHours * 60 * 60 * 1000;
    r.contentConfig["nextDisplay"] = nextDisplayTime;
    r.contentConfig["rmt"] = true;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);
  },

  changeLike: function (adId, contentId) {
    var r = gcclient.getConfigParams(adId, contentId);
    r.contentConfig["l"] = true;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);
  },

  changeDislike: function (adId, contentId) {
    var r = gcclient.getConfigParams(adId, contentId);
    r.contentConfig["nl"] = true;
    r.configMap[contentId] = r.contentConfig;
    gcutil.saveConfigMap(adId, r.adParams.uId, r.configMap);
  },

  eventService: function (divId, adId, event, tag) {
    var adParams = gcclient.adParams[adId];
    var current = gcclient.currentContentPos[adId];
    var contentList = gcclient.contentsList[adId];

    var isDefault = contentList.length === 0;
    if (!isDefault && !contentList[current]) current = current - 1;

    var contentId = !isDefault ?
      contentList[current].contentId : gcclient.defaultId[adId];

    var body = "cmd=" + gcconfig.eventsCmd + "&contentId=" + contentId +
      "&segmentId=" + (!isDefault ? contentList[current].segmentId : "") +
      "&campaignId=" + (!isDefault ? contentList[current].campaignId : "") +
      "&event=" + event + "&ip=&tag=" + (tag || "");

    if (gcutil.isNotDef(adParams.token)) {
      body += "&adId=" + adId + "&groupId=" + (adParams.groupId || "") +
        "&uId=&companyId=" + (adParams.companyId || "");
      new gcutil.ajaxPostRequest(gcconfig.endpoint, body);
    } else {
      gcutil.getToken(divId).then(function (token) {
        body += "&token=" + token + "&clientId=" + adParams.clientId;
        new gcutil.ajaxPostRequest(gcconfig.endpoint, body);
      });
    }
  },

  handleError: function (e, adId, divId, friendly) {
    var popupMode = gcclient.isPopupMode(adId);
    var baseWindow = popupMode ? gcclient.popupRefs[adId] : window;
    gcclient.currentContentPos[adId] = null;

    var doc = baseWindow.document;
    
    if(!doc) return;
    
    doc.getElementById("rmt-" + divId).style.display = "none";
    doc.getElementById("ddv-" + divId).style.display = "none";
    doc.getElementById("l-" + divId).style.display = "none";
    doc.getElementById("nl-" + divId).style.display = "none";
    
    var content = friendly ?
    	      gcconfig.friendlyErrorContent : gcconfig.errorContent;

    gcutil.ajaxRequest(content, function (errorHtml) {
      var iFrame = doc.getElementById(divId + "-iframe");
      if(!iFrame) return;
      
      iFrame.insertAdjacentHTML("afterend", iFrame.outerHTML);
      iFrame.parentNode.removeChild(iFrame);
      iFrame = doc.getElementById(divId + "-iframe");
      iFrame.contentWindow.document.write(errorHtml);	      
    });
  },

  handleAnnounceError: function (adId, divId) {
    gcclient.contentsList[adId].splice(gcclient.currentContentPos[adId], 1);

    if (gcclient.contentsList[adId].length > 0) {
      gcclient.currentContentPos[adId] =
        gcclient.getCurrentContentPos(adId, gcclient.currentContentPos[adId]);
      gcclient.loadCurrentContent(divId, adId);
    } else {
      gcclient.loadDefaultContent(divId, adId);
    }
  },

  adTemplate: '<div id="!{ID}" class="!{CLASSNAME}" style="position:relative; overflow: hidden;">' +
  '  <iframe style="width: 100%; height: 100%; overflow: hidden;" id="!{ID}-iframe"></iframe>' +
  '  <div id="rmt-!{ID}" style="position: absolute; background: black; opacity:0.6; text-align: center;" class="gc-icons gc-icon-rmt">' +
  '    <a style="font-family: Sans-serif; color: white; text-decoration: none;" href="#" id="rmt-lnk-!{ID}">' +
  '      <img src="' + gcconfig.imagesUrl + 'clock.png" id="rmt-img-!{ID}" class="gc-imgs gc-img-rmt" title="Recordar m&aacute;s tarde" />' +
  '    </a>' +
  '  </div>' +
  '  <div id="ddv-!{ID}" style="position: absolute; background: black; opacity:0.6; text-align: center;" class="gc-icons gc-icon-ddv">' +
  '    <a style="font-family: Sans-serif; color: white; text-decoration: none;" href="#" id="ddv-lnk-!{ID}">' +
  '      <img src="' + gcconfig.imagesUrl + 'eyec.png" id="ddv-img-!{ID}" class="gc-imgs gc-img-ddv" title="Dejar de ver" />' +
  '    </a>' +
  '  </div>' +
  '  <div id="l-!{ID}" style="position: absolute; background: black; opacity:0.6; text-align: center;" class="gc-icons gc-icon-l">' +
  '    <a style="font-family: Sans-serif; color: white; text-decoration: none;" href="#" id="l-lnk-!{ID}">' +
  '      <img src="' + gcconfig.imagesUrl + 'like.png" id="l-img-!{ID}" class="gc-imgs gc-img-l" title="Me gusta" />' +
  '    </a>' +
  '  </div>' +
  '  <div id="nl-!{ID}" style="position: absolute; background: black; opacity:0.6; text-align: center;" class="gc-icons gc-icon-nl">' +
  '    <a style="font-family: Sans-serif; color: white; text-decoration: none;" href="#" id="nl-lnk-!{ID}">' +
  '      <img src="' + gcconfig.imagesUrl + 'nolike.png" id="nl-img-!{ID}" class="gc-imgs gc-img-nl" title="No me gusta" />' +
  '    </a>' +
  '  </div>' +
  '</div>'
};

var gcclient_click = function (adId, contentId, divId) {
  gcclient.eventService(divId, adId, "CLICK", "NO-CONVERSION");
  gcclient.incrementCountClick(adId, contentId, divId);
};

var gcclient_conversion = function (adId, contentId, divId, tag) {
  gcclient.eventService(divId, adId, "CONVERSION", tag);
  gcclient.incrementCountClick(adId, contentId, divId);
};

var setupImgGetContentId = function (divId, adId, prefix) {
  var contentId = getContentId(adId);

  var buttonsState = gcclient.buttonsState[adId];
  if (!buttonsState[contentId]) buttonsState[contentId] = {};
  if (buttonsState[contentId][prefix]) return;
  buttonsState[contentId][prefix] = true;

  var baseWin = gcclient.isPopupMode(adId) ? gcclient.popupRefs[adId] : window;
  gcclient.changeOpacity(baseWin.document, divId, adId, prefix, contentId);

  return contentId;
};

var gcclient_noVerMas = function (divId, adId) {
  var contentId = setupImgGetContentId(divId, adId, "ddv");
  if (!contentId || contentId === "DEFAULT") return;
  gcclient.eventService(divId, adId, "STOP_VIEW");
  gcclient.changeContentState(adId, contentId);
  gcclient.replaceDiv(divId, gcclient.currentContentPos[adId], adId);
};

var gcclient_recordarMasTarde = function (divId, adId) {
  var contentId = setupImgGetContentId(divId, adId, "rmt");
  if (!contentId || contentId === "DEFAULT") return;
  gcclient.eventService(divId, adId, "VIEW_LATER");
  gcclient.changeNextDisplay(adId, contentId);
  gcclient.replaceDiv(divId, gcclient.currentContentPos[adId], adId);
};

var gcclient_like = function (divId, adId) {
  var contentId = setupImgGetContentId(divId, adId, "l");
  if (!contentId) return;
  gcclient.eventService(divId, adId, "LIKE");
  gcclient.changeLike(adId, contentId);
};

var gcclient_noLike = function (divId, adId) {
  var contentId = setupImgGetContentId(divId, adId, "nl");
  if (!contentId) return;
  gcclient.eventService(divId, adId, "NO_LIKE");
  gcclient.changeDislike(adId, contentId);
};

var getContentId = function (adId) {
  var contentId;
  var list = gcclient.contentsList[adId];
  if (list.length === 0) {
    contentId = "DEFAULT";
  } else {
    var i = gcclient.currentContentPos[adId];
    if (!list[i]) i = i - 1;
    contentId = list[i].id;
  }
  return contentId;
};

var handleClick = function (e) {
  var params = e.split(",");
  if (params.length !== 3) return;
  var adId = params[0];
  var divId = params[1];
  var tag = params[2];
  var contentId = getContentId(adId);

  if (tag) gcclient_conversion(adId, contentId, divId, tag);
  else gcclient_click(adId, contentId, divId);
};

gcclient.replaceDiv("anuncio-0");
gcclient.replaceDiv("anuncio-1");
gcclient.replaceDiv("anuncio-2");
gcclient.replaceDiv("anuncio-3");
gcclient.replaceDiv("anuncio-4");
gcclient.replaceDiv("anuncio-5");
gcclient.replaceDiv("anuncio-6");
gcclient.replaceDiv("anuncio-7");
gcclient.replaceDiv("anuncio-8");
gcclient.replaceDiv("anuncio-9");
