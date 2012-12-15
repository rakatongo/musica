class LineItemsController < ApplicationController

	def create		
		@item = current_lista.line_items.create(cancion_id: params[:cancion_id])
		logger.debug { @item.cancion.nombre_artista }				
		respond_to do |wants|
			wants.js
		end
	end

	def destroy
		@line_destroy = current_lista.line_items.find(params[:id])
		@line_destroy.destroy
		respond_to do |wants|
			wants.js {  }
		end
	end
end
