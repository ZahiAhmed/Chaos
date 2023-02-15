class ChatChannel < ApplicationCable::Channel
    def subscribed
      stream_for Room.find_by(id: params[:id])
    end
  end