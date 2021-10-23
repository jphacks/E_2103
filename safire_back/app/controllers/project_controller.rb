class ProjectController < ApplicationController
  def create
    ActiveRecord::Base.transaction do
      # logger.debug(project_params["tag_list"])
      project = Project.create!(
        user_id: project_params["user_id"],
        title: project_params["title"],
        thumbnail: project_params["thumbnail"],
        description: project_params["description"],
        description_background: project_params["description_background"],
        thumbnail_background: project_params["thumbnail_background"],
        description_idea: project_params["description_idea"],
        thumbnail_idea: project_params["thumbnail_idea"],
        description_technology: project_params["description_technology"],
        thumbnail_technology: project_params["thumbnail_technology"],
        appendix: project_params["appendix"],
        color: project_params["color"]
      )

      project_params["tag_list"].each do |tag_object|
        tag = ProjectTag.new(
          project_id: project.id,
          tag: tag_object
        )
        tag.save!
      end
      project_params["abstract_background"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 0,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
      project_params["abstract_idea"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 1,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
      project_params["abstract_technology"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 2,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
    end

    render :json => { message: "プロジェクトの登録に成功しました." }
  end

  def show
    project = Project.find(project_params["id"])
    tags = ProjectTag.where(project_id: project_params["id"])

    pre_json = { message: "プロジェクトの詳細の取得に成功しました.", tag_list: tags.map(&:tag) }
    return_json = pre_json.merge(project.attributes)
    times = project["view_times"] + 1
    project.assign_attributes(view_times: times)
    project.save!
    render :json => return_json
  end

  def update
    ActiveRecord::Base.transaction do
      project = Project.find(project_params["id"])

      project.assign_attributes(
        user_id: project_params["user_id"],
        title: project_params["title"],
        thumbnail: project_params["thumbnail"],
        description: project_params["description"],
        description_background: project_params["description_background"],
        thumbnail_background: project_params["thumbnail_background"],
        description_idea: project_params["description_idea"],
        thumbnail_idea: project_params["thumbnail_idea"],
        description_technology: project_params["description_technology"],
        thumbnail_technology: project_params["thumbnail_technology"],
        appendix: project_params["appendix"],
        color: project_params["color"]
      )
      project.save!

      ProjectTag.where(project_id: project_params['id']).destroy_all
      project_params["tag_list"].each do |tag_object|
        tag = ProjectTag.new(
          project_id: project.id,
          tag: tag_object
        )
        tag.save!
      end

      Abstract.where(project_id: project_params["id"]).destroy_all
      project_params["abstract_background"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 0,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
      project_params["abstract_idea"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 1,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
      project_params["abstract_technology"].each do |abstract|
        abstract = Abstract.new(
          project_id: project.id,
          kind: 2,
          score: abstract["rankScore"],
          abstract: abstract["text"]
        )
        abstract.save!
      end
    end

    render :json => { message: "プロジェクトの更新に成功しました." }
  end

  private
    def project_params
      params.permit(
        :id,
        :title,
        :thumbnail,
        :description,
        :user_id,
        :description_background,
        :thumbnail_background,
        :description_idea,
        :thumbnail_idea,
        :description_technology,
        :thumbnail_technology,
        :appendix,
        :color,
        tag_list: [],
        abstract_background: [:text, :rankScore],
        abstract_idea: [:text, :rankScore],
        abstract_technology: [:text, :rankScore]
      )
    end
end
