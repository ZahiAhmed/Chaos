class Api::FriendshipsController < ApplicationController
    before_action :require_logged_in
    
    def create
        @friendship = Friendship.new(user_id: params[:user_id], friend_id: params[:friend_id])
        if @friendship.save
            render json: 
        end
    end

    def destroy
        
    end

    
end