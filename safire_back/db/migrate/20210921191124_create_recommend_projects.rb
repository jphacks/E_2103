class CreateRecommendProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :recommend_projects do |t|
      t.string :user_id, null: false
      t.integer :recommend_project, null: false
      t.integer :ranking, null: false

      t.timestamps
    end
  end
end
