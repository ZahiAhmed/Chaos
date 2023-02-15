Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :servers, only: [:create, :index, :show, :update, :destroy] do 
      resources :members, only: [:index]
    end
    resources :members, only: [:create, :destroy]
    resources :friendships, only: [:index, :create, :destroy]
    resources :users, only: [:create, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :text_channels, only: [:index, :show, :create, :update, :destroy]
    resources :messages, only: [:create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
