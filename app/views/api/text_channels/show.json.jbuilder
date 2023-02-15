json.text_channel do 
    json.partial!  "text_channel", text_channel: @text_channel
end

@text_channel.messages.each do |message| 
    json.messages do
        json.set! message.id do
            json.partial! "api/messages/message", message: message
        end
    end
end