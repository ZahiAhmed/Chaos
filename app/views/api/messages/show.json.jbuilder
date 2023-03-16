json.extract! @message, :id, :channel_id, :sender_id, :body, :created_at, :updated_at
json.sender @message.sender.username
