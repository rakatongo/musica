class ArtistasController < ApplicationController

	def index
		@artistas = Artista.paginate(page: params[:page], per_page: 15)
		respond_to do |wants|
			wants.js
		end
	end	
	
	def show
		@artista = Artista.find_by_nombre(params[:nombre])
		@canciones = @artista.canciones.order('nombre_cancion ASC')
		respond_to do |wants|
			wants.js
		end
	end

	def letra
		@artistas = Artista.letra(params[:letra],page: params[:page])
		respond_to do |wants|			
			wants.js
		end
	end
end
