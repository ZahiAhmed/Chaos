json.array! @servers.each do |server|
    json.partial! "server", server: server
      json.members do
        json.array!(server.members) do |member|
          json.extract! member, :member_id
        end
      end
      json.textChannels do
        json.array!(server.text_channels) do |text_channel|
          json.extract! text_channel, :id
        end
      end
end