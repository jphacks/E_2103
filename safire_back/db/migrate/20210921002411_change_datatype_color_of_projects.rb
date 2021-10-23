class ChangeDatatypeColorOfProjects < ActiveRecord::Migration[6.0]
  def up
    change_column :projects, :color, :string, default: "99ff99", null: false
  end

  def down
    change_column :projects, :color, :integer
  end
end
