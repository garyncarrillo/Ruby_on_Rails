var gcconfig = {
  endpoint: "https://gestoranuncios.todo1.com/api/jsonws/invoke",
  configCmd: "{\"/gestor-campanas-portlet.adconfigquery/query\":{}}",
  eventsCmd: "{\"/gestor-campanas-portlet.eventreporter/report\":{}}",
  imagesUrl: "https://gestoranuncios.todo1.com/docs/gestor/js/img/",
  contentScriptPath: "https://gestoranuncios.todo1.com/docs/gestor/js/gc-content.js",
  errorContent: "https://gestoranuncios.todo1.com/docs/gestor/error.html",
  friendlyErrorContent: "https://gestoranuncios.todo1.com/docs/gestor/error-friendly.html",
  timeout: 90000,
  adPostponeHours: 6,
  tokenRenovationTime: 8,
  cookieExpirationTime: 8
};
