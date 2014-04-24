class CreateGifts < ActiveRecord::Migration
  def change
    create_table :gifts do |t|
      t.string :title
      t.integer :q_expected, default: 0
      t.integer :q_have, default: 0
      t.timestamps
    end
  end
end
