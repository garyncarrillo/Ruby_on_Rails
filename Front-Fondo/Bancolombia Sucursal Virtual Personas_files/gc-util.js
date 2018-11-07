var gcutil = {

  /* ********** AJAX ********** */

  handleResponse: function (errorHandling, callback) {
    if (gcutil.isNotDef(errorHandling)) errorHandling = function () {
    };
    if (gcutil.isNotDef(callback)) callback = function () {
    };

    return function () {
      if (this.readyState !== 4) return;
      if (this.status !== 200) {
        errorHandling(this);
        return;
      }
      if (!gcutil.isJson(this)) {
        callback(this.responseText);
        return;
      }
      var json = JSON.parse(this.responseText);
      if (typeof json === "string") json = JSON.parse(json);
      if (json.exception) errorHandling(this);
      else callback(json);
    };
  },

  ajaxRequest: function (urlParam, callback, errorHandling) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = gcutil.handleResponse(errorHandling, callback);
    xhttp.open("GET", urlParam, true);
    xhttp.timeout = gcconfig.timeout;
    xhttp.send();
  },

  ajaxPostRequest: function (urlParam, body, callback, errorHandling) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = gcutil.handleResponse(errorHandling, callback);
    xhttp.open("POST", urlParam, true);
    xhttp.timeout = gcconfig.timeout;
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(body);
  },

  isJson: function (xhttp) {
    return xhttp.getResponseHeader('content-type').indexOf("json") !== -1;
  },

  /* ********** COOKIES ********** */

  cookiestore: {
    s: document.cookie,
    type: 'cookie',
    set: function (name, value, expires, path, secure) {
      var valueToUse;
      if (!gcutil.isNotDef(value) && typeof (value) === "object")
        valueToUse = JSON.stringify(value);
      else
        valueToUse = encodeURIComponent(value);

      document.cookie = name + "=" + valueToUse +
        (expires ? ("; expires=" + new Date(expires).toUTCString()) : '') +
        "; path=" + (path || '/') +
        (secure ? "; secure" : '');
    },
    get: function (name, raw) {
      var cookies = this.getAll();
      if (!cookies.hasOwnProperty(name)) return undefined;
      if (raw) return cookies[name];
      return this.processValue(cookies[name]);
    },
    processValue: function (value) {
      if (value.substring(0, 1) === "{") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      if (gcutil.isNotDef(value) || value === "undefined") return undefined;
      return decodeURIComponent(value);
    },
    getAll: function () {
      var cookies = document.cookie.split('; ');
      var result = {};
      if (cookies.length === 1 && cookies[0] === '') return result;
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        result[cookie[0]] = cookie[1];
      }
      return result;
    }
  },

  cookiesDates: {},

  saveConfigMap: function (adId, userId, configMap) {
    var id = "configMap" + adId + "-" + (userId || "");
    var currentConfigMap = gcutil.cookiestore.get(id, true);

    if (gcutil.isNotDef(currentConfigMap)) {
      gcutil.cookiesDates[id] =
        new Date().getTime() + gcconfig.cookieExpirationTime * 60 * 1000;
    }
    try {
      gcutil.cookiestore.set(id, configMap, gcutil.cookiesDates[id]);
    } catch (ignore) {
    }
  },

  loadConfigMap: function (adId, userId) {
    var configMap;
    try {
      configMap = gcutil.cookiestore.get(
        "configMap" + adId + "-" + (userId || ""));
    } catch (ignore) {
    }
    if (gcutil.isNotDef(configMap)) configMap = {};

    return configMap;
  },

  /*  ********** TOKEN ********** */

  token: {},
  tokenDate: {},

  getToken: function (divId) {
    return new Promise(function (resolve) {
      var now = new Date();
      var maxLive = gcconfig.tokenRenovationTime * 60 * 1000;

      if (gcutil.isNotDef(gcutil.tokenDate[divId]) ||
        gcutil.tokenDate[divId].getTime() > (now.getTime() + maxLive)) {

        gcutil.token[divId] = encodeURIComponent(getGestorAdToken(divId));
        gcutil.tokenDate[divId] = now;
      }
      resolve(gcutil.token[divId]);
    });
  },

  /*  ********** OTHER ********** */

  isNotDef: function (param) {
    return typeof param === "undefined";
  },

  getKeys: function (obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  },

  obfuscate: function (input) {
    var bytes = [];
    input = input.toString();
    for (var i = 0; i < input.length; i++) {
      var charCode = input.charCodeAt(i);
      charCode = String("000" + charCode).slice(-3);
      bytes.push(charCode);
    }
    return bytes.join('');
  }
};