class Cancion < ActiveRecord::Base
	
	self.table_name = "canciones"

	attr_accessible :nombre_cancion, :imagen_url,
	 :duracion, :nombre_artista, :artista_id, :numero_id, :numero_key, :cancion_url

	belongs_to :artista, class_name: "Artista"
	has_many :line_items, :class_name => "line_item"
	belongs_to :list, :class_name => "List"
	belongs_to :categoria, :class_name => "Categoria"

	def self.searching(search)	  
  	  find(:all,order: "RANDOM()", :conditions => ['nombre_cancion ILIKE ? OR nombre_artista ILIKE ?',
  	   "%#{search}%","%#{search}%"], limit: 8)
	end	
	
	def self.search(search, pagi)		
		if pagi == nil		
			pagi = 1
		end
	  paginate :per_page => 15, :page => pagi[:page],
	           :conditions => ['nombre_cancion ILIKE ?',"%#{search}%"], :order => 'nombre_cancion ASC'
	end
end