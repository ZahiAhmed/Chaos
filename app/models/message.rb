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
