@servers.each do |server|
    json.set! server.id do
        json.id server.id
        json.name server.server_name
        json.ownerId server.owner_id
        json.owner server.owner.username
        json.created_at server.created_at
    end
end