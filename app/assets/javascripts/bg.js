var links = [			
			"http://i.imgur.com/IJDui.jpg",
			"http://i.imgur.com/aA3m5.jpg",
			"http://i.imgur.com/3VT9U.jpg",			
			"http://i.imgur.com/oJfGa.jpg",
			"http://i.imgur.com/kpfI5.jpg", 
			"http://i.imgur.com/mJNjo.jpg",			
			"http://i.imgur.com/U8TkE.jpg",
			"http://i.imgur.com/xC16W.jpg"
		]
var current = 0	
function thebackground() {	
	setInterval('change()',25000);	
}

function change() {			
	$('body').css('background-image','url('+ links[current]+')')
	current ++	
	if (current >= links.length ) {
		current = 0
	}
	
};
$(document).ready(function() {
	thebackground();	
});
