json.partial! "server", server: @server
json.textChannels do
    json.array!(@server.text_channels) do |text_channel|
      json.extract! text_channel, :id
    end
  end