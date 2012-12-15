class List < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :line_items, :class_name => "LineItem"
  has_many :canciones, class_name: "Cancion",:through => :line_items, source: :cancion
end
