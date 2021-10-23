class RecommendProject < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, primary_key: :user_id
  has_one :project, primary_key: :recommend_project, foreign_key: :id 
end
