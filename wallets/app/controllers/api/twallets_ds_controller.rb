class Api::TwalletsDsController < ApplicationController

  def show_Tipos_Cuotas
    @tcuota = Tcuotum.all
    render  json:{clientes: @tcuota}, status: :ok 
  end

  def show_Tipos_Interes
    @tTintere = Tintere.all
    render  json:{clientes: @tTintere}, status: :ok 
  end

  def show_creditos
    @twallets_cs = TwalletsC.all
    render  json:{clientes: @twallets_cs}, status: :ok 
  end

  def crear_credito
     @Documento =params[:pdocumento]
     @Numero_cuota =params[:nro_cuotas]
     @Tipo_pagos =params[:Tipo_pagos]
     @Intereses =params[:Interes]
     @Valor_prestamo =params[:Valor_p]
     @Fecha_inicio =params[:Fecha_ini]
     @Fecha_final =params[:Fecha_fin]
     @Usuario =params[:Usuario]
     @Resultado="";

     @estado ="activo"
     @Resultado = TwalletsC.where(Idcliente:@Documento , estado:@estado)
     @idcredito = nil;
     if @Resultado.length > 0 
        @Resultado.each do |row|  
          @idcredito = row.idcredito
          puts "Ya tiene un credito y no se le puede asignara";
        end
    end
    if @idcredito == nil
             @Total= (@Valor_prestamo.to_f) + (@Valor_prestamo.to_f*@Intereses.to_f)
             @Fecha=Time.now
             @Fecha = @Fecha.strftime("%Y%m%d") 
             @estado="activo"
             @Resultado = TwalletsC.create ([{idcredito: @Documento, idcliente: @Documento, numero_cuota: @Numero_cuota ,idcuota: @Numero_cuota, numero_cuota_pendiente: @Numero_cuota, idpago: @Tipo_pagos,
                idinteres:@Intereses , valor_capital: @Valor_prestamo , valor_capital_pagado: 0,valor_interes_pagado: 0, valor_interes_mora_pagado: 0, idinteres_mora: 0, valor_mora: 0, valor_interes:@Total, fechainicio: @Fecha_inicio , fechafin: @Fecha_final,
                fecgrab: @Fecha, usergrab: @Usuario , estado: @estado }]) 
    else
            puts "Ya tiene "+@idcredito

    end
    #Crear el credito

    
    render json:{clientes: @Resultado}, status: :ok
  end


	def aplicar_pago
		@Documento = params[:pdocumento]
		@idcobrador = params[:pidcobrador]
		@Valor = params[:pvalor]
		@estado ="activo"
    puts "***************************"+@Documento
		@Resultado = TwalletsC.where(Idcliente:@Documento , estado:@estado)
	
		@idcredito =" "
		if @Resultado.length > 0 
			  @Resultado.each do |row|  
				@idcredito = row.idcredito
   				puts row.idcliente
   				puts row.idcuota
    		end  
      		     #Crear el detalle del credito
       			 @maximo_pago_credito = TwallesD.where(Idcredito:@Documento).maximum('numero_pago')

      			 if (@maximo_pago_credito != nil)
      			 	puts "El pago maximo realizado es "
      			    puts @maximo_pago_credito
      			 else
      			 	@maximo_pago_credito = 0
      			 end 
        		 @maximo_pago_credito = @maximo_pago_credito +1
        		 @pago_capital=0
        		 @pago_interes=0
        		 @pago_mora=0
        		 @fecha_pago=Time.now
        		 @fecha_pago= @fecha_pago.strftime("%Y%m%d") 
        		 @fecgrab= Time.now
        		 @dias_mora=0
        		 @estado=33

        			#.to_s  convertir a String
        			#.to_f  convertir a Double

        			#
        			#https://www.youtube.com/watch?v=jb8hKoouhBw
        		    
              @create_pago = TwallesD.create ([{idcredito: @Documento, idcobrador: @idcobrador, numero_pago: @maximo_pago_credito,valor_recaudado: @Valor, pago_capital: @pago_capital , pago_interes: @pago_interes, pago_mora: @pago_mora  , fecha_pago: @fecha_pago , fecgrab: @fecgrab, usergrab: @idcobrador.to_s, dias_mora: @dias_mora , estado: @estado}])
        	

		         if @create_pago.length

        		    	@modelo = TwalletsC.where(Idcliente:@Documento , estado:'activo')
        		    	if @modelo.length>0
        		    		    @modelo.each do |row|  
            						    #puts row.numero_cuota
               						  #puts row.valor_capital_pagado
                            @Valor_pag = (row.valor_capital_pagado.to_f) + (@Valor.to_f)
               						  @saldo_actual = (row.valor_interes.to_f) - (@Valor.to_f)
               						  @cuota_actual =(row.numero_cuota.to_f)+(@maximo_pago_credito.to_f)*(-1)

            		    			  @modelo.update(numero_cuota_pendiente: @cuota_actual , valor_interes: @saldo_actual , valor_capital_pagado: @Valor_pag) 
            		    		   	puts "busqueda cabecera para modificar"
            				   end 
        		    	else
        		    			puts "no de pudo modificar la cabecera     "
        		    	end 		
		    	         puts "Guardo Correctamente "
		        else
		    	    puts "No se guardo Correctamente "	
		        end 
   		 else
   	 			puts 'La persona no tiene credito Vigente'
    	end
      	render json:{clientes: @Resultado}, status: :ok
    end

    def get_My_Wallets
    	@Cobrador = params[ :pidcobrador]
    	@Fecha = params[ :pfecha]
    	@resultado =TwallesD.where(usergrab:@Cobrador , fecha_pago:@Fecha)
    	render json:{Cobrador: @resultado}, status: :ok
    end 	
end
