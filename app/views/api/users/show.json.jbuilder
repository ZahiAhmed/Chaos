json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
      json.servers do
        json.array!(@user.servers_in) do |server|
          json.extract! server, :id, :server_name
        end
    end
end