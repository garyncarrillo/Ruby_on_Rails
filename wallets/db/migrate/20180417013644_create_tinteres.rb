class CreateTinteres < ActiveRecord::Migration[5.1]
  def change
    create_table :tinteres do |t|
      t.string :idinteres
      t.string :valor

      t.timestamps
    end
  end
end
