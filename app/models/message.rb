# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  sender_id  :bigint           not null
#  channel_id :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord
    validates :body, presence: true

    belongs_to :sender,
        primary_key: :id, 
        foreign_key: :sender_id,
        class_name: :User

    belongs_to :channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :TextChannel
end
