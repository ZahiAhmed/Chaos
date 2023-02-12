class Api::MembersController < ApplicationController
    before_action :require_logged_in

    def index 
        @members = Member.where(server_id: params[:server_id])
        render :index
    end

    def create 
        @member = Member.new(
            member_id: current_user.id, 
            server_id: params[:server_id], 
            owner: false
        )
        if @member.save
            render "api/servers/show"
        else 
            render json: {errors: @member.errors.full_messages}, status: 418
        end
    end

    def destroy
        @member = Member.find_by(member_id: params[:member_id], server_id: params[:server_id])
        @server = Server.find_by(id: params[:server_id])
        if(current_user.id == @member.member_id || current_user.id == @server.owner_id)
            @member.destroy
        end
    end
end
