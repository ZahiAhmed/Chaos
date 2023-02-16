class Api::ServersController < ApplicationController
    before_action :require_logged_in

    def index
        @servers = Server.all
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        if @server
            render :show
        else
            render json: {server: nil}
        end
    end

    def create
        @server = Server.new(
            server_name: params[:server_name],
            description: params[:description],
            owner_id: params[:owner_id]
        )
        if @server.save
            @member = Member.create(member_id: current_user.id, server_id: @server.id, owner: true)
            @text_channel.create(server_id: @server.id, server_owner_id: current_user.id, topic: "general")
            render :show
        else
            render json: {errors: @server.errors.full_messages}, status: 418
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if (@server&.update(
            server_name: params[:server_name],
            description: params[:description],
            owner_id: params[:owner_id]
        )) && (@server.owner_id == current_user.id)
            render :show
        else
            render json: { errors: ["Must have a name"] }, status: 418
        end
    end

    def destroy
        debugger
        @server = Server.find_by(id: params[:id])
        if (@server.owner_id == current_user.id)
            @server.destroy
        end
    end

end
