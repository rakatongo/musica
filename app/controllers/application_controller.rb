class ApplicationController < ActionController::Base
  protect_from_forgery
  include ApplicationHelper
  

  private
  	def buscar_lista
  		@current_lista = current_lista
  	end

  	def mostrar_categorias
  		@categorias = Categoria.find(:all, order: 'categoria ASC')
  	end

    
end
