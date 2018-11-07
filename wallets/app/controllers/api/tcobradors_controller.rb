class Api::TcobradorsController < ApplicationController
	before_action :set_tcobradors, only: [:show, :update, :destroys]
	
	def index
	 	@tcobradors = Tcobrador.all
		render json:@tcobradors

	end
	
	def show_list
		@tcobradors = Tcobrador.all
		render json:{clientes: @tcobradors}, status: :ok
	end 

	def control_acceso 
			@user_email = params[:pcorreo]
			@user_clave = params[:pclave]
			@control = Tcobrador.where(correo:@user_email ,  clave:@user_clave)
			@error ='WRONG'
			if(@control)
					@error ='OK'
			end
			render json:{clientes: @control}, status: :ok

			


	end 

end
