class Api::TclientesController < ApplicationController
	
	def getcliente
		@Documento = params[:pdocumento]
		@control = Tcliente.where idcliente:@Documento
		@error ='WRONG'
		if(@control)
			@error ='OK'
		end
		render json:{clientes: @control}, status: :ok
	end

end
