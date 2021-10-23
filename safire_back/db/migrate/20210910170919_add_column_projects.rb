class AddColumnProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :color, :integer
  end
end
