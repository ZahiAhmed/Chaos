@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :channel_id, :sender_id, :body, :created_at, :updated_at
        json.sender message.sender.username
    end
end