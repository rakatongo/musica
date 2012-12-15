class Categoria < ActiveRecord::Base
	
	self.table_name = "categorias"
	attr_accessible :categoria

	has_many :artistas, class_name: "Artista", foreign_key: "category_id"
	has_many :canciones, :class_name => "Cancion", :through => :artistas, source: :canciones

	# def self.todos
	# 	select('categoria,COUNT(artistas.*) AS cuenta_artista, COUNT(canciones.id) AS cuenta_cancion')
	# 	.joins(artistas: :canciones).group('categoria').order('categoria ASC')
	# end
	def self.todos
		select('categoria,COUNT(DISTINCT canciones.artista_id) AS cuenta_artista,COUNT(canciones.id) AS cuenta_cancion')
		.joins(artistas: :canciones)
		.group('categoria').order('categoria ASC')
	end

	def self.por_categoria(categoria)		
		select('artistas.nombre, count(canciones.artista_id) AS cuenta_cancion')
		.joins(artistas: :canciones)
		.where('categoria = ?', categoria)
		.group('artistas.nombre').order('artistas.nombre ASC')
	end
end
