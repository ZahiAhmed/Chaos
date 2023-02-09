# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  friend_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friendship < ApplicationRecord
    validates :user_id, :friend_id, presence: true
    validates :friend_id, uniqueness: { scope: :user_id }

    validate :not_self

    def not_self
        self.errors.add("Cannot friend self") if(:user_id == :friend_id) 
    end
    
    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :friend,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :User
end
