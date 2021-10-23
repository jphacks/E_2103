class Member < ApplicationRecord
  belongs_to :project, foreign_key: :project_id, primary_key: :id

  enum status: {
    "inactive": 0,
    "active": 1
  }
end
