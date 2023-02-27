class Api::TextChannelsController < ApplicationController
    before_action :require_logged_in

    def index
        @text_channels = TextChannel.where(server_id: params[:server_id])
        render :index
    end

    def show 
        @text_channel = TextChannel.find_by(id: params[:id])
        if @text_channel
            render :show
        else
            render json: {text_channel: nil}
        end
    end

    def create
        debugger
        @text_channel = TextChannel.new(
            server_id: params[:server_id],
            server_owner_id: params[:server_owner_id],
            topic: params[:topic])
        if (@text_channel.server_owner_id == current_user.id && @text_channel.save)
            render :show
        else
            render json: @text_channel.errors.full_messages, status: 418
        end
    end

    def update 
        @text_channel = TextChannel.find_by(id: params[:id])
        if (@text_channel&.update(
            server_id: params[:server_id],
            server_owner_id: params[:server_owner_id],
            topic: params[:topic]
        )) && (@text_channel.server_owner_id == current_user.id)
            render :show
        else
            render json: { errors: ["Must have a topic"]}, status: 418
        end
    end

    def destroy
        @text_channel = TextChannel.find_by(id: params[:id])
        if(@text_channel.server_owner_id == current_user.id)
            @text_channel.destroy
        end
    end
end
