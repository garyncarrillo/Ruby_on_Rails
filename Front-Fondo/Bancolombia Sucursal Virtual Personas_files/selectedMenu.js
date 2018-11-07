var selectedMenuItem = null;
function preventDefault(event){
	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;	
}


function initializeMenuNavigation() {		
	initializeMenuNavigationWithMouseover();
	initializeMenuEntryEventWhenClicked();
	initializeMenuNavigationEventWhenLeft();
}

function initializeMenuNavigationWithMouseover(){
	$('#firstLevelMenuContainer li:not(.active)').click(function(event) {
		preventDefault(event);
		$(".nestedTabMenu .active").removeClass("active");
		
		if($(this).closest("li").hasClass("inicio")) {
			$(this).closest("li").addClass("active");
		}
			
		if($(this).hasClass("hasSecondLevelMenu")) {
			$(this).children("a").tab('show');
		}
	});
}

function initializeMenuEntryEventWhenClicked(){
	$('.firstLevelMenu li.finalMenuItem:not(.selected), .secondLevelMenu li.finalMenuItem:not(.selected)').click(function(event) {
		preventDefault(event);
		var id = $(this).attr("id");
		changeSelectedItems(id);
	});	
}

function initializeMenuNavigationEventWhenLeft(){
	$('.nestedTabMenu').mouseleave(function(event) {
		preventDefault(event);
		$(".nestedTabMenu .active").removeClass("active");
		if(selectedMenuItem != null)
			addClassesToMenuEntry(selectedMenuItem, "active");
	});
}

function addClassesToMenuEntry(menuElement, classes){
	menuElement.addClass(classes);
	var selectedMenu = menuElement.parent();
	/**** Cuando se selecciona una opcion de segundo nivel, se debe buscar y pintar tambien a la opcion de primer menu padre de esta ****/
	if(selectedMenu.hasClass("secondLevelMenu")){
		selectedMenu.parent().addClass(classes);
		var secondLevelMenuId =	selectedMenu.parent().attr("id");
		var firstLevelMenuItem = $(".firstLevelMenu li a[href=#value]".replace("value", secondLevelMenuId)).parent();
		firstLevelMenuItem.addClass(classes);
	}
}

function changeSelectedItems(selectedMenuItemId) {
	selectedMenuItem = $('#' + selectedMenuItemId);
	$(".nestedTabMenu .selected").removeClass("selected active");
	addClassesToMenuEntry(selectedMenuItem, "selected active");
}

function isFuduCuenta(type){
	if ( type!= null && type == "FDC" || type == "FDR" || type == "FIN" || type == "FDD" || type == "FPS" || type == "IND" || type == "FAS" || type == "FEX" || type == "FAD" || type == "RAC" || type == "RUS" || type == "RTE" || type == "R18") {
		return true;
	}
	return false;	
}

function changeItemByType(type) {
	if(type == "CC" || type == "CA"){
		//cta ahorro cte
		type = 'menu_prod_cuenta';
		fillSecondMenu('');
	}else{
		if(type == "TC" || type == "TV"){
			//tarj cred
			type = 'menu_prod_tarjeta';
		}else{
			if(type == "PR" || type == "CH"){
				//credito
				type = 'menu_prod_credito';
			}else{
				if(isFuduCuenta(type)){
					//fiduciario
					type = 'menu_prod_fondo';
				}else{
					if(type == "IV"){
						//inv virtual
						type = 'menu_prod_inversionVirtual';
					}else{
						alert('Tipo no contemplado. selectedMenu.js, line 91');
					}
				}
			}
		}
	
	}
	changeSelectedItems(type);
}

function fillSecondMenu(menu){
	if(menu!==''){
		$.ajax({  
			url: menu,
			success: function(reponseHtml) {
					$("#menusecond").html(reponseHtml);
			}
		});
	}else{
		$("#menusecond").html('');			
	}
}