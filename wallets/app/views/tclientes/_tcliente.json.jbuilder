json.extract! tcliente, :id, :idcliente, :nombres, :apellidos, :direccion, :celular, :correo, :estado, :fecgrab, :usergrab, :created_at, :updated_at
json.url tcliente_url(tcliente, format: :json)
