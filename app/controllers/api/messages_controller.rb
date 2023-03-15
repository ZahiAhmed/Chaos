class Api::MessagesController < ApplicationController
    before_action :require_logged_in
    
    def index
        @messages = Message.where(channel_id: params[:text_channel_id])
        render :index
    end
    
    def create
        @message = Message.new(channel_id: params[:channel_id], sender_id: current_user.id, body: params[:body])
        if @message.save
            # TextChannelsChannel.broadcast_to (@message.text_channel, @message)
            # TextChannelsChannel.broadcast_to @message.text_channel,
            # **from_template('api/messages/show', message: @message)
            # render :show, locals: {message: @message}
        else
            render json: @message.errors.full_messages, status: 418
        end
    end
    
    def update
        @message = Message.find_by(id: params[:id])
        if (@message&.update(
            body: params[:body]
        )) && (@message.sender_id == current_user.id)
        # TextChannelsChannel.broadcast_to @message.text_channel,
        # **from_template('api/messages/show', message: @message)
        # render :show, locals: {message: @message}
        end
        if (params[:body] == '')
            @message.destroy
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        if current_user.id == @message.sender_id
            # TextChannelsChannel.broadcast_to @message.room,
            # type: 'DESTROY_MESSAGE',
            # id: @message.id
            @message.destroy
        end 
    end
end
