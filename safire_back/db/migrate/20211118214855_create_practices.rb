class CreatePractices < ActiveRecord::Migration[6.0]
  def change
    create_table :practices do |t|
      t.integer :project_id, null: false
      t.integer :smile_result, null: false
      t.integer :filler_result, null: false
      t.integer :negative_result, null: false
      t.integer :time_result, null: false

      t.timestamps
    end
  end
end
