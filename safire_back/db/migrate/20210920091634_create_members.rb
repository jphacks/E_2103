class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.integer :project_id, null: false
      t.string :owner_id, null: false
      t.string :user_id, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
