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

  def get_target
    project = Project.find(project_params["id"])
    practice = Practice.where(project_id: project_params["id"]).order(created_at: "DESC").limit(100)
    results = { results: { smile: practice.map(&:smile_result), filler: practice.map(&:filler_result), negative: practice.map(&:negative_result), time: practice.map(&:time_result) } }
    object_list = ["smile_times", "filler_times", "negative_times", "time_min", "time_sec",
                   "smile_result", "filler_result", "negative_result", "time_result", "project_times"]
    target_object = project.attributes.select {|k,v| object_list.include?(k)}
    render :json => target_object.merge(results)
  end

  def set_target
    project = Project.find(project_params["id"])
    project.assign_attributes(
      smile_times: project_params["smile_times"],
      filler_times: project_params["filler_times"],
      negative_times: project_params["negative_times"],
      time_min: project_params["time_min"],
      time_sec: project_params["time_sec"]
    )
    project.save!
    render :json => {"message": "SUCCESSFUL"}
  end

  def set_result
    project = Project.find(project_params["id"])
    smile = (project["smile_result"].blank? or project_params["smile_result"] > project["smile_result"]) ? project_params["smile_result"] : project["smile_result"]
    filler = (project["filler_result"].blank? or project_params["filler_result"] < project["filler_result"]) ? project_params["filler_result"] : project["filler_result"]
    negative = (project["negative_result"].blank? or project_params["negative_result"] < project["negative_result"]) ? project_params["negative_result"] : project["negative_result"]
    time = (project["time_result"].blank? or project_params["time_result"] < project["time_result"]) ? project_params["time_result"] : project["time_result"]
    practice_times = project["project_times"] + 1
    ActiveRecord::Base.transaction do
      project.assign_attributes(
        smile_result: smile,
        filler_result: filler,
        negative_result: negative,
        time_result: time,
        project_times: practice_times
      )
      project.save!
      practice = Practice.new(
        project_id: project_params["id"],
        smile_result: project_params["smile_result"],
        filler_result: project_params["filler_result"],
        negative_result: project_params["negative_result"],
        time_result: project_params["time_result"]
      )
      practice.save!
    end

    render :json => {"message": "SUCCESSFUL"}
  end

  def latest_project
    project = Project.where(user_id: params["id"]).last
    if project.present?
      render :json => { project_id: project["id"] }
    else
      render :json => { project_id: nil }
    end
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
        :smile_times,
        :filler_times,
        :negative_times,
        :time_min,
        :time_sec,
        :smile_result,
        :filler_result,
        :negative_result,
        :time_result,
        tag_list: [],
        abstract_background: [:text, :rankScore],
        abstract_idea: [:text, :rankScore],
        abstract_technology: [:text, :rankScore]
      )
    end
end
