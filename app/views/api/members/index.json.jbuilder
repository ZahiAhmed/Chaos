@members.each do |member|
    json.set! member.member.id do
        json.id member.member.id
        json.username member.member.username
        json.email member.member.email
        json.memberId member.id
        json.server member.server.id
        json.owner member.owner
        json.created_at member.member.created_at
        json.joined_at member.created_at
    end
end