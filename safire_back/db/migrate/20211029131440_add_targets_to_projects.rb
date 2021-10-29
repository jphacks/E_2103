class AddTargetsToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :smile_times, :integer, null: false, default: 0
    add_column :projects, :filler_times, :integer, null: false, default: 0
    add_column :projects, :negative_times, :integer, null: false, default: 0
    add_column :projects, :time_min, :integer, null: false, default: 0
    add_column :projects, :time_sec, :integer, null: false, default: 0
    add_column :projects, :project_times, :integer, null: false, default: 0
  end
end
