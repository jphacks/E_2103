class Practice < ApplicationRecord
  belongs_to :project, foreign_key: :project_id, primary_key: :id
end
