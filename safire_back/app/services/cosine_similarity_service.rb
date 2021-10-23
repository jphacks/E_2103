class CosineSimilarityService
  class << self
    def tag_normalization(user_id)
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
        "others" => 18
      }
      tag_norm = Array.new(20, 0.0)
      projects = Project.where(user_id: user_id)
      if projects.length == 0
        tag_norm[19] = 1.0
      elsif
        projects.each do |project|
          tags = ProjectTag.where(project_id: project.id)
          tags.each do |tag|
            tag_norm[tag_dir[tag.tag]] = tag_norm[tag_dir[tag.tag]] + 1.0
          end
        end
        tag_norm.each_with_index do |x, i|
          tag_norm[i] = tag_norm[i] / projects.length
        end
      end
      tag_norm
    end

    def profile_vector(user_id)
      gender = {
        "man" => 0,
        "woman" => 1,
        "others" => 2
      }
      school_grade =  {
        "小学校" => 0,  
        "中学校" => 1,
        "高校" => 2,
        "高専" => 3,
        "大学" => 4,
        "社会人" => 5
      }
      profile_list = Array.new(10, 0.0)
      profile = Profile.find_by(user_id: user_id)
      profile_list[0] = profile.age.to_f / 100
      profile_list[1 + gender[profile.gender]] = 1.0
      profile_list[4 + school_grade[profile.school_grade]] = 1.0
      profile_list
    end

    def user_vector(user_id)
      profile_vector(user_id) + tag_normalization(user_id)
    end

    def vector_size(list)
      size = 0.0
      list.each do |element|
        size += element ** 2
      end
      size ** 0.5
    end

    def cross_calculation(list_a, list_b)
      value = 0.0
      list_a.each_with_index do |x, i|
        value += list_a[i] * list_b[i]
      end
      value
    end

    def cosine_similarity(target_id, other_id)
      target = Profile.find_by(user_id: target_id)
      target_vector = user_vector(target.user_id)
      target_size = vector_size(target_vector)
      other = Profile.find_by(user_id: other_id)
      other_vector = user_vector(other.user_id)
      other_size = vector_size(other_vector)
      cross_calculation(target_vector, other_vector) / (target_size + other_size)
    end

    def all_user
      users = User.all
      users.each do |user|
        other_list = []
        others = User.where.not(user_id: user.user_id)
        others.each do |other|
          cos = cosine_similarity(user.user_id, other.user_id)
          other_list.push({"user_id" => other.user_id, "score" => cos})
        end
        sorted_list = (other_list.sort do |a, b|
          b[:score] <=> a[:score]
        end)
        sorted_list.each_with_index do |r_user, index|
          rank = index + 1
          recommend = RecommendUser.find_or_initialize_by(
            user_id: user.user_id,
            ranking: rank
          )
          recommend.assign_attributes(
            recommend_user: r_user["user_id"],
            score: r_user["score"]
          )
          recommend.save!
          break if index == 2
        end
      end
    end
  end
end