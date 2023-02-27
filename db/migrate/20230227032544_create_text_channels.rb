class CreateTextChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :text_channels do |t|
      t.references :server, null: false, foreign_key: {to_table: :servers}
      t.references :server_owner, null: false, foreign_key: {to_table: :users}
      t.string :topic, null: false 
      t.timestamps
    end
  end
end
