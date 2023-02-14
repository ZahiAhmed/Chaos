json.array! @servers.each do |server|
    json.partial! "server", server: server
      json.members do
        json.array!(server.members) do |member|
          json.extract! member, :member_id
        end
    end
end