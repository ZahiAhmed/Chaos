@friendships.each do |friendship|
    json.set! friendship.id do
        json.friendshipId friendship.id
        json.id friendship.friend.id
        json.username friendship.friend.username
        json.email friendship.friend.email
        json.pending friendship.pending
        json.confirmed friendship.confirmed
        json.created_at friendship.created_at
    end
end