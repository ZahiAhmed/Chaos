# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    User.destroy_all
  
    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    User.create!(
      username: 'Demo-Zaus', 
      email: 'demozaus@zaus.io', 
      password: 'zausbaus'
    )

    User.create!(
      username: 'zaus', 
      email: 'zaus@zaus.io', 
      password: 'zausbaus'
    )
    puts "Done!"
end