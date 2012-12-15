class Artista < ActiveRecord::Base
	
	self.table_name = "artistas"

	attr_accessible :nombre, :imagen_url, :pagina_url,:category_id 	

	belongs_to :categoria, class_name: "Categoria", foreign_key: "category_id"
	has_many :canciones, class_name: "Cancion", foreign_key: "artista_id"

	
	def self.search(search)
		where('nombre ILIKE ?', "%#{search}%")
	end

	def self.letra(search,pagi)
		paginate :per_page => 15, :page => pagi[:page],
	           :conditions => ['nombre ILIKE ?', "#{search}%"], :order => 'nombre ASC'		
	end
end
