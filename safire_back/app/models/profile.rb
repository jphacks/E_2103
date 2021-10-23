class Profile < ApplicationRecord
  belongs_to :user, foreign_key: :user_id, primary_key: :user_id

  enum school_grade: {
    "小学校": 0,
    "中学校": 1,
    "高校": 2,
    "高専": 3,
    "大学": 4,
    "社会人": 5
  }

  enum gender: {
    "man": 0,
    "woman": 1,
    "others": 2
  }

end
