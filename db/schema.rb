# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_03_15_170433) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friendships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "friend_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "pending", default: true
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "members", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "server_id", null: false
    t.boolean "owner", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["member_id"], name: "index_members_on_member_id"
    t.index ["server_id"], name: "index_members_on_server_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "sender_id", null: false
    t.bigint "channel_id", null: false
    t.text "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["sender_id"], name: "index_messages_on_sender_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "server_name", null: false
    t.string "description"
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "text_channels", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.bigint "server_owner_id", null: false
    t.string "topic", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_text_channels_on_server_id"
    t.index ["server_owner_id"], name: "index_text_channels_on_server_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "friendships", "users"
  add_foreign_key "friendships", "users", column: "friend_id"
  add_foreign_key "members", "servers"
  add_foreign_key "members", "users", column: "member_id"
  add_foreign_key "messages", "text_channels", column: "channel_id"
  add_foreign_key "messages", "users", column: "sender_id"
  add_foreign_key "servers", "users", column: "owner_id"
  add_foreign_key "text_channels", "servers"
  add_foreign_key "text_channels", "users", column: "server_owner_id"
end
