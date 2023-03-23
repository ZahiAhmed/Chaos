# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  friend_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  pending    :boolean          default(TRUE)
#  confirmed  :boolean          default(TRUE)
#
class Friendship < ApplicationRecord
    validates :user_id, :friend_id, presence: true
    validates :friend_id, uniqueness: { scope: :user_id }
    validates :pending, :confirmed, inclusion: {in: [true,false]}

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :friend,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :User
end
