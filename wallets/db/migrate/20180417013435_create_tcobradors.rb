class CreateTcobradors < ActiveRecord::Migration[5.1]
  def change
    create_table :tcobradors do |t|
      t.string :idcobrador
      t.string :clave
      t.string :correo
      t.string :celular
      t.string :direccion
      t.string :estado

      t.timestamps
    end
  end
end
