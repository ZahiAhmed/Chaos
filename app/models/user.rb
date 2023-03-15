# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :username, length: { in: 3..30 }, uniqueness: {case_sensitive: false}, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, length: {in: 3..255 }, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
  
    before_validation :ensure_session_token
  
    def generate_unique_session_token
      while true 
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
      end
    end 
  
    def ensure_session_token
      self.session_token ||= generate_unique_session_token
    end
  
    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    def self.find_by_credentials(credential, password)
      user = User.find_by(username: credential) || User.find_by(email: credential)
      if user&.authenticate(password)
        return user
      else 
        nil
      end
    end

    has_many :friends,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: :Friendship

    has_many :friend_of, 
      primary_key: :id,
      foreign_key: :friend_id,
      class_name: :Friendship

    has_many :servers,
      primary_key: :id,
      foreign_key: :owner_id,
      class_name: :Server

    has_many :member_of,
      primary_key: :id,
      foreign_key: :member_id,
      class_name: :Member

    has_many :servers_in,
      through: :member_of,
      source: :server

    has_many :text_channels,
      primary_key: :id,
      foreign_key: :server_owner_id,
      class_name: :TextChannel

    has_many :messages,
      primary_key: :id,
      foreign_key: :sender_id,
      class_name: :Message
end
