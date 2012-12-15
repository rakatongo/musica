class ApplicationController < ActionController::Base
  protect_from_forgery
  include ApplicationHelper
  before_filter :ultimas_reproducciones

  private
  	def buscar_lista
  		@current_lista = current_lista
  	end

  	def mostrar_categorias
  		@categorias = Categoria.find(:all, order: 'categoria ASC')
  	end

    def ultimas_reproducciones
      @ultimas_reproducciones = LineItem.ultimas_canciones
    end
end
