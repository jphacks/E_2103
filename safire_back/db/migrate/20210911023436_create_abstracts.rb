class CreateAbstracts < ActiveRecord::Migration[6.0]
  def change
    create_table :abstracts do |t|
      t.integer :project_id
      t.integer :kind
      t.float :score
      t.string :abstract

      t.timestamps
    end
  end
end
