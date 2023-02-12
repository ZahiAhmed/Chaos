class CreateMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :members do |t|
      t.references :member, null: false, foreign_key: {to_table: :users}
      t.references :server, null: false, foreign_key: {to_table: :servers}
      t.boolean :owner, null: false
      t.timestamps
    end
  end
end
