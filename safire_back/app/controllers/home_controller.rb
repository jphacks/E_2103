class HomeController < ApplicationController
  def index
    limit = home_params["limit"].present? ? home_params["limit"] : 6
    offset = home_params["offset"].present? ? home_params["offset"] : 0

    # 他ユーザのプロジェクトリスト
    projects = Project.order(created_at: "DESC").limit(limit).offset(offset)
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
    
    # 閲覧数上位5プロジェクト
    top_project_list = []
    top_projects = Project.order(view_times: "DESC").order(created_at: "DESC").limit(3)
    top_projects.each do |project|
      tags_for_top = ProjectTag.where(project_id: project.id)
      top_project_list.push({"id": project["id"], "name": project["title"], "tag_list": tags_for_top.map(&:tag)})
    end

    render :json => { project_list: projects_list, user_list: RecommendUserService.recommend_user(home_params["user_id"]), top_project_list: top_project_list }
  end

  private
    def home_params
      params.permit(
        :limit,
        :offset,
        :user_id
      )
    end
end
