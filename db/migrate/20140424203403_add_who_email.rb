class AddWhoEmail < ActiveRecord::Migration
  def change
    add_column :gifts, :whoemail, :text
  end
end
