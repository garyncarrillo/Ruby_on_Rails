$( ".item_third_level_menu" ).hover(function() {$( this ).toggleClass( "item_third_active" ).next().stop( true, true ).slideToggle();});

$(".dropdown-hover").hover(function() {

	var elem = $(this);

	// indicador que el mouse ha entrado al elemento padre
	elem.attr('close', 'true');

	setTimeout(function () {
		// mostramos submenu
		if (elem.attr('close') == 'true') {
			$(".dropdown-content, .triangle-up-hover").addClass( "dropdown-open" );
		}
    }, 300);

	},function(){
		var elem = $(this);

		// indicador que el mouse ha entrado al elemento padre
		elem.attr('close', 'false');
		var closeTime =setTimeout(function () {

			// mostramos submenu
			if (elem.attr('close') == 'false') {
				$(".dropdown-content, .triangle-up-hover").removeClass( "dropdown-open" );
			}
	    }, 300);

		if (elem.attr('close') == 'true') {
			 clearTimeout(closeTime);
		}
	}
);

$( "li.nav_Itemlist:first" ).hover(
	function() {
		$("li.nav_Itemlist span.icon-SolicitarProductos" ).addClass("icon-SolicitarProductos_hover");
		$("li.nav_Itemlist span.icon-SolicitarProductos" ).removeClass("icon-SolicitarProductos");
	}, 	function() {
			$( "li.nav_Itemlist span.icon-SolicitarProductos_hover" ).addClass("icon-SolicitarProductos");
			$( "li.nav_Itemlist span.icon-SolicitarProductos_hover" ).removeClass("icon-SolicitarProductos_hover");
		}
);

$( "li.nav_Itemlist:eq(1)" ).hover(
  function() {
    $("li.nav_Itemlist span.solicitarproductos-icon_1" ).addClass("solicitarproductos-icon_2");
    $("li.nav_Itemlist span.solicitarproductos-icon_1" ).removeClass("solicitarproductos-icon_1");
  }, 	function() {
    $( "li.nav_Itemlist span.solicitarproductos-icon_2" ).addClass("solicitarproductos-icon_1");
    $( "li.nav_Itemlist span.solicitarproductos-icon_2" ).removeClass("solicitarproductos-icon_2");
  }
);

$(".item_third_level_menu").on("click", function(){
	$('.mega-dropdown-menu').css({'display': 'none'});
	$(".has-submenu").removeClass(".highlighted");
	$('.firt_level_menu').removeClass("open");
	$(".dropdown-content").removeClass( "dropdown-open" );
	$(".triangle-up-hover").removeClass( "dropdown-open" );
	hiddenBanner();
});

/**To Inicio from Logo BC**/
$("#imageLogoIntegration").unbind().bind("click",function(){
	$("#home").click();
	breadCrumb_dinamic('','','');
});

$("#home").unbind().bind("click",function(e) {
	loadDeposits("home");
	breadCrumb_dinamic('','','');
	hiddenShow("home",".main-right-menu");
	hiddenShowBanner();
});

function hiddenShowBanner(){
	var msg = $('#msgProductSelected').text();
	loadForm();
	if(msg != '' ){
		$('#contenedorBanner').attr('style','display:block');
	}else{
		$('#contenedorBanner').attr('style','display:none');
	}
	$('#bannerContainerError').attr('style','display:none');
}

function hiddenBanner(){
	$('#bannerContainerError').attr('style','display:none');
	$('#contenedorBanner').attr('style','display:none');
}

$("#breadcrumbId").on("click", ".dinamic_breadcrumb_link", function(){
	$("#home").click();
});

/**INICIO OPCIONES ACCESOS RAPIDOS**/
/*Actualizacion de Datos - Datos personales - Link*/
$("#link_update_data").unbind().bind("click",function(e) {
	var url=context+"/pages/jsp-ns/olb/ActiveRSACheck";
	ajaxRequestMenu(url,"ACTDATOS","DATOSPERS","N",function() {
		invokeActionError('');
		breadCrum_link('link_datos_personales');
	});
});

/*Accesos Rapidos - Transferencias a cuentas Bc*/
$("#link_Transf_cBancolombia").unbind().bind("click",function(e) {
	var url=context+"/pages/jsp/fundtransfer/invokeBCTransfer.jsp";
	ajaxRequestMenu(url,"TRANSFER","TBC","N",function() {
		invokeActionError('');
		breadCrum_link('link_transf_aBancolombia');
	});
});

/*Accesos Rapidos - Pagos Facturas*/
$("#link_payments_bills1").unbind().bind("click",function(e) {
	var url=context+"/pages/jsp/billpayment/invokeBillPayment.jsp";
	ajaxRequestMenu(url,"PAY","PAYF","N",function() {
		invokeActionError('');
		breadCrum_link('link_payments_repf');
	});
});
/**FIN OPCIONES ACCESOS RAPIDOS**/

/**INICIO OPCIONES HEADER MENU**/

/*Colombia Points*/
$("#link_prod_puntos_colombia").unbind().bind("click",function() {
    redirectLoyalty();
});

$("#loyalty").unbind().bind("click",function() {
    redirectLoyalty();
});

function redirectLoyalty(){
    var url=context+"/pages/jsp-ns/olb/GetColPntsDetail";
    ajaxRequestMenu(url,"LOYALTY","LOYALTYDETAIL","N",function() {
        invokeActionError('');
        breadCrumb_dinamic('','','Puntos Colombia');
    });
}

/*Ayuda solicitar productos*/
$("#link_help_solicitarproductos").unbind().bind("click",function() {
	var properties = 'top=30,left=30,width=900,height=400,buttons=no,scrollbars=yes,location=no,menubar=no,resizable=yes,status=no,directories=no,toolbar=no';
	jumpSubmitProdPopUp('faq',properties);
});

$("#link_help_asesoria").unbind().bind("click",function() {
	var properties = 'top=1,left=1,width=1000,height=700,buttons=yes,scrollbars=yes,location=no,menubar=no,resizable=yes,status=no,directories=no,toolbar=no';
	jumpAsesoriaPopUp('ASESORIA','Asesoría',properties);
});

$("#link_help_seguridad").unbind().bind("click",function() {
	var properties = "top=1,left=20,width=900,height=700,buttons=yes,scrollbars=yes,location=no,menubar=no,resizable=yes,status=no,directories=no,toolbar=no";
	jumpSeguridadPopUp("SEGURIDAD","Seguridad",properties);
});

$("#link_help_buscar").unbind().bind("click",function() {
	jumpPuntosDeAtencionPopUp("top=1,left=20,width=900,height=700,buttons=yes,scrollbars=yes,location=no,menubar=no,resizable=yes,status=no,directories=no,toolbar=no");
});
/**FIN OPCIONES HEADER MENU**/

function onClickMenuItem(id,url,urlSubscribe,codmenu,codsubmenu,wizard,breadcrumb1,breadcrumb2,breadcrumb3){
	if(id=="item_link_home"){
		$("#home").click();
	}else{
		$('#contenedorBanner').attr('style','display:none');
	}

	var array_link = ["link_request_fri","link_request_rqc","link_request_roc","link_request_oc","link_request_rd","link_request_ex",
						"link_request_ic","link_request_tlp","link_request_soat"];
	if(id=="link_payments_ownCard" || id=="link_payments_cred" || id=="link_prod_pay_cred" || id=="link_prod_pay_ownCard"){
		$("#menusecond").html('');
		ajaxSubscribeRequestMenu(url,urlSubscribe,codmenu,codsubmenu,wizard);
		callBreadCrum(id,breadcrumb1,breadcrumb2,breadcrumb3);
	} else if (array_link.indexOf(id) != -1) {
		var tmpUrl = url.replace('/cb',"");
		jumpNewTab(tmpUrl);
	} else {
		ajaxRequestMenu(url,codmenu,codsubmenu,wizard,function() {
			invokeActionError('');
		});
		callBreadCrum(id,breadcrumb1,breadcrumb2,breadcrumb3);
	}
}

function callBreadCrum(id,breadcrumb1,breadcrumb2,breadcrumb3){
	breadCrumb_dinamic(breadcrumb1,breadcrumb2,breadcrumb3);
	hiddenShow(id,".main-right-menu");
}

function breadCrumb_dinamic(opc1,opc2,opc3){
	hiddenBanner();
	var breadcrump = '';

	if (opc1.length>0 ){
		breadcrump = breadcrump + '<li class="dinamic_breadcrumb_item">'+opc1+'</li>';
	}
	if( opc2.length>0 ){
		breadcrump = breadcrump + '<li class="dinamic_breadcrumb_item">'+opc2+'</li>';
	}
	if( opc3.length>0 ){
		breadcrump = breadcrump + '<li class="dinamic_breadcrumb_item dinamic_breadcrumb_item_last">'+opc3+'</li>';
	}

	$( ".dinamic_breadcrumb" ).empty();
	$( ".dinamic_breadcrumb" ).append(breadcrump);

};

function breadCrum_link(id_link) {
	try {
		if (id_link != null && id_link != '') {
			var str = $("#" + id_link).attr('onclick');
			if (str != undefined && str != null && str != '') {
				var params = str.split("onClickMenuItem(")[1].replace(/'/g, '').split(',');
				params[params.length - 1] = params[params.length - 1].replace(');', '');
				breadCrumb_dinamic(params[params.length - 3],params[params.length - 2], params[params.length - 1]);
			}
		}
	} catch (e) {
		return false;
	}
}

/*Función para ocultar y mostrar el panel lateral*/
function hiddenShow(id,strClassHide){
	$(strClassHide).show();
	$(".main-left-container").removeClass("main-left-container-100");

	if(id == "link_transf_irecep" || id == "link_transf_isend" || id == "link_transf_iaccregis"){
		$(strClassHide).hide();
		$(".main-left-container").addClass("main-left-container-100");
	}

	if(id!="link_datos_personales" || id!="link_datos_contacto"){
		$( "#menusecond" ).empty();
	}

}

var auxObj = {
	size: 0,
	get getSize() {
		return this.size;
	},
	set setSize(val) {
		this.size = val;
	}
};
