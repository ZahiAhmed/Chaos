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
           return render json: {errors: ["#{params[:friend_id]} is not a valid user"]}
        end

        if @friend = User.find_by(id: friend_id, username: friend_username)
            if (params[:user_id] === @friend.id) 
                render json: {errors: ["Cannot friend yourself"]}
            else
                @friendship = Friendship.find_by(user_id: params[:user_id], friend_id: @friend.id)
                if(@friendship && !@friendship.confirmed)
                    @otherside = Friendship.find_by(user_id: @friendship.friend_id, friend_id: @friendship.user_id)
                    @friendship.update(confirmed: true)
                    @otherside.update(pending: false)
                    render :show
                else

                    @friendship = Friendship.new(user_id: params[:user_id], friend_id: @friend.id, confirmed: true)
                    @otherside = Friendship.new(user_id: @friendship.friend_id, friend_id: @friendship.user_id, confirmed: false, pending: false)
                
                    if @friendship.save && @otherside.save
                        render json: {message: ["Successfully Requested #{params[:friend_id]}."]}, status: 200
                    else
                        render json: {errors: ["Already friended #{params[:friend_id]}."]}
                    end
                end
            end
        else
           render json: {errors: ["#{params[:friend_id]} is not an existing user."]}
        end
    end

    def destroy
        @target_friendship = Friendship.find_by(id: params[:id])
        @other_side = Friendship.find_by(user_id: @target_friendship.friend_id, friend_id: @target_friendship.user_id)
        @target_friendship.destroy if @target_friendship
        @other_side.destroy if @other_side
    end
end