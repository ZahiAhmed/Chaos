@text_channels.each do |text_channel|
    json.set! text_channel.id do
        json.partial! "text_channel", text_channel: text_channel
    end
end