class ProjectTag < ApplicationRecord
  belongs_to :project, foreign_key: :project_id, primary_key: :id, optional: true
  enum tag: {
    "Python": 0,
    "JavaScript": 1,
    "HTML/CSS": 2,
    "C/C++": 3,
    "C#": 4,
    "Java": 5,
    "Ruby": 6,
    "PHP": 7,
    "SQL": 8,
    "Swift": 9,
    "Go": 10,
    "Kotlin": 11,
    "R": 12,
    "others_1": 13,
    "Web App": 14,
    "Native App": 15,
    "Machine Learning": 16,
    "AI": 17,
    "others": 18
  }
end
