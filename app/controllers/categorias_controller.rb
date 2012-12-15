class CategoriasController < ApplicationController

	def index
		@categorias = Categoria.todos
		respond_to do |wants|
			wants.html
			wants.js
		end
	end

	def show
		@categoria = Categoria.por_categoria(params[:category])
		.paginate(page: params[:page],:per_page => 24)
		respond_to do |wants|
			wants.html
			wants.js
		end
	end
end
