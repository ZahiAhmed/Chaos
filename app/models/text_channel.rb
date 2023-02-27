class TextChannel < ApplicationRecord
    validates :topic, presence: true

    belongs_to :server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server

    belongs_to :server_owner,
        primary_key: :id, 
        foreign_key: :server_owner_id,
        class_name: :User

    has_many :messages, 
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :Message,
        dependent: :destroy
end
