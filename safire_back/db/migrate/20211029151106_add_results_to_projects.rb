class AddResultsToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :smile_result, :integer, null: true
    add_column :projects, :filler_result, :integer, null: true
    add_column :projects, :negative_result, :integer, null: true
    add_column :projects, :time_result, :integer, null: true
  end
end
