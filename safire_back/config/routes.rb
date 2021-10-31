Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :signup, only: %i(index create)
  resources :login, only: %i(login) do
    post :login, on: :member
  end
  resources :home, only: %i(index)
  resources :project, only: %i(create show update) do
    get :get_target, on: :member
    get :latest_project, on: :member
    post :set_target, on: :member
    post :set_result, on: :member
  end
  resources :mypage, only: %i(show)
  resources :presentation, only: %i(show)
  resources :member, only: %i(index create show update)
  resources :rate, only: %i(create)
end
