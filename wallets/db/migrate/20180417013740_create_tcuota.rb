class CreateTcuota < ActiveRecord::Migration[5.1]
  def change
    create_table :tcuota do |t|
      t.string :idcuota
      t.string :valor

      t.timestamps
    end
  end
end
