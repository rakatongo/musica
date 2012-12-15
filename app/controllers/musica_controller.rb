class MusicaController < ApplicationController

	def index
		@lista = current_lista
		respond_to do |wants|
			wants.html
			wants.js
		end
	end

	def search	
		@lista = current_lista
		@busqueda = Cancion.search(params[:buscar],page: params[:page])
		@artistas = Artista.search(params[:buscar])
		respond_to do |wants|
			wants.js
		end
	end

	def searching
		@loquesea = Cancion.searching(params[:q])
		respond_to do |wants|
			wants.json { render json: @loquesea  }
		end
	end
end
