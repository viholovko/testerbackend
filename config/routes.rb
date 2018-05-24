Rails.application.routes.draw do

  match 'api/*all' => 'api/base#cors_preflight_check', :constraints => {:method => 'OPTIONS'}, :via => [:options]

  root to: 'pages#index'

  mount TryApi::Engine => '/developers'

  scope '(:locale)' do

    resources :attachments, only: [:destroy] do
      collection do
        post '/:entity_type', to: 'attachments#create'
      end
    end

    get '/test', to: 'pages#test'
    namespace :test do
      resources :tests, only: %i[create show update]
    end


    get '/admin', to: "pages#admin"
    namespace :admin do
      resources :admins, only: %i[index create update destroy show]
      resources :tests, only: %i[index create update destroy show]

      resources :sessions, only: :create do
        collection do
          delete :destroy
          get :check
        end
      end
      resources :email_sender, only: :index do
        collection do
          put :update
        end
      end
    end

    namespace :api do
      namespace :v1 do
        resources :tests, only: %i[index create update destroy show]
        resources :records, only: %i[index show]
        resources :questions, only: %i[create update destroy show]
      end
    end
  end

end
