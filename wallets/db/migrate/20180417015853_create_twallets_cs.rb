class CreateTwalletsCs < ActiveRecord::Migration[5.1]
  def change
    create_table :twallets_cs do |t|
      t.string :idcredito
      t.string :idcliente
      t.string :idcuota
      t.string :idpago
      t.string :idinteres
      t.string :idinteres_mora
      t.decimal :valor_capital
      t.decimal :valor_interes
      t.decimal :valor_mora
      t.decimal :valor_capital_pagado
      t.decimal :valor_interes_pagado
      t.decimal :valor_interes_mora_pagado
      t.decimal :numero_cuota
      t.decimal :numero_cuota_pendiente
      t.string :fechainicio
      t.string :fechafin
      t.string :fecgrab
      t.string :usergrab
      t.string :estado

      t.timestamps
    end
  end
end
