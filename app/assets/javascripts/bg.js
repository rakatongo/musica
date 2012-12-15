var links = [
			"http://i.imgur.com/kpfI5.jpg ",
			"http://i.imgur.com/IJDui.jpg",
			"http://i.imgur.com/aA3m5.jpg",
			"http://i.imgur.com/3VT9U.jpg",			
			"http://i.imgur.com/oJfGa.jpg", 
			"http://i.imgur.com/mJNjo.jpg",
			"http://i.imgur.com/FLmjn.jpg",
			"http://i.imgur.com/U8TkE.jpg",
			"http://i.imgur.com/xC16W.jpg"
		]
var current = 0	
function thebackground() {
	
	setInterval('change()',25000);
	
}

function change() {		
	var img = new Image()
	img.src = links[current]	
	img.onload = function() {
		$('div.background img').fadeOut('fast',
			function() {
				$(this).remove()
				var bg = $('div.background')
				bg.hide()
				.html(img)
				var imagen = $('div.background img')
				imagen.css({opacity: 0.0})		
				imagen.appendTo().addClass('show')
				bg.show()
				imagen.animate({opacity: 1.0}, 200);
			}

		)		
	}	
	current ++	
	if (current >= links.length ) {
		current = 0
	}
	
};
$(document).ready(function() {
	thebackground();
	$('div.background').fadeIn(1000); // works for all the browsers other than IE
	$('div.background img').fadeIn(1000); // IE tweak
});
