class TextChannelsChannel < ApplicationCable::Channel
    def subscribed
        @text_channel = TextChannel.find_by(id: params[:id])
        stream_for @text_channel
    end
end