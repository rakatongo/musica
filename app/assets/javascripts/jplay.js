$(document).ready(function() {		

	$('.wraper_derecha').hide().delay(5000).fadeIn(function() {
		$('.scroll_derecha').jScrollPane()
	})

	function refrescar_lista_derecha () {		
		setInterval(function() {
			$('.wraper_derecha').fadeIn('slow')
			$.ajax({
			  type: 'GET',
			  url: '/ultimas',
			  data: {},
			  success: function(data) {
			  	$('.clase_derecha').fadeOut(function() {
			  		$('.clase_derecha').html(data)			  		
			  		$(this).fadeIn('slow')			  					  		
			  	})
			  }		  
			});	
			$('.scroll_derecha').jScrollPane()
		},20000)
	}
	refrescar_lista_derecha()

	var currentTrack = 0;
	var playList = []
	// Play siguiente cancion
	function playListNext() {
		refreshPlayList()
		var index = (currentTrack + 1 < playList.length) ? currentTrack + 1 : 0;
		playListChange(index);
		cambiar_activo(playList[index].item_id)
	}
	// Play previous track. If already on first track, start back at the end
	function playListPrev() {
		var index = (currentTrack - 1 >= 0) ? currentTrack - 1 : playList.length - 1;
		playListChange(index);
		cambiar_activo(playList[index].item_id)
	}
	// Seleccionar la cancion y el nombre de la cancion para reproducir
	function playListChange(index) {
		currentTrack = index
		$('#jquery_jplayer_1').jPlayer("setMedia", {
	        mp3: playList[currentTrack].mp3
       });
        $("#jquery_jplayer_1").jPlayer("play");        
        $('.jp-title ul li').text(playList[currentTrack].nombre)	
	}	
	$("#jplayer_prev").click(function() { playListPrev(); }); // Listen for Previous Track button click
	$("#jplayer_next").click(function() { playListNext(); }); // Listen for Next Track button click
	// Cambiar la clase activo de la lista de canciones de usuario
	function cambiar_activo (id) {
		var trs = $('#tabla_usuario tr')
		var item_id = id
		trs.each(function(index) {
			$(this).removeClass('active')
			if ($(this).attr('id') == item_id ) {
				playListChange(index)
				$(this).addClass('active')
			}
		})			
	}	
	// JPLAYER 
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			playListChange(0);		
			$(this).jPlayer("setMedia", {								
				mp3: ''
			})
		},
		oggSupport: false,
		solution: "flash,html",			
		supplied: "mp3",
		swfPath: "/assets",
		ended: function() {			
			playListNext()
			
		}
	})

	// Refrescar la lista de mp3 e inicia la musica si hay 1 cancion
	function refreshPlayList () {
		playList = []		
		var trs = $('#tabla_usuario tr')
		trs.each(function() {
			var nombre = $(this).find('.nombre_de_cancion a').attr('data-nombre')
			var mp3 = $(this).find('.nombre_de_cancion a').attr('data-url')
			var item_id = $(this).attr('id')
			playList.push({ nombre: nombre, mp3: mp3, item_id: item_id })				
		})	
		if (playList.length == 1) {			
			$('#jquery_jplayer_1').jPlayer("setMedia", {
	        	mp3: playList[0].mp3
       		})
       		$("#jquery_jplayer_1").jPlayer("play");        
		        $('.jp-title ul li').text(playList[0].nombre)
		} 					
	}


	// Live funcion para agregar musica y refrescar la lista de mp3s.
	$('.agregar').live('click',function(e) {				
		var cancion_id = $(this).attr('data-cancion-id')
		$.ajax({
		  type: 'POST',
		  url: '/line_items',
		  data: {cancion_id: cancion_id},
		  success: function() {
		  	refreshPlayList()		  	  	
		  }		  
		});	
		e.preventDefault()	
	})	
	
	// REPRODUCIR LISTA IZQUIERDA DE USUARIO
	// Refrescar el playlist, buscar todos los trs, sacar el id al cual pertenece el link clickeado
	// y reproducir ese link
	$('.reproducir').live('click',function(e) {		
		refreshPlayList()
		var item_id = $(this).parent().parent().attr('id')
		cambiar_activo(item_id)				
	    e.preventDefault();
	})
	
	$('.reproducir, .borrando, .descargar, td.artistas > a,td.nombre_de_cancion > a').hover(function() {
		$(this).tooltip('toggle')
	})

	
	


	$('.borrando').live('click', function(e) {
		refreshPlayList()		
		$('item_'+ $(this).attr('data-item-id')).fadeOut()
		e.preventDefault()
	})
	$('.descargar').live('click', function(e) {
		refreshPlayList()		
		e.preventDefault()
	})

	// Will paginate AJAX
	$('.pagination a').live('click',function(e) {
		// alert(this.href)
		$.getScript(this.href)
		e.preventDefault()
	})

	// Tooltip
	$('body').tooltip({
    	selector: '[rel=tooltip]'
	});
	$('#tabla_usuario').tooltip({
    	selector: '[class=borrando]'
	});

})