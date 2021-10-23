class MemberController < ApplicationController
  def index
    members = Member.where(owner_id: member_params["owner_id"]).where(status: "inactive")
    applied_user = []
    members.each do |member|
      project = Project.find_by(id: member["project_id"])
      applied_user.push({id: member["id"], user_id: member["user_id"], project_title: project["title"]})
    end

    render :json => applied_user
  end
  
  def create
    ActiveRecord::Base.transaction do
      member = Member.find_or_initialize_by(
        project_id: member_params["project_id"],
        owner_id: member_params["owner_id"],
        user_id: member_params["user_id"]
      )
      member.save!

      render :json => {"message": "メンバーの申請に成功しました."}
    end
  end
  
  def show
    members = Member.where(project_id: member_params["id"]).where(status: "active")
    member_list = []
    members.each do |member|
      member_list.push(member["user_id"])
    end

    render :json => { member_list: members.map(&:user_id) }
  end
  
  def update
    ActiveRecord::Base.transaction do
      member = Member.find(member_params["id"])
      if member_params["permit"]
        member.assign_attributes(
          status: "active"
        )
        member.save!
        result = {"message": "メンバーの申請を許可しました."}
      else
        member.destroy!
        result = {"message": "メンバーの申請を拒否しました."}
      end
      render :json => result
    end
  end

  private
    def member_params
      params.permit(
        :id,
        :owner_id,
        :project_id,
        :user_id,
        :permit
      )
    end
end
