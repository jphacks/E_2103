class PresentationController < ApplicationController
  def show
    project = Project.find(presentation_params["id"])
    abstract_b = Abstract.where(project_id: presentation_params["id"]).where(kind: 0).order(score: "DESC")
    abstract_i = Abstract.where(project_id: presentation_params["id"]).where(kind: 1).order(score: "DESC")
    abstract_t = Abstract.where(project_id: presentation_params["id"]).where(kind: 2).order(score: "DESC")
    abstract_list = []
    abstract_list.push(abstract_b.map(&:abstract))
    abstract_list.push(abstract_i.map(&:abstract))
    abstract_list.push(abstract_t.map(&:abstract))

    pre_json = { message: "プロジェクトの詳細の取得に成功しました.", abstract_list: abstract_list }
    render :json => pre_json.merge(project.attributes)
  end

  private
    def presentation_params
      params.permit(
        :id
      )
    end
end
