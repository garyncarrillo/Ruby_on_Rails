var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
  if (scripts[i].getAttribute("data-ad_id")) {
    var scr = scripts[i];
    break;
  }
}

function getAdId() {
  return scr.getAttribute("data-ad_id");
}

function getDivId() {
  var divId = scr.getAttribute("data-div_id");
  if (divId.indexOf("anuncio-") === 0 && !isNaN(parseInt(divId.split("-")[1])))
    return divId;
}

var adId = getAdId();
var divId = getDivId();
var popup = scr.getAttribute("data-popup") === "true";

document.onclick = function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  var tag = target.getAttribute('gc-tag');
  if (!tag) tag = '';
  var parentWindow = popup ? parent.window.opener : window.parent;

  parentWindow.handleClick(adId + "," + divId + "," + tag);
};