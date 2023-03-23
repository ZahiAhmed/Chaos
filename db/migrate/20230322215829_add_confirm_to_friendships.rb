class AddConfirmToFriendships < ActiveRecord::Migration[7.0]
  def change
    add_column :friendships, :confirmed, :boolean, default: true
  end
end
