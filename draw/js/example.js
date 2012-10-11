//Ejemplos raphael
var funcionInicio = function ($){
	var draw = new Object;
	draw = {
			titulos:9,
			dobleColumna: true,
			colorFondo:{
				"fill":"0-#fff-#f00:20-#000",
				"stroke":"#000",
				"stroke-width":2
			},
			colorCirculo:{
				"fill":"0-#fff-#0000FF:20-#000",
				"stroke":"#000",
				"stroke-width":2
			},
			template:{
				objeto:'<div id="##move##">\
							<h3>##numero##</h3>\
							<h2>##titulo##</h2>\
						</div>',
			}
		};

	$(document).ready(function (){
		var numeroListas = draw.titulos;
		var x = -1000;
		var y = 12;

		if(numeroListas<=6){ 
			var incrementX = 1000;	
			var incrementY = 70;
			var alto = 50;
			var borde = 4;
			var incrementCircleX = alto + 2;	
			var incrementCircleY = alto/2 + 2;
		}else{
			var incrementX = 1000;	
			var incrementY = 45;	
			var alto = 40;
			var borde = 2;
			var incrementCircleX = alto + 10;	
			var incrementCircleY = alto/2 + 2;	
		}
		
		for(var i=1; i<= numeroListas; i++){
			var html = draw.template.objeto;
			html = html.replace('##move##','move'+i);
			html = html.replace('##numero##',i);
			html = html.replace('##titulo##','Título'+i);
			
			$('#workArea').append($(html));
			$('#move'+i).css({
				"position":"absolute",
				"left": x,
				"top": y
			});
			x -= incrementX;
			y += incrementY;	
		}
		if(draw.dobleColumna){
			var x = -1000;
			var y = 12;
			
			for(var i=numeroListas+1; i<= numeroListas+numeroListas; i++){
				var html = draw.template.objeto;
				html = html.replace('##move##','move'+i);
				html = html.replace('##numero##',i);
				html = html.replace('##titulo##','Título'+i);
				
				$('#workArea').append($(html));
				$('#move'+i).css({
					"position":"absolute",
					"left": x-1000,
					"top": y
				});
				x -= incrementX;
				y += incrementY;	
			}		
		}
		
		for(var i=1; i<= numeroListas; i++){
			var area = Raphael("move"+i,390, 60);
			area.path("M50,2h230c"+alto+",0 "+alto+","+alto+" 0,"+alto+"h-230c-"+alto+",0 -"+alto+",-"+alto+" 0,-"+alto+"").attr(draw.colorFondo);
			area.circle(incrementCircleX,incrementCircleY,alto/2-borde).attr(draw.colorCirculo);
			$("#move"+i).animate({
					"left":10
				},2000
			);
		}
		if(draw.dobleColumna){
			for(var i=numeroListas+1; i<= numeroListas+numeroListas; i++){
				var area = Raphael("move"+i,390, 60);
				area.path("M50,2h230c"+alto+",0 "+alto+","+alto+" 0,"+alto+"h-230c-"+alto+",0 -"+alto+",-"+alto+" 0,-"+alto+"").attr(draw.colorFondo);
				area.circle(incrementCircleX,incrementCircleY,alto/2-borde).attr(draw.colorCirculo);
				$("#move"+i).animate({
						"left":400
					},2000
				);
			}
		}
	});
}(jQuery);