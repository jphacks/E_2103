class RateController < ApplicationController
  def create
    rate = Rate.find_or_initialize_by(
      project_id: rate_params["project_id"],
      user_id: rate_params["user_id"]
    )
    rate.assign_attributes(
      rate: rate_params["rate"]
    )
    rate.save!

    render :json => {"message": "評価の登録に成功しました."}
  end

  private
    def rate_params
      params.permit(
        :project_id,
        :user_id,
        :rate
      )
    end
end
