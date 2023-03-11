# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  server_name :string           not null
#  description :string
#  owner_id    :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord
    validates :owner_id, presence: true
    validates :server_name, length: {in: 1..30}

    belongs_to :owner,
        primary_key: :id,
        foreign_key: :owner_id,
        class_name: :User

    has_many :members,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Member

    has_many :text_channels,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :TextChannel,
        dependent: :destroy
end
