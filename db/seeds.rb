# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    Message.destroy_all
    Member.destroy_all
    TextChannel.destroy_all
    Server.destroy_all
    Friendship.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('friendships')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('members')
    ApplicationRecord.connection.reset_pk_sequence!('text_channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    puts "Creating users..."

    User.create!(
      username: 'zaus', 
      email: 'zaus@zaus.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'ayce', 
      email: 'ayce@lacap.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'kinka', 
      email: 'kinka@tse.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'kyle', 
      email: 'kyle@ginzburg.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'peter', 
      email: 'peter@peter.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'spencer', 
      email: 'spencer@iascone.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'walker', 
      email: 'walker@walker.io', 
      password: 'zausbaus'
    )

    puts "Creating friendships..."
    
    Friendship.create!(
      user_id: 1,
      friend_id: 2,
      pending: false
    )

    Friendship.create!(
      user_id: 2,
      friend_id: 1,
      pending: false
    )

    Friendship.create!(
      user_id: 1,
      friend_id: 3,
      pending: false
    )

    Friendship.create!(
      user_id: 3,
      friend_id: 1,
      pending: false
    )

    Friendship.create!(
      user_id: 1,
      friend_id: 4,
      pending: false
    )

    Friendship.create!(
      user_id: 4,
      friend_id: 1,
      pending: false
    )

    Friendship.create!(
      user_id: 1,
      friend_id: 5,
      pending: false
    )

    Friendship.create!(
      user_id: 5,
      friend_id: 1,
      pending: false
    )

    puts "Creating servers..."
    
    Server.create!(
      server_name: "Zaus' server",
      owner_id: 1
    )

    TextChannel.create!(
      server_id: 1,
      server_owner_id: 1, 
      topic: "general"
    )


    Server.create!(
      server_name: "Ayce's server",
      owner_id: 2
    )

    TextChannel.create!(
      server_id: 2,
      server_owner_id: 2, 
      topic: "general"
    )

    Server.create!(
      server_name: "Kinka's server",
      owner_id: 3
    )

    TextChannel.create!(
      server_id: 3,
      server_owner_id: 3, 
      topic: "general"
    )

    Server.create!(
      server_name: "Kyle's server",
      owner_id: 4
    )

    TextChannel.create!(
      server_id: 4,
      server_owner_id: 4, 
      topic: "general"
    )

    Server.create!(
      server_name: "Peter's server",
      owner_id: 5
    )

    TextChannel.create!(
      server_id: 5,
      server_owner_id: 5, 
      topic: "general"
    )

    Server.create!(
      server_name: "Spencers'server",
      owner_id: 6
    )

    TextChannel.create!(
      server_id: 6,
      server_owner_id: 6, 
      topic: "general"
    )

    Server.create!(
      server_name: "Walker's server",
      owner_id: 7
    )

    TextChannel.create!(
      server_id: 7,
      server_owner_id: 7, 
      topic: "general"
    )

    puts "Creating members..."

    Member.create!(
      member_id: 1,
      server_id: 1,
      owner: true
    )

    Member.create!(
      member_id: 2,
      server_id: 1,
      owner: false
    )

    Member.create!(
      member_id: 2,
      server_id: 2,
      owner: true
    )

    Member.create!(
      member_id: 1,
      server_id: 2,
      owner: false
    )
    
    Member.create!(
      member_id: 3,
      server_id: 3,
      owner: true
    )

    Member.create!(
      member_id: 1,
      server_id: 3,
      owner: false
    )
    
    Member.create!(
      member_id: 4,
      server_id: 4,
      owner: true
    )
    Member.create!(
      member_id: 1,
      server_id: 4,
      owner: false
    )

    Member.create!(
      member_id: 5,
      server_id: 5,
      owner: true
    )

    Member.create!(
      member_id: 1,
      server_id: 5,
      owner: false
    )

    Member.create!(
      member_id: 6,
      server_id: 6,
      owner: true
    )
    
    Member.create!(
      member_id: 1,
      server_id: 6,
      owner: false
    )


    Member.create!(
      member_id: 7,
      server_id: 7,
      owner: true
    )

    Member.create!(
      member_id: 1,
      server_id: 7,
      owner: false
    )
    puts "Done!"
    
end