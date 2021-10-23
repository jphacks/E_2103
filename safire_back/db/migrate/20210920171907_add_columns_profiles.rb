class AddColumnsProfiles < ActiveRecord::Migration[6.0]
  def change
    add_column :profiles, :school_grade, :integer, default: 4, null: false
  end
end
