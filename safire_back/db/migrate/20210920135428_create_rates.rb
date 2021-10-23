class CreateRates < ActiveRecord::Migration[6.0]
  def change
    create_table :rates do |t|
      t.integer :project_id, null: false
      t.string :user_id, null: false
      t.float :rate, null: false

      t.timestamps
    end
  end
end
