Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :servers, only: [:create, :index, :show, :update, :destroy]
    resources :members, only: [:index, :create, :destroy]
    resources :friendships, only: [:index, :create, :destroy]
    resources :users, only: [:create, :index]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
