class RecommendUserService
  class << self
    def top_tag(user_id)
      tag_dir = {
        "Python" => 0,
        "JavaScript" => 1,
        "HTML/CSS" => 2,
        "C/C++" => 3,
        "C#" => 4,
        "Java" => 5,
        "Ruby" => 6,
        "PHP" => 7,
        "SQL" => 8,
        "Swift" => 9,
        "Go" => 10,
        "Kotlin" => 11,
        "R" => 12,
        "others_1" => 13,
        "Web App" => 14,
        "Native App" => 15,
        "Machine Learning" => 16,
        "AI" => 17,
        "others" => 18,
        "None" => 19
      }
      tag_norm = Array.new(20, 0.0)
      projects = Project.where(user_id: user_id)
      if projects.length == 0
        tag_norm[19] = 1.0
      elsif
        projects.each do |project|
          tags = ProjectTag.where(project_id: project.id)
          tags.each do |tag|
            tag_norm[tag_dir[tag.tag]] += 1.0
          end
        end
      end
      tag_dir.invert[tag_norm.index(tag_norm.max)]
    end

    def recommend_user(user_id)
      recommend_users = RecommendUser.where(user_id: user_id)
      recommend_list = []
      recommend_users.each do |user|
        tag = top_tag(user["recommend_user"])
        recommend_list.push({ "name": user["recommend_user"], "top_tag": tag})
      end
      recommend_list
    end
  end
end