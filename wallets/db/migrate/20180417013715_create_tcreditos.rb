class CreateTcreditos < ActiveRecord::Migration[5.1]
  def change
    create_table :tcreditos do |t|
      t.string :idcredito
      t.string :valor
      t.string :descripcion
      t.string :estado

      t.timestamps
    end
  end
end
