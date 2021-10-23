class MypageController < ApplicationController
  def show
    # User
    profile = Profile.find_by(user_id: mypage_params["id"])

    # Project list
    projects = Project.where(user_id: mypage_params["id"]).order(created_at: "DESC")
    projects_list = []
    projects.each do |project|
      # タグを探して
      tags = ProjectTag.where(project_id: project.id)
      # くっつけて
      one_object = project.attributes.merge({ tag_list: tags.map(&:tag) })
      # filter
      object_list = ["id", "user_id", "title", "created_at", "thumbnail", "description", :tag_list]
      one_object = one_object.select {|k,v| object_list.include?(k)}
      # push
      projects_list.push(one_object)
    end

    # Liked Project list
    liked_projects = Rate.where(user_id: mypage_params["id"]).where("rate > 4").order(created_at: "DESC")
    liked_projects_list = []
    liked_projects.each do |liked_project|
      project = Project.find(liked_project.project_id)
      # タグを探して
      tags = ProjectTag.where(project_id: project.id)
      # くっつけて
      one_object = project.attributes.merge({ tag_list: tags.map(&:tag) })
      # filter
      object_list = ["id", "user_id", "title", "created_at", "thumbnail", "description", :tag_list]
      one_object = one_object.select {|k,v| object_list.include?(k)}
      # push
      liked_projects_list.push(one_object)
    end

    render :json => { message: "マイページの情報の取得に成功しました.", user_id: mypage_params["id"], description: profile.description, own_project_list: projects_list, liked_project_list: liked_projects_list }
  end

  private
    def mypage_params
      params.permit(
        :id
      )
    end
end
