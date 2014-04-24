class AddDefaultsToGifts1 < ActiveRecord::Migration
  def change
    change_column_default :gifts, :q_expected, 0
    change_column_default :gifts, :q_have, 0
  end
end
