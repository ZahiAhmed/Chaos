class Api::FriendshipsController < ApplicationController
    before_action :require_logged_in

    def index
        @friendships = Friendship.where(user_id: current_user.id)
        render :index
    end

    def create
        friend_params = params[:friend_id].split("#")
        friend_username = friend_params[0]
        friend_id = friend_params[1].to_i
        
        if (friend_params.length != 2)
           return render json: {errors: ["Invalid user"]}, status: 418
        end
        if @user = User.find_by(id: friend_id, username: friend_username)
            if (params[:user_id] === @user.id) 
                return render json: {errors: ["Cannot friend self"]}, status: 418
            else
                @friendship = Friendship.new(user_id: params[:user_id], friend_id: @user.id)
                if @friendship.save
                    return render json: {message: 'Successfully Added'}
                else
                    return render json: {errors: ["Already friended"]}, status: 418
                end
            end
        else
           return render json: {errors: ["User doesn't exist"]}, status: 418
        end
    end

    def destroy
        @target_friendship = Friendship.find_by(id: params[:id])
        @other_side = Friendship.find_by(user_id: @target_friendship.friend_id, friend_id: @target_friendship.user_id)
        @target_friendship.destroy if @target_friendship
        @other_side.destroy if @other_side
    end
end