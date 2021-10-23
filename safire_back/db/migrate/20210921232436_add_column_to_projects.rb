class AddColumnToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :view_times, :integer, null: false, default: 0
  end
end
