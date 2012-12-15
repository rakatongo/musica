class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :list_id
      t.integer :cancion_id

      t.timestamps
    end
  end
end
