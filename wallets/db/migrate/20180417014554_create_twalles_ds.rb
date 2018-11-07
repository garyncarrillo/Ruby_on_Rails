class CreateTwallesDs < ActiveRecord::Migration[5.1]
  def change
    create_table :twalles_ds do |t|
      t.string :idcredito
      t.string :idcobrador
      t.decimal :numero_pago
      t.decimal :valor_recaudado
      t.decimal :pago_capital
      t.decimal :pago_interes
      t.decimal :pago_mora
      t.string :fecha_pago
      t.string :fecgrab
      t.string :usergrab
      t.string :dias_mora
      t.decimal :estado

      t.timestamps
    end
  end
end
