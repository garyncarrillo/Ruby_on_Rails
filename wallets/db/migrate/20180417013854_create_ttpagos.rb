class CreateTtpagos < ActiveRecord::Migration[5.1]
  def change
    create_table :ttpagos do |t|
      t.string :idpago
      t.string :descripcion

      t.timestamps
    end
  end
end
