//Ejemplos raphael
jQuery(document).ready(function(){
	var area1 = Raphael("move1",410, 60);
	var colorFondo = {
		"fill":"0-#fff-#f00:20-#000",
		"stroke":"#000",
		"stroke-width":2
		
	}
	var colorCirculo ={
		"fill":"0-#fff-#0000FF:20-#000",
		"stroke":"#000",
		"stroke-width":2
	}
	area1.path("M50,2h230c50,0 50,50 0,50h-230c-50,0 -50,-50 0,-50").attr(colorFondo);
	area1.circle(52,27,22).attr(colorCirculo);
	
	jQuery("#move1").animate({
			"left":10
		},2000
	);
	
	
	var area2 = Raphael("move2",410, 60);
	var colorFondo = {
		"fill":"0-#fff-#f00:20-#000",
		"stroke":"#000",
		"stroke-width":2
		
	}
	var colorCirculo ={
		"fill":"0-#fff-#0000FF:20-#000",
		"stroke":"#000",
		"stroke-width":2
	}
	area2.path("M50,2h230c50,0 50,50 0,50h-230c-50,0 -50,-50 0,-50").attr(colorFondo);
	area2.circle(52,27,22).attr(colorCirculo);
	
	jQuery("#move2").animate({
			"left":10
		},2000
	);
});