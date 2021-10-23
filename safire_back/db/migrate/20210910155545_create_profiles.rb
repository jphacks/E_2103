class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.string :user_id, null: false, unique: true
      t.integer :age
      t.integer :gender
      t.text :description

      t.timestamps
    end
  end
end
