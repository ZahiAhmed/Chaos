class ChangeFriendships < ActiveRecord::Migration[7.0]
  def change
    add_column :friendships, :pending, :boolean, default: true
  end
end
