class CreateProjectTags < ActiveRecord::Migration[6.0]
  def change
    create_table :project_tags do |t|
      t.integer :project_id
      t.integer :tag

      t.timestamps
    end
  end
end
