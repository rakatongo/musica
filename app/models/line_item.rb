class LineItem < ActiveRecord::Base

  attr_accessible :cancion_id, :list_id
  
  belongs_to :cancion, :class_name => "Cancion", :foreign_key => "cancion_id"
  belongs_to :list, :class_name => "List", :foreign_key => "list_id"

  validates :cancion_id, :list_id, presence: true

  def self.ultimas_canciones
  	a = find(:all,select:['canciones.nombre_cancion AS nombre, 
  		canciones.numero_key AS numero_key,
  		canciones.numero_id AS numero_id, canciones.nombre_artista AS nombre_artista,
  		canciones.id AS id'],
  	joins: [:cancion], order: 'created_at DESC', limit: 20)   	
  end
end
