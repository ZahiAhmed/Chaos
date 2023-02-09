@friendships.each do |friendship|
    json.set! friendship.id do
        json.id friendship.id
        json.friendId friendship.friend.id
        json.username friendship.friend.username
        json.email friendship.friend.email
        json.created_at friendship.created_at
    end
end