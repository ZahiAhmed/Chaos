class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :server_name, null: false
      t.string :description 
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
