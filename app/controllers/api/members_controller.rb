class Api::MembersController < ApplicationController
    before_action :require_logged_in

    def index
        @members = Member.where(server_id: params[:server_id])
        render :index
    end

    def create 
        @member = Member.new(
            member_id: params[:member_id], 
            server_id: params[:server_id], 
            owner: false
        )
        if @member.save
        else 
            render json: {errors: @member.errors.full_messages}, status: 418
        end
    end

    def destroy
        @member = Member.find_by(id: params[:id])
        debugger
        @server = Server.find_by(id: @member.server_id)
        if (@member.member_id == @server.owner_id)
            return render json: {errors: ["Owner can't leave server"]}, status: 418
        end
        if (current_user.id == @member.member_id || current_user.id == @server.owner_id)
            @member.destroy
        end
    end
end
