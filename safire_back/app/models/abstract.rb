class Abstract < ApplicationRecord
  belongs_to :project, foreign_key: :project_id, primary_key: :id, optional: true
  enum kind: {
    "background": 0,
    "idea": 1,
    "technology": 2
  }
end
