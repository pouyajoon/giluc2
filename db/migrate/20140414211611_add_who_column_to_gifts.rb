class AddWhoColumnToGifts < ActiveRecord::Migration
  
  def change
    add_column :gifts, :who, :text
  end
end
