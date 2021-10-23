class LoginController < ApplicationController
  def login
    user = User.find_by(user_id: login_params["id"])
    render :json => { message: "ログインに失敗しました。" }, status: 400 and return unless user.authenticate(login_params["password"])
    token = SecureTokenService.issue_token
    user.assign_attributes(
      token: token
    )
    user.save!
    render :json => { message: "ログインに成功しました", token: token }
  end

  private
    def login_params
      params.permit(
        :id,
        :password
      )
    end
end
