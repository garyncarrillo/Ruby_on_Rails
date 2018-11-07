	/* Esta variable siver para tener la variale anterior al cambio cuando se le pone vacio*/
var ante= "";
var gridNamePage="";

	function nickNameFormatter(cellvalue, options, rowObject,gridName) {
		gridNamePage=gridName;
		cellvalue=getValueWithoutFormat(cellvalue);
		
	    return '<DIV class="celdaBotonEditar"><DIV class="pencil" style="'+calcPorcentage(gridName,'nickName',26)+'"><span>'+cellvalue+'</span></DIV><DIV><button id=\'img'+rowObject.id+'\' class="icon-editar botonEditar " onclick="edit(\''+rowObject.id+'\',\''+gridName+'\')"/></DIV></DIV>';
	}	
	function edit(rowid,gridName) {
		 jQuery(gridName).jqGrid('setColProp','nickName',{editable:true});
	}
	function calcPorcentage(gridName,colName,width){
		//return "width:"+(97-(width/getColWidth(gridName,colName)*100))+"%";
		return "width:73%";	
	}
	function myelem (value, options) {
	 var divResult= document.createElement("DIV");
	 var div= document.createElement("DIV");	 
	 var div1= document.createElement("DIV");
	 div1.className="pencil";
	 div1.style.cssText=calcPorcentage(gridNamePage,'nickName',28);	
	 var div2= document.createElement("DIV");
	 div2.style.cssText="width:auto;float:left;text-align:left";
	 var saveButton=document.createElement("BUTTON");	 
	 saveButton.setAttribute("id", "b1"+options.id);
	 var cancelButton=document.createElement("BUTTON");
	 cancelButton.setAttribute("id", "b2"+options.id);
	 var el = document.createElement("input");	
	 saveButton.className = "icon-editar_aprobar botonEditarAprobar";
	 saveButton.onclick = function(event){
		var irow=jQuery(gridNamePage).jqGrid('getInd',jQuery(gridNamePage).jqGrid ('getGridParam', 'selrow'));
		jQuery(gridNamePage).jqGrid ('saveCell',irow,getColIndex(gridNamePage,'nickName'));
	  };
	 cancelButton.onclick = function(event){
		jQuery(gridNamePage).jqGrid('setColProp','nickName',{editable:false});
		var irow=jQuery(gridNamePage).jqGrid('getInd',jQuery(gridNamePage).jqGrid ('getGridParam', 'selrow'));
		jQuery(gridNamePage).jqGrid ('restoreCell',irow,getColIndex(gridNamePage,'nickName'));
	 };	 
	 cancelButton.className = "icon-editar_cancelar botonEditarCancelar";
	  el.setAttribute("id", "text"+options.id);
	  el.type="text";
	  el.style.cssText = 'width:100% !important';
	  el.className="form-control";
	  el.maxLength=40;
	  el.value = getValueWithoutFormat(value);
	  ante=el.value;
	  div1.appendChild(el);
	  div2.appendChild(saveButton);
	  div2.appendChild(cancelButton);
	  div.appendChild(div1);
	  div.appendChild(div2);
	  divResult.appendChild(div);
	  try{
		el.onkeypress = isAlfaNumerico;
		el.onkeydown =  mykeyhandler;
	  }
	  catch(e){}
	  return div;
	}
	function myvalue(divParent, operation, value,gridName) {
		var elem=document.getElementById("text"+divParent[0].id);
		jQuery(gridName).jqGrid('setColProp','nickName',{editable:false});		
		if(operation == 'get') {
			if($.trim(elem.value)!=''){
				return elem.value;
			}else{
				return ante;
			}
		} else if(operation == 'set') {
			elem.value=value;	
		}
		return value;
	}
	
	function getValueWithoutFormat(value){
		if(isValidValue(value)){
			var start = value.toLowerCase().indexOf('<span>')+6;
			var end = value.toLowerCase().indexOf('</span>');
			if(start>0&&end>0){
				return value.substring(start, end);
			}
		}
		return value;
	}
	
function Evento(e,d) {
  if(!e) this.evento=window.event;
  else this.evento=e;
  
  this.initTeclas();
  // capturar tecla del evento
  this.teclaSys=this.evento.keyCode;
  this.tecla=this.evento.which;
  
  this.caracter=String.fromCharCode(this.tecla);
  this.alt=this.evento.altKey;
  this.ctrl=this.evento.ctrlKey;
  this.shift=this.evento.shiftKey;

  if(this.evento.srcElement) this.elemento=this.evento.srcElement;
	else if(this.evento.target) this.elemento=this.evento.target;
  
  if(d) alert(this.toString());
}

Evento.prototype.cancelar = function() {
  try { this.evento.cancelBubble = true; } catch(e) {}
  try { if(this.evento.stopPropagation)  this.evento.preventDefault();} catch(e) {}
  try { if(this.evento.returnValue) this.evento.returnValue = false; } catch(e) {}
  try { if(this.evento.keyCode) this.evento.keyCode = 0;} catch(e) {}
};


function isAlfaNumerico(e) {
	var even=new Evento(e);
	var value;
	ev=even.tecla;
	evSys=even.teclaSys;
	if(ev!=null&&evSys!=ev){
		if(evSys!=13 &&evSys!=46 &&evSys!=8 &&evSys!=37 &&evSys!=39&&evSys!=36&&evSys!=35&&ev!=118&&ev!=99&&ev!=120&&ev!=122){
			value=String.fromCharCode(ev);
		}else{
			return true;
		}
	}
	else{
		if(ev!=0&&ev!=8&&evSys!=13){
			value=String.fromCharCode(evSys);
		}else{
			return true;
		}
	}	
	var n = value.match(/[^A-Za-z0-9ñÑáÁéÉíÍóÓúÚ\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00D1\u00F1\n\s-]/);
	if (isValidValue(n)){
		even.cancelar();
	}
}
function isValidValue(value){
	if(value==undefined || value==null || value==""){
		return false;
	}else{
		return true;
	}
}
Evento.prototype.initTeclas = function() {
};

function subscribeErrorUpdateNickname(url){
	$.subscribe('onCellEditErrorTopicsUpdateNickname', function(event, data) {			
		window.location.href = url;
		return false;
	});
}


