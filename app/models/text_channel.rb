# == Schema Information
#
# Table name: text_channels
#
#  id              :bigint           not null, primary key
#  server_id       :bigint           not null
#  server_owner_id :bigint           not null
#  topic           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
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

    # has_many :messages, 
    #     primary_key: :id,
    #     foreign_key: :channel_id,
    #     class_name: :Message,
    #     dependent: :destroy
end
