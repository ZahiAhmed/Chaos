# == Schema Information
#
# Table name: messsages
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  channel_id :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Messsage < ApplicationRecord
    validates :body, presence: true

    belongs_to :author,
        primary_key: :id, 
        foreign_key: :author_id,
        class_name: :User

    belongs_to :channel,
        primary_key: :id,
        foreign_key: :channel_id,
        class_name: :TextChannel

end
