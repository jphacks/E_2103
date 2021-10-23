class CreateRecommendUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :recommend_users do |t|
      t.string :user_id, null: false
      t.string :recommend_user, null: false
      t.float :score, null: false
      t.integer :ranking, null: false

      t.timestamps
    end
  end
end
