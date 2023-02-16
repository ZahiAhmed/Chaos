class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: { to_table: :users}
      t.references :channel, null: false, foreign_key: {to_table: :text_channels}
      t.text :body, null: false
      t.timestamps
    end
  end
end
