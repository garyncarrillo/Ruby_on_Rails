class CreateTclientes < ActiveRecord::Migration[5.1]
  def change
    create_table :tclientes do |t|
      t.string :idcliente
      t.string :nombres
      t.string :apellidos
      t.string :direccion
      t.string :celular
      t.string :correo
      t.string :estado
      t.string :fecgrab
      t.string :usergrab

      t.timestamps
    end
  end
end
