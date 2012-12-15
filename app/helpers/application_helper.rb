module ApplicationHelper

	def current_lista
	  	List.find(session[:lista_id])
	  rescue ActiveRecord::RecordNotFound
		lista = List.create
		session[:lista_id] = lista.id
		lista
	end

	def mostrar_imagenes
		links = %w{
			http://i.imgur.com/kpfI5.jpg 
			http://i.imgur.com/IJDui.jpg 
			http://i.imgur.com/aA3m5.jpg
			http://i.imgur.com/xC16W.jpg 
			http://i.imgur.com/oJfGa.jpg 
			http://i.imgur.com/mJNjo.jpg
		}	
	end	

	def format_nombre(cancion)
		"#{cancion.nombre_artista} - #{cancion.nombre_cancion}"
	end
end
