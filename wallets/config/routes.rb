Rails.application.routes.draw do
  get 'pagos/show_cobrador'

  get 'pagos/create'

  get 'credito/show'

  get 'credito/create'

  get 'credito/ventas'



  get 'credito/pagos'

  get 'credito/create'
  get 'credito/pagos_cobrador'

  get 'main/menu'

  get 'login/index'


  resources :twallets_cs
  resources :twalles_ds
  resources :ttpagos
  resources :tcuota
  resources :tcreditos
  resources :tinteres
  resources :tclientes
  resources :tcobradors
   # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   namespace :api do
     resources :tcobradors 
     post '/login', to: 'tcobradors#control_acceso'
     get '/login2', to: 'tcobradors#control_acceso'
      get '/cobradores', to: 'tcobradors#show_list'
     get '/cliente', to: 'tclientes#getcliente'
     
     get '/pagos', to: 'twallets_ds#aplicar_pago'
     get '/c_credito', to: 'twallets_ds#crear_credito'
     get '/my_pagos', to: 'twallets_ds#get_My_Wallets'
     get '/show_creditos', to: 'twallets_ds#show_creditos'
     get '/show_Tipos_Cuotas', to: 'twallets_ds#show_Tipos_Cuotas'
     get '/show_Tipos_Interes', to: 'twallets_ds#show_Tipos_Interes'
    
      
     
        


  	   #resources :tcobradors do 
   	   #  collection do 
   	   #  get "control_acceso"
   	   # end
   	   #end


  end
end



