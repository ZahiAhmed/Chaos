json.array! @text_channels.each do |text_channel|
    json.partial! "text_channel", text_channel: text_channel
end