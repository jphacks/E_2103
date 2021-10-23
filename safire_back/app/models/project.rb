class Project < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, primary_key: :user_id
  belongs_to :recommend_project, foreign_key: :id, primary_key: :recommend_project, optional: true
  has_many :project_tag, primary_key: :id, foreign_key: :project_id
  has_many :member, primary_key: :id, foreign_key: :project_id
  has_many :rate, primary_key: :id, foreign_key: :project_id

  accepts_nested_attributes_for :project_tag
end
