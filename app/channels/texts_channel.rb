class TextsChannel < ApplicationCable::Channel
    def subscribed
      @textChannel = TextChannel.find_by(id: params[:id])
      stream_for @textChannel
    end
  end