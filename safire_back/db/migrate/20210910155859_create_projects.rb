class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :user_id, null: false, unique: true
      t.string :title
      t.binary :thumbnail, :limit => 1.megabyte
      t.text :description
      t.text :description_background
      t.binary :thumbnail_background, :limit => 1.megabyte
      t.text :description_idea
      t.binary :thumbnail_idea, :limit => 1.megabyte
      t.text :description_technology
      t.binary :thumbnail_technology, :limit => 1.megabyte
      t.text :appendix

      t.timestamps
    end
  end
end
