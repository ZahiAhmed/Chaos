# == Schema Information
#
# Table name: members
#
#  id         :bigint           not null, primary key
#  member_id  :bigint           not null
#  server_id  :bigint           not null
#  owner      :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Member < ApplicationRecord
    validates :member_id, :server_id, presence: true
    validates :member_id, uniqueness: {scope: :server_id}
    validates :server_id, uniqueness: {scope: :member_id}
    validates :owner, inclusion: {in: [true, false]}

    belongs_to :server,
        primary_key: :id,
        foreign_key: :server_id,
        class_name: :Server

    belongs_to :member,
        primary_key: :id,
        foreign_key: :member_id,
        class_name: :User
end
