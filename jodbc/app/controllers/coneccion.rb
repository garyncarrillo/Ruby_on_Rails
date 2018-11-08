require 'odbc_utf8'
require 'JSON'
#  insertar, consultar e eliminar
# https://richonrails.com/articles/using-odbc-in-ruby
# gem install ruby-odbc


# https://stackoverflow.com/questions/3226054/how-to-convert-a-ruby-object-to-json
class Ingresos
	attr_accessor :fecha , :valor
	def as_json(options={})
		{
			fecha: @fecha ,
			valor: @valor
	    }
	end 
    def to_json(*option)
    	as_json(*option).to_json(*option)
    end 
   
end 


   p = Ingresos.new 
   client = ODBC.connect("SUBSIDIO", "gaca1186", "papa")
   sql = "SELECT * FROM selinlib.jingreso"
   statement = client.prepare(sql)
   statement.execute
   @v = []
   while row = statement.fetch
      p.fecha = row[0]
      p.valor = row[1]
      #puts p.to_json
      @v.push p.to_json
    end
    
    @h = {:some_key => @v, status: :ok}
    @r =JSON.pretty_generate(@h)
     
    File.open('text.txt', 'w') do |f2|
      # '\n' es el retorno de carro
      f2.puts @r
    end
    puts @r

    statement.drop


